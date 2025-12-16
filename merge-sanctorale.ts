/**
 * Script to merge eprex sanctorale data into the liturgy_ids sanctorale.json
 */

import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';

// Manual mapping of eprex_key to litcal_event_key for complex cases
const MANUAL_MAPPINGS: Record<string, string> = {
  // January
  basil_great_gregory_nazianzen: 'StsBasilGreg',
  anthony_abbot: 'StAnthonyEgypt',
  fabian_pope_martyr: 'StFabianPope',
  sebastian_martyr: 'StSebastian',
  agnes_virgin_martyr: 'StAgnes',
  vincent_deacon_martyr: 'StVincentDeacon',
  conversion_of_paul: 'ConversionStPaul',
  timothy_titus_bishops: 'StsTimothyTitus',

  // February
  agatha_virgin_martyr: 'StAgatha',
  paul_miki_companions: 'StsPaulMiki',
  scholastica_virgin: 'StScholastica',
  polycarp_bishop_martyr: 'StPolycarp',

  // March
  joseph_husband_of_mary: 'StJoseph',

  // April
  catherine_of_siena: 'StCatherineSiena',

  // May
  joseph_the_worker: 'StJosephWorker',
  philip_james_apostles: 'StsPhilipJames',
  matthias_apostle: 'StMatthiasAp',

  // June
  barnabas_apostle: 'StBarnabasAp',
  nativity_of_john_the_baptist: 'NativityJohnBaptist',
  peter_and_paul_apostles: 'StsPeterPaulAp',

  // July
  thomas_apostle: 'StThomasAp',
  bridget_of_sweden: 'StBridget',
  james_apostle: 'StJamesAp',
  ignatius_of_loyola: 'StIgnatiusLoyola',

  // August
  lawrence_deacon_martyr: 'StLawrenceDeacon',
  bartholomew_apostle: 'StBartholomewAp',
  passion_of_john_the_baptist: 'BeheadingJohnBaptist',

  // September
  matthew_apostle_evangelist: 'StMatthewEvangelist',
  michael_gabriel_raphael: 'StsArchangels',

  // October
  francis_of_assisi: 'StFrancisAssisi',
  teresa_of_avila: 'StTeresaJesus',
  simon_jude_apostles: 'StSimonStJudeAp',

  // November
  dedication_of_lateran: 'DedicationLateran',
  andrew_apostle: 'StAndrewAp',

  // December
  stephen_first_martyr: 'StStephenProtomartyr',
  john_apostle_evangelist: 'StJohnEvangelist',
  sylvester_pope: 'StSylvesterIPope',
};

// These are temporale events that appear in the eprex sanctorale but are not in our sanctorale.json
const TEMPORALE_EVENTS = [
  'mary_mother_of_god',
  'epiphany',
  'nativity_of_the_lord',
];

// Read the sanctorale.json file
const sanctoraleJson = JSON.parse(
  readFileSync('./src/sanctorale.json', 'utf-8')
) as Array<{
  litcal_event_key: string;
  name: string;
  missal?: string;
  decree?: string;
  eprex_key?: string;
  eprex_code?: string;
  eprex_short_key?: string;
  romcal_key?: string;
}>;

// Build lookup by litcal_event_key
const sanctoraleByKey = new Map<
  string,
  (typeof sanctoraleJson)[number] & { index: number }
>();
sanctoraleJson.forEach((entry, index) => {
  if (entry.litcal_event_key) {
    sanctoraleByKey.set(entry.litcal_event_key, { ...entry, index });
  }
});

// Define the structure for eprex entries
interface EprexEntry {
  code: string;
  id: string;
  shortCode: string;
  nomina: { la: string; en: string };
  externalIds?: { romcal?: string };
}

// Parse the sanctorale.ts file to extract entries
// The eprex/ directory contains TypeScript source files from the liturgy_ids_eprex project
// These are parsed as text, not imported as modules
const sanctoraleTsContent = readFileSync('./eprex/sanctorale.ts', 'utf-8');

