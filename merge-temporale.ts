/**
 * Script to merge eprex temporale data into the liturgy_ids temporale.json
 */

import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import * as ts from 'typescript';

// Helper function to read a file with error handling
function safeReadFileSync(filePath: string): string {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error reading file '${filePath}': ${message}`);
    process.exit(1);
  }
}

// Helper function to write a file with error handling
function safeWriteFileSync(filePath: string, content: string): void {
  try {
    writeFileSync(filePath, content);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error writing file '${filePath}': ${message}`);
    process.exit(1);
  }
}

// Helper function to delete a file with error handling
function safeUnlinkSync(filePath: string): void {
  try {
    unlinkSync(filePath);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error deleting file '${filePath}': ${message}`);
    process.exit(1);
  }
}

// Manual mapping of eprex_key to litcal_event_key for complex cases
const MANUAL_MAPPINGS: Record<string, string> = {
  // Baptism and Christmas cycle
  baptism_of_the_lord: 'BaptismLord',
  holy_family: 'HolyFamily',
  second_sunday_after_christmas: 'Christmas2',

  // Lent
  ash_wednesday: 'AshWednesday',

  // Holy Week
  palm_sunday: 'PalmSun',
  monday_of_holy_week: 'MonHolyWeek',
  tuesday_of_holy_week: 'TueHolyWeek',
  wednesday_of_holy_week: 'WedHolyWeek',

  // Triduum
  holy_thursday: 'HolyThurs',
  good_friday: 'GoodFri',
  holy_saturday: 'EasterVigil', // Different terminology in litcal

  // Easter
  easter_sunday: 'Easter',

  // Easter Octave
  monday_of_easter_octave: 'MonOctaveEaster',
  tuesday_of_easter_octave: 'TueOctaveEaster',
  wednesday_of_easter_octave: 'WedOctaveEaster',
  thursday_of_easter_octave: 'ThuOctaveEaster',
  friday_of_easter_octave: 'FriOctaveEaster',
  saturday_of_easter_octave: 'SatOctaveEaster',
  divine_mercy_sunday: 'Easter2',

  // Post-Easter solemnities
  ascension_of_the_lord: 'Ascension',
  pentecost_sunday: 'Pentecost',
  most_holy_trinity: 'Trinity',
  most_holy_body_and_blood_of_christ: 'CorpusChristi',
  most_sacred_heart_of_jesus: 'SacredHeart',
  christ_the_king: 'ChristKing',

  // Marian memorials
  immaculate_heart_of_mary: 'ImmaculateHeart',
};

// Cross-category entries: eprex temporale entries mapped to other litcal categories
// These are excluded from temporale_unmatched.json since they're mapped elsewhere
const CROSS_CATEGORY_ENTRIES = new Set([
  'thursday_after_ash_wednesday', // -> feriale_tempus_quadragesimae.json
  'friday_after_ash_wednesday', // -> feriale_tempus_quadragesimae.json
  'saturday_after_ash_wednesday', // -> feriale_tempus_quadragesimae.json
  'mary_mother_of_the_church', // -> sanctorale.json (MaryMotherChurch)
]);

// Read the temporale.json file
const temporaleJson = JSON.parse(
  safeReadFileSync('./src/temporale.json')
) as Array<{
  litcal_event_key: string;
  name: string;
  eprex_key?: string;
  eprex_code?: string;
  eprex_short_key?: string;
  romcal_key?: string;
}>;

// Build lookup by litcal_event_key
const temporaleByKey = new Map<
  string,
  (typeof temporaleJson)[number] & { index: number }
>();
temporaleJson.forEach((entry, index) => {
  if (entry.litcal_event_key) {
    temporaleByKey.set(entry.litcal_event_key, { ...entry, index });
  }
});

// Define the structure for eprex entries
interface EprexEntry {
  code: string;
  id: string;
  shortCode: string;
  nomina: { la: string; en: string };
  externalIds?: { romcal?: string; eprex?: string };
}

// Parse the temporale.ts file to extract entries using TypeScript AST
const temporaleTsPath = './eprex/temporale.ts';
const temporaleTsContent = safeReadFileSync(temporaleTsPath);

// Helper to get string literal value from AST node
function getStringLiteralValue(node: ts.Node | undefined): string | undefined {
  if (node && ts.isStringLiteral(node)) {
    return node.text;
  }
  return undefined;
}

// Helper to find property in object literal by name
function findProperty(
  obj: ts.ObjectLiteralExpression,
  name: string
): ts.ObjectLiteralElementLike | undefined {
  return obj.properties.find(
    (prop) =>
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name) &&
      prop.name.text === name
  );
}

// Helper to get property value as string
function getPropertyString(
  obj: ts.ObjectLiteralExpression,
  name: string
): string | undefined {
  const prop = findProperty(obj, name);
  if (prop && ts.isPropertyAssignment(prop)) {
    return getStringLiteralValue(prop.initializer);
  }
  return undefined;
}

// Helper to get nested property value (e.g., nomina.la or externalIds.romcal)
function getNestedPropertyString(
  obj: ts.ObjectLiteralExpression,
  parentName: string,
  childName: string
): string | undefined {
  const parentProp = findProperty(obj, parentName);
  if (
    parentProp &&
    ts.isPropertyAssignment(parentProp) &&
    ts.isObjectLiteralExpression(parentProp.initializer)
  ) {
    return getPropertyString(parentProp.initializer, childName);
  }
  return undefined;
}

// Parse source file into AST
const sourceFile = ts.createSourceFile(
  temporaleTsPath,
  temporaleTsContent,
  ts.ScriptTarget.Latest,
  true
);

const eprexEntries: EprexEntry[] = [];

// Traverse AST to find all object literals that match the expected shape
function visit(node: ts.Node): void {
  if (ts.isObjectLiteralExpression(node)) {
    // Extract required properties - entry is only added if ALL are present
    const code = getPropertyString(node, 'code');
    const id = getPropertyString(node, 'id');
    const shortCode = getPropertyString(node, 'shortCode');
    const nominaLa = getNestedPropertyString(node, 'nomina', 'la');

    // Only add entries with all required properties
    if (code && id && shortCode && nominaLa) {
      const romcalId = getNestedPropertyString(node, 'externalIds', 'romcal');
      const eprexId = getNestedPropertyString(node, 'externalIds', 'eprex');
      eprexEntries.push({
        code,
        id,
        shortCode,
        nomina: { la: nominaLa, en: '' },
        externalIds:
          romcalId || eprexId
            ? { romcal: romcalId, eprex: eprexId }
            : undefined,
      });
    } else if (code || id || shortCode || nominaLa) {
      // Warn about partial entries that may indicate format changes
      const missing = [
        !code && 'code',
        !id && 'id',
        !shortCode && 'shortCode',
        !nominaLa && 'nomina.la',
      ].filter(Boolean);
      console.warn(
        `Warning: Skipping partial entry (id: ${id || 'unknown'}) - missing: ${missing.join(', ')}`
      );
    }
  }

  ts.forEachChild(node, visit);
}

visit(sourceFile);

// Validate that we found entries
if (eprexEntries.length === 0) {
  console.error(
    `Error: No valid entries found in '${temporaleTsPath}'. ` +
      'The file format may have changed.'
  );
  process.exit(1);
}

console.log(`Found ${eprexEntries.length} entries in eprex temporale.ts`);

// Normalize Latin text for comparison
function normalizeLatinName(name: string): string {
  return name
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/œ/g, 'oe')
    .replace(/[.,;:«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Convert event key formats
function normalizeKey(key: string): string {
  // Convert snake_case to lowercase for comparison
  return key.toLowerCase().replace(/_/g, '');
}

// Levenshtein distance for fuzzy key matching
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1, // deletion
        matrix[j][i - 1] + 1, // insertion
        matrix[j - 1][i - 1] + substitutionCost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

// Attempt to match entries
const unmatched: Array<{
  eprex_key: string;
  eprex_code: string;
  eprex_short_key: string;
  romcal_key?: string;
  nomina_la: string;
}> = [];

const usedTemporaleKeys = new Set<string>();
let matchCount = 0;

for (const eprex of eprexEntries) {
  let matchFound = false;
  let matchedKey: string | null = null;

  // First check manual mappings
  if (MANUAL_MAPPINGS[eprex.id]) {
    const manualKey = MANUAL_MAPPINGS[eprex.id];
    if (temporaleByKey.has(manualKey) && !usedTemporaleKeys.has(manualKey)) {
      matchFound = true;
      matchedKey = manualKey;
    }
  }

  // If no manual match, try key similarity
  if (!matchFound) {
    const eprexKeyNorm = normalizeKey(eprex.id);

    for (const [key] of temporaleByKey) {
      if (usedTemporaleKeys.has(key)) continue;

      const temporaleKeyNorm = normalizeKey(key);

      // Check if keys are similar using multiple strategies:
      // 1. Exact match
      // 2. Substring match (with length threshold >4 to avoid false positives)
      // 3. Levenshtein distance (within 30% of max key length)
      const maxLen = Math.max(eprexKeyNorm.length, temporaleKeyNorm.length);
      const maxDistance = Math.floor(maxLen * 0.3);
      const distance = levenshteinDistance(eprexKeyNorm, temporaleKeyNorm);

      if (
        temporaleKeyNorm === eprexKeyNorm ||
        (eprexKeyNorm.length > 4 && temporaleKeyNorm.includes(eprexKeyNorm)) ||
        (temporaleKeyNorm.length > 4 && eprexKeyNorm.includes(temporaleKeyNorm)) ||
        distance <= maxDistance
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

    for (const [key, entry] of temporaleByKey) {
      if (usedTemporaleKeys.has(key)) continue;

      const temporaleNameNorm = normalizeLatinName(entry.name);

      // Check if names are similar using multiple strategies:
      // 1. Exact match
      // 2. Substring match (with length threshold >4 to avoid false positives)
      if (
        temporaleNameNorm === eprexNameNorm ||
        (eprexNameNorm.length > 4 && temporaleNameNorm.includes(eprexNameNorm)) ||
        (temporaleNameNorm.length > 4 && eprexNameNorm.includes(temporaleNameNorm))
      ) {
        matchFound = true;
        matchedKey = key;
        break;
      }
    }
  }

  if (matchFound && matchedKey) {
    usedTemporaleKeys.add(matchedKey);
    const entryData = temporaleByKey.get(matchedKey)!;
    const idx = entryData.index;

    temporaleJson[idx] = {
      ...temporaleJson[idx],
      eprex_key: eprex.id,
      eprex_code: eprex.code,
      eprex_short_key: eprex.shortCode,
      ...(eprex.externalIds?.romcal && { romcal_key: eprex.externalIds.romcal }),
    };

    console.log(`Matched: ${matchedKey} -> ${eprex.id}`);
    matchCount++;
  } else if (CROSS_CATEGORY_ENTRIES.has(eprex.id)) {
    // Skip cross-category entries - they're mapped in other litcal files
    console.log(`Cross-category: ${eprex.id} (mapped elsewhere)`);
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

// Write updated temporale.json
safeWriteFileSync(
  './src/temporale.json',
  JSON.stringify(temporaleJson, null, 2) + '\n'
);
console.log('\nUpdated src/temporale.json');

// Write unmatched entries
if (unmatched.length > 0) {
  safeWriteFileSync(
    './eprex/temporale_unmatched.json',
    JSON.stringify(unmatched, null, 2) + '\n'
  );
  console.log(
    `Wrote ${unmatched.length} unmatched entries to eprex/temporale_unmatched.json`
  );
} else {
  // Remove the unmatched file if it exists and there are no unmatched entries
  const unmatchedPath = './eprex/temporale_unmatched.json';
  if (existsSync(unmatchedPath)) {
    safeUnlinkSync(unmatchedPath);
    console.log('Removed eprex/temporale_unmatched.json (no unmatched entries)');
  }
}
