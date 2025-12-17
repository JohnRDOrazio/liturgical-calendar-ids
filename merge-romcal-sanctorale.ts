/**
 * Script to merge romcal sanctorale data into the liturgy_ids sanctorale.json
 * Maps romcal_id to romcal_key using Levenshtein distance on IDs and Latin names
 */

import { existsSync } from "fs";
import {
  safeReadFileSync,
  safeWriteFileSync,
  safeUnlinkSync,
} from "./utils/file-helpers";
import { levenshteinDistance } from "./utils/ast-helpers";

// Romcal entries that are in litcal's temporale (not sanctorale)
// These are handled separately and should be skipped during sanctorale matching
const TEMPORALE_EVENTS = new Set([
  "immaculate_heart_of_mary", // Mobile feast: Saturday after Sacred Heart → ImmaculateHeart
]);

// Manual mapping of romcal_id to litcal_event_key for complex cases
const MANUAL_MAPPINGS: Record<string, string> = {
  // Different naming patterns
  basil_the_great_and_gregory_nazianzen_bishops: "StsBasilGreg",
  anthony_of_egypt_abbot: "StAnthonyEgypt",
  fabian_i_pope: "StFabianPope",
  sebastian_of_milan_martyr: "StSebastian",
  agnes_of_rome_virgin: "StAgnes",
  vincent_of_saragossa_deacon: "StVincentDeacon",
  conversion_of_saint_paul_the_apostle: "ConversionStPaul",
  timothy_of_ephesus_and_titus_of_crete_bishops: "StsTimothyTitus",
  agatha_of_sicily_virgin: "StAgatha",
  paul_miki_and_companions_martyrs: "StsPaulMiki",
  scholastica_of_nursia_virgin: "StScholastica",
  cyril_constantine_the_philosopher_monk_and_methodius_michael_of_thessaloniki_bishop:
    "StsCyrilMethodius",
  polycarp_of_smyrna_bishop: "StPolycarp",
  perpetua_of_carthage_and_felicity_of_carthage_martyrs: "StsPerpetuaFelicity",
  joseph_spouse_of_mary: "StJoseph",
  catherine_of_siena_virgin: "StCatherineSiena",
  joseph_the_worker: "StJosephWorker",
  philip_and_james_apostles: "StsPhilipJames",
  matthias_apostle: "StMatthiasAp",
  barnabas_apostle: "StBarnabasAp",
  nativity_of_john_the_baptist: "NativityJohnBaptist",
  peter_and_paul_apostles: "StsPeterPaulAp",
  thomas_apostle: "StThomasAp",
  bridget_of_sweden_religious: "StBridget",
  james_apostle: "StJamesAp",
  joachim_and_anne_parents_of_mary: "StsJoachimAnne",
  ignatius_of_loyola_priest: "StIgnatiusLoyola",
  lawrence_of_rome_deacon: "StLawrenceDeacon",
  bartholomew_apostle: "StBartholomewAp",
  passion_of_saint_john_the_baptist: "BeheadingJohnBaptist",
  our_lady_of_sorrows: "OurLadyOfSorrows",
  matthew_apostle: "StMatthewEvangelist",
  michael_gabriel_and_raphael_archangels: "StsArchangels",
  francis_of_assisi: "StFrancisAssisi",
  teresa_of_jesus_of_avila_virgin: "StTeresaJesus",
  simon_and_jude_apostles: "StSimonStJudeAp",
  all_saints: "AllSaints",
  commemoration_of_all_the_faithful_departed: "AllSouls",
  dedication_of_the_lateran_basilica: "DedicationLateran",
  andrew_apostle: "StAndrewAp",
  stephen_the_first_martyr: "StStephenProtomartyr",
  john_apostle: "StJohnEvangelist",
  sylvester_i_pope: "StSylvesterIPope",

  // Additional mappings
  chair_of_saint_peter_the_apostle: "ChairStPeter",
  mark_evangelist: "StMarkEvangelist",
  first_martyrs_of_the_holy_roman_church: "FirstMartyrsRome",
  martha_of_bethany_mary_of_bethany_and_lazarus_of_bethany: "StMartha",
  transfiguration_of_the_lord: "Transfiguration",
  assumption_of_the_blessed_virgin_mary: "Assumption",
  exaltation_of_the_holy_cross: "ExaltationCross",
  cornelius_i_pope_and_cyprian_of_carthage_bishop_martyrs:
    "StsCorneliusCyprian",
  luke_evangelist: "StLukeEvangelist",
  annunciation_of_the_lord: "Annunciation",
  presentation_of_the_lord: "Presentation",
  immaculate_conception_of_the_blessed_virgin_mary: "ImmaculateConception",
  nativity_of_the_blessed_virgin_mary: "NativityBVM",
  holy_innocents_martyrs: "HolyInnocents",
  holy_guardian_angels: "GuardianAngels",
  our_lady_of_the_rosary: "OurLadyRosary",
  presentation_of_the_blessed_virgin_mary: "PresentationMary",
  queenship_of_the_blessed_virgin_mary: "QueenshipBVM",
  dedication_of_the_basilica_of_saint_mary_major: "DedicationStMaryMajor",
  dedication_of_the_basilicas_of_saints_peter_and_paul_apostles:
    "DedicationStsPeterPaul",
  visitation_of_mary: "Visitation",
  most_holy_name_of_jesus: "NameJesus",
  most_holy_name_of_mary: "HolyNameMary",
  mary_mother_of_the_church: "MotherChurch",

  // Saints with abbreviated names
  john_mary_vianney_priest: "StJohnVianney",
  therese_of_the_child_jesus_and_the_holy_face_of_lisieux_virgin:
    "StThereseChildJesus",
  pius_francesco_forgione_priest: "StPioPietrelcina",
  john_of_the_cross_priest: "StJohnCross",
  john_baptist_de_la_salle_priest: "StJohnBaptisteLaSalle",
  john_bosco_priest: "StJohnBosco",
  francis_de_sales_bishop: "StFrancisSales",
  thomas_aquinas_priest: "StThomasAquinas",
  anthony_of_padua_priest: "StAnthonyPadua",
  aloysius_gonzaga_religious: "StAloysiusGonzaga",
  alphonsus_mary_liguori_bishop: "StAlphonsusMariaDeLiguori",
  augustine_of_hippo_bishop: "StAugustine",
  ambrose_of_milan_bishop: "StAmbrose",
  bernard_of_clairvaux_abbot: "StBernardClairvaux",
  bonaventure_of_bagnoregio_bishop: "StBonaventure",
  dominic_de_guzman_priest: "StDominic",
  clare_of_assisi_virgin: "StClare",
  benedict_of_nursia_abbot: "StBenedict",
  maximilian_mary_raymund_kolbe_priest: "StMaximilianKolbe",
  elizabeth_of_hungary_religious: "StElizabethHungary",
  cecilia_of_rome_virgin: "StCecilia",
  andrew_dung_lac_priest_and_companions_martyrs: "StAndrewDungLac",
  charles_lwanga_and_companions_martyrs: "StsCharlesLwanga",
  boniface_of_mainz_bishop: "StBoniface",
  irenaeus_of_lyon_bishop: "StIrenaeus",
  jerome_of_stridon_priest: "StJerome",
  gregory_i_the_great_pope: "StGregoryGreat",
  leo_i_the_great_pope: "StLeoGreat",
  martin_of_tours_bishop: "StMartinTours",
  josaphat_kuntsevych_bishop: "StJosaphat",
  charles_borromeo_bishop: "StCharlesBorromeo",
  ignatius_of_antioch_bishop: "StIgnatiusAntioch",
  john_chrysostom_bishop: "StJohnChrysostom",
  athanasius_of_alexandria_bishop: "StAthanasius",
  hilary_of_poitiers_bishop: "StHilary",
  angela_merici_virgin: "StAngelaMerici",
  monica_of_hippo: "StMonica",
  rose_of_lima_virgin: "StRoseLima",
  pius_x_pope: "StPiusX",
  justin_martyr: "StJustinMartyr",
  philip_neri_priest: "StPhilipNeri",
  francis_xavier_priest: "StFrancisXavier",
  lucy_of_syracuse_virgin: "StLucy",
  john_of_kanty_priest: "StJohnKanty",
  peter_canisius_priest: "StPeterCanisius",
  andrew_kim_tae_gon_priest_paul_chong_ha_sang_and_companions_martyrs:
    "StsAndrewKim",
  vincent_de_paul_priest: "StVincentPaul",
  robert_bellarmine_bishop: "StRobertBellarmine",
  stanislaus_of_szczepanow_bishop: "StStanislaus",

  // Additional mappings from unmatched/missing comparison
  albert_the_great_bishop: "StAlbertGreat",
  ansgar_of_hamburg_bishop: "StAnsgar",
  casimir_of_poland: "StCasimir",
  columban_of_luxeuil_abbot: "StColumban",
  faustina_kowalska_virgin: "StFaustinaKowalska",
  george_of_lydda_martyr: "StGeorge",
  gertrude_the_great_virgin: "StGertrudeGreat",
  henry_ii_emperor: "StHenry",
  hildegard_of_bingen_abbess: "StHildegardBingen",
  louis_ix_of_france: "StLouis",
  marcellinus_of_rome_and_peter_the_exorcist_martyrs: "StsMarcellinusPeter",
  nereus_of_terracina_and_achilleus_of_terracina_martyrs: "StsNereusAchilleus",
  nicholas_of_myra_bishop: "StNicholas",
  norbert_of_xanten_bishop: "StNorbert",
  patrick_of_ireland_bishop: "StPatrick",
  paul_vi_pope: "StPaulVI",
  pius_v_pope: "StPiusV",
  romuald_of_ravenna_abbot: "StRomuald",
  teresa_benedicta_of_the_cross_stein_virgin: "StEdithStein",
  // Note: immaculate_heart_of_mary is a mobile feast (Saturday after Sacred Heart)
  // and has no corresponding entry in sanctorale.json
};