// Extract all entries using regex - split into two passes for robustness
// WARNING: This regex parsing assumes a specific TypeScript format in the source file:
//   { code: '...', id: '...', shortCode: '...', ..., nomina: { la: '...', ... }, ... }
// If the source file format changes, this may silently produce incomplete results.
// First pass: extract basic info (code, id, shortCode, nomina.la)
const basicRegex =
  /\{\s*code:\s*'([^']+)',\s*id:\s*'([^']+)',\s*shortCode:\s*'([^']+)'[\s\S]*?nomina:\s*\{\s*la:\s*'([^']+)'/g;

// Second pass: extract romcal ID for each entry by id
function extractRomcalId(content: string, id: string): string | undefined {
  // Find the entry block for this id and look for romcal
  // Escape special regex characters in id to prevent ReDoS
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const entryPattern = new RegExp(
    `id:\\s*'${escapedId}'[\\s\\S]*?externalIds:\\s*\\{\\s*romcal:\\s*'([^']+)'`,
    'g'
  );
  const match = entryPattern.exec(content);
  return match ? match[1] : undefined;
}

const eprexEntries: EprexEntry[] = [];
let match;

while ((match = basicRegex.exec(sanctoraleTsContent)) !== null) {
  const id = match[2];
  const romcalId = extractRomcalId(sanctoraleTsContent, id);
  eprexEntries.push({
    code: match[1],
    id: id,
    shortCode: match[3],
    nomina: { la: match[4], en: '' },
    externalIds: romcalId ? { romcal: romcalId } : undefined,
  });
}

// Validate parsed entries - regex parsing is fragile and assumes specific TypeScript format
const invalidEntries = eprexEntries.filter(
  (e) => !e.code || !e.id || !e.shortCode || !e.nomina.la
);
if (invalidEntries.length > 0) {
  console.warn(
    `Warning: ${invalidEntries.length} entries have missing required fields`
  );
}

console.log(`Found ${eprexEntries.length} entries in eprex sanctorale.ts`);

// Normalize Latin text for comparison
function normalizeLatinName(name: string): string {
  return name
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/œ/g, 'oe')
    .replace(/[.,;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Convert event key formats
function normalizeKey(key: string): string {
  // Convert snake_case to lowercase for comparison
  return key.toLowerCase().replace(/_/g, '');
}

// Attempt to match entries
const unmatched: Array<{
  eprex_key: string;
  eprex_code: string;
  eprex_short_key: string;
  romcal_key?: string;
  nomina_la: string;
}> = [];

const usedSanctoraleKeys = new Set<string>();
let matchCount = 0;

for (const eprex of eprexEntries) {
  let matchFound = false;
  let matchedKey: string | null = null;

  // Skip temporale events
  if (TEMPORALE_EVENTS.includes(eprex.id)) {
    console.log(`Skipping temporale event: ${eprex.id}`);
    continue;
  }

  // First check manual mappings
  if (MANUAL_MAPPINGS[eprex.id]) {
    const manualKey = MANUAL_MAPPINGS[eprex.id];
    if (sanctoraleByKey.has(manualKey) && !usedSanctoraleKeys.has(manualKey)) {
      matchFound = true;
      matchedKey = manualKey;
    }
  }

  // If no manual match, try key similarity
  if (!matchFound) {
    const eprexKeyNorm = normalizeKey(eprex.id);

    for (const [key] of sanctoraleByKey) {
      if (usedSanctoraleKeys.has(key)) continue;

      const sanctoraleKeyNorm = normalizeKey(key);

      // Check if keys are similar
      // Use minimum length threshold (>4) for substring matching to avoid false positives
      if (
        sanctoraleKeyNorm === eprexKeyNorm ||
        (eprexKeyNorm.length > 4 && sanctoraleKeyNorm.includes(eprexKeyNorm)) ||
        (sanctoraleKeyNorm.length > 4 && eprexKeyNorm.includes(sanctoraleKeyNorm))
      ) {
        matchFound = true;
        matchedKey = key;
        break;
      }
    }
  }

  // If no match by key, try matching by Latin name
  if (!matchFound) {
    const eprexNameNorm = normalizeLatinName(eprex.nomina.la);

    for (const [key, entry] of sanctoraleByKey) {
      if (usedSanctoraleKeys.has(key)) continue;

      const sanctoraleNameNorm = normalizeLatinName(entry.name);

      // Check if names are similar
      if (
        sanctoraleNameNorm === eprexNameNorm ||
        sanctoraleNameNorm.includes(eprexNameNorm) ||
        eprexNameNorm.includes(sanctoraleNameNorm)
      ) {
        matchFound = true;
        matchedKey = key;
        break;
      }
    }
  }

  if (matchFound && matchedKey) {
    usedSanctoraleKeys.add(matchedKey);
    const entryData = sanctoraleByKey.get(matchedKey)!;
    const idx = entryData.index;

    sanctoraleJson[idx] = {
      ...sanctoraleJson[idx],
      eprex_key: eprex.id,
      eprex_code: eprex.code,
      eprex_short_key: eprex.shortCode,
      ...(eprex.externalIds?.romcal && { romcal_key: eprex.externalIds.romcal }),
    };

    console.log(`Matched: ${matchedKey} -> ${eprex.id}`);
    matchCount++;
  } else {
    unmatched.push({
      eprex_key: eprex.id,
      eprex_code: eprex.code,
      eprex_short_key: eprex.shortCode,
      romcal_key: eprex.externalIds?.romcal,
      nomina_la: eprex.nomina.la,
    });
    console.log(`Unmatched: ${eprex.id} (${eprex.nomina.la})`);
  }
}

console.log(`\nTotal matched: ${matchCount}`);
console.log(`Total unmatched: ${unmatched.length}`);

// Write updated sanctorale.json
writeFileSync(
  './src/sanctorale.json',
  JSON.stringify(sanctoraleJson, null, 2) + '\n'
);
console.log('\nUpdated src/sanctorale.json');

// Write unmatched entries
if (unmatched.length > 0) {
  writeFileSync(
    './src/unmatched_sanctorale.json',
    JSON.stringify(unmatched, null, 2) + '\n'
  );
  console.log(
    `Wrote ${unmatched.length} unmatched entries to src/unmatched_sanctorale.json`
  );
} else {
  // Remove the unmatched file if it exists and there are no unmatched entries
  const unmatchedPath = './src/unmatched_sanctorale.json';
  if (existsSync(unmatchedPath)) {
    unlinkSync(unmatchedPath);
    console.log('Removed src/unmatched_sanctorale.json (no unmatched entries)');
  }
}