// Read the sanctorale.json file
const sanctoraleJson = JSON.parse(
  safeReadFileSync("./src/sanctorale.json")
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

// Read the romcal sanctorale.json file
const romcalJson = JSON.parse(
  safeReadFileSync("./romcal/sanctorale.json")
) as Array<{
  romcal_id: string;
  name_la: string;
}>;

console.log(`Found ${sanctoraleJson.length} entries in src/sanctorale.json`);
console.log(`Found ${romcalJson.length} entries in romcal/sanctorale.json`);

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

// Normalize Latin text for comparison
function normalizeLatinName(name: string): string {
  return name
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/œ/g, "oe")
    .replace(/[.,;:'"()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Convert event key formats
function normalizeKey(key: string): string {
  // Convert snake_case to lowercase for comparison
  return key.toLowerCase().replace(/_/g, "");
}

// Track matches
const unmatched: Array<{
  romcal_id: string;
  name_la: string;
}> = [];

const usedSanctoraleKeys = new Set<string>();
let matchCount = 0;

// First, clear existing romcal_key values (they appear to be eprex-style keys)
for (const entry of sanctoraleJson) {
  delete entry.romcal_key;
}

for (const romcal of romcalJson) {
  // Skip entries that are in temporale (handled separately)
  if (TEMPORALE_EVENTS.has(romcal.romcal_id)) {
    console.log(`Skipped (temporale): ${romcal.romcal_id}`);
    continue;
  }

  let matchFound = false;
  let matchedKey: string | null = null;

  // First check manual mappings
  if (MANUAL_MAPPINGS[romcal.romcal_id]) {
    const manualKey = MANUAL_MAPPINGS[romcal.romcal_id];
    if (sanctoraleByKey.has(manualKey) && !usedSanctoraleKeys.has(manualKey)) {
      matchFound = true;
      matchedKey = manualKey;
    }
  }

  // If no manual match, try key similarity
  if (!matchFound) {
    const romcalKeyNorm = normalizeKey(romcal.romcal_id);

    for (const [key] of sanctoraleByKey) {
      if (usedSanctoraleKeys.has(key)) continue;

      const sanctoraleKeyNorm = normalizeKey(key);

      // Check if keys are similar using multiple strategies:
      // 1. Exact match
      // 2. Substring match (with length threshold >4 to avoid false positives)
      // 3. Levenshtein distance (within 25% of max key length)
      const maxLen = Math.max(romcalKeyNorm.length, sanctoraleKeyNorm.length);
      const maxDistance = Math.floor(maxLen * 0.25);
      const distance = levenshteinDistance(romcalKeyNorm, sanctoraleKeyNorm);

      if (
        sanctoraleKeyNorm === romcalKeyNorm ||
        (romcalKeyNorm.length > 6 &&
          sanctoraleKeyNorm.includes(romcalKeyNorm)) ||
        (sanctoraleKeyNorm.length > 6 &&
          romcalKeyNorm.includes(sanctoraleKeyNorm)) ||
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
    const romcalNameNorm = normalizeLatinName(romcal.name_la);

    for (const [key, entry] of sanctoraleByKey) {
      if (usedSanctoraleKeys.has(key)) continue;

      const sanctoraleNameNorm = normalizeLatinName(entry.name);

      // Check name similarity
      const maxLen = Math.max(romcalNameNorm.length, sanctoraleNameNorm.length);
      const maxDistance = Math.floor(maxLen * 0.2);
      const distance = levenshteinDistance(romcalNameNorm, sanctoraleNameNorm);

      if (
        sanctoraleNameNorm === romcalNameNorm ||
        (romcalNameNorm.length > 10 &&
          sanctoraleNameNorm.includes(romcalNameNorm)) ||
        (sanctoraleNameNorm.length > 10 &&
          romcalNameNorm.includes(sanctoraleNameNorm)) ||
        distance <= maxDistance
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
      romcal_key: romcal.romcal_id,
    };

    console.log(`Matched: ${matchedKey} -> ${romcal.romcal_id}`);
    matchCount++;
  } else {
    unmatched.push({
      romcal_id: romcal.romcal_id,
      name_la: romcal.name_la,
    });
    console.log(`Unmatched: ${romcal.romcal_id} (${romcal.name_la})`);
  }
}

console.log(`\nTotal matched: ${matchCount}`);
console.log(`Total unmatched: ${unmatched.length}`);

// Find entries in sanctorale.json that still don't have romcal_key
const missing = sanctoraleJson
  .filter((entry) => !entry.romcal_key)
  .map((entry) => ({
    litcal_event_key: entry.litcal_event_key,
    name: entry.name,
  }));

console.log(`Missing romcal_key in src/sanctorale.json: ${missing.length}`);

// Write updated sanctorale.json
safeWriteFileSync(
  "./src/sanctorale.json",
  JSON.stringify(sanctoraleJson, null, 2) + "\n"
);
console.log("\nUpdated src/sanctorale.json");

// Write unmatched romcal entries
const unmatchedPath = "./romcal/sanctorale_unmatched.json";
if (unmatched.length > 0) {
  safeWriteFileSync(unmatchedPath, JSON.stringify(unmatched, null, 2) + "\n");
  console.log(
    `Wrote ${unmatched.length} unmatched entries to romcal/sanctorale_unmatched.json`
  );
} else {
  if (existsSync(unmatchedPath)) {
    safeUnlinkSync(unmatchedPath);
    console.log(
      "Removed romcal/sanctorale_unmatched.json (no unmatched entries)"
    );
  }
}

// Write missing entries (src entries without romcal_key)
const missingPath = "./romcal/sanctorale_missing.json";
if (missing.length > 0) {
  safeWriteFileSync(missingPath, JSON.stringify(missing, null, 2) + "\n");
  console.log(
    `Wrote ${missing.length} missing entries to romcal/sanctorale_missing.json`
  );
} else {
  if (existsSync(missingPath)) {
    safeUnlinkSync(missingPath);
    console.log("Removed romcal/sanctorale_missing.json (no missing entries)");
  }
}
