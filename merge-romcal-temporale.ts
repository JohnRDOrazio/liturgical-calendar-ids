/**
 * Script to merge romcal temporale data into litcal temporale/feriale JSON files
 * Maps romcal_id to romcal_key using pattern matching on IDs
 */

import { existsSync } from "fs";
import {
  safeReadFileSync,
  safeWriteFileSync,
  safeUnlinkSync,
} from "./utils/file-helpers";

// Romcal temporale entries that are in litcal's sanctorale
// These are handled separately and should be skipped during temporale matching
const SANCTORALE_EVENTS = new Set([
  "christmas_octave_day_2", // Dec 26 = St. Stephen (in sanctorale)
  "christmas_octave_day_3", // Dec 27 = St. John (in sanctorale)
  "christmas_octave_day_4", // Dec 28 = Holy Innocents (in sanctorale)
]);

// Cross-category mappings: romcal sanctorale entries that are in litcal temporale
const CROSS_CATEGORY_FROM_SANCTORALE: Record<string, string> = {
  immaculate_heart_of_mary: "ImmaculateHeart", // Mobile feast (Saturday after Sacred Heart)
};

// Romcal entries that have no litcal equivalent or are duplicates
const NO_LITCAL_EQUIVALENT = new Set([
  "christmas_time_january_8", // Only used when Epiphany is on Sunday Jan 7
]);

// Litcal entries without romcal equivalents (for documentation)
// - DayAfterEpiphanyJan7-12: Date-based keys when Epiphany is fixed to Jan 6
//   (romcal uses day-of-week format: monday_after_epiphany, etc.)

// Type definitions
interface LitcalEntry {
  litcal_event_key: string;
  name: string;
  eprex_key?: string;
  eprex_code?: string;
  eprex_short_key?: string;
  romcal_key?: string;
}

interface RomcalEntry {
  romcal_id: string;
  name_la: string;
}

// Manual mapping of romcal_id to litcal_event_key for complex cases
const MANUAL_MAPPINGS: Record<string, string> = {
  // Advent Sundays
  advent_1_sunday: "Advent1",
  advent_2_sunday: "Advent2",
  advent_3_sunday: "Advent3",
  advent_4_sunday: "Advent4",

  // Special Advent days (Dec 17-24)
  advent_december_17: "AdventWeekdayDec17",
  advent_december_18: "AdventWeekdayDec18",
  advent_december_19: "AdventWeekdayDec19",
  advent_december_20: "AdventWeekdayDec20",
  advent_december_21: "AdventWeekdayDec21",
  advent_december_22: "AdventWeekdayDec22",
  advent_december_23: "AdventWeekdayDec23",
  advent_december_24: "AdventWeekdayDec24",

  // Christmas/Epiphany
  nativity_of_the_lord: "Christmas",
  holy_family_of_jesus_mary_and_joseph: "HolyFamily",
  mary_mother_of_god: "MaryMotherOfGod",
  second_sunday_after_christmas: "Christmas2",
  epiphany_of_the_lord: "Epiphany",
  baptism_of_the_lord: "BaptismLord",

  // Christmas Octave (Dec 26-28 are saints' feasts in sanctorale)
  // christmas_octave_day_2 (Dec 26) = St. Stephen (in sanctorale)
  // christmas_octave_day_3 (Dec 27) = St. John (in sanctorale)
  // christmas_octave_day_4 (Dec 28) = Holy Innocents (in sanctorale)
  christmas_octave_day_5: "ChristmasWeekdayDec29",
  christmas_octave_day_6: "ChristmasWeekdayDec30",
  christmas_octave_day_7: "ChristmasWeekdayDec31",

  // Christmas Time (Jan 2-7/8)
  christmas_time_january_2: "ChristmasWeekdayJan2",
  christmas_time_january_3: "ChristmasWeekdayJan3",
  christmas_time_january_4: "ChristmasWeekdayJan4",
  christmas_time_january_5: "ChristmasWeekdayJan5",
  christmas_time_january_6: "ChristmasWeekdayJan6",
  christmas_time_january_7: "ChristmasWeekdayJan7",

  // Days after Epiphany
  monday_after_epiphany: "DayAfterEpiphanyMonday",
  tuesday_after_epiphany: "DayAfterEpiphanyTuesday",
  wednesday_after_epiphany: "DayAfterEpiphanyWednesday",
  thursday_after_epiphany: "DayAfterEpiphanyThursday",
  friday_after_epiphany: "DayAfterEpiphanyFriday",
  saturday_after_epiphany: "DayAfterEpiphanySaturday",

  // Lent
  ash_wednesday: "AshWednesday",
  thursday_after_ash_wednesday: "ThursdayAfterAshWednesday",
  friday_after_ash_wednesday: "FridayAfterAshWednesday",
  saturday_after_ash_wednesday: "SaturdayAfterAshWednesday",

  // Lent Sundays
  lent_1_sunday: "Lent1",
  lent_2_sunday: "Lent2",
  lent_3_sunday: "Lent3",
  lent_4_sunday: "Lent4",
  lent_5_sunday: "Lent5",

  // Holy Week
  palm_sunday_of_the_passion_of_the_lord: "PalmSun",
  holy_monday: "MonHolyWeek",
  holy_tuesday: "TueHolyWeek",
  holy_wednesday: "WedHolyWeek",
  holy_thursday: "HolyThursChrism", // Chrism Mass (morning)
  thursday_of_the_lords_supper: "HolyThurs", // Mass of the Lord's Supper (evening)
  friday_of_the_passion_of_the_lord: "GoodFri",
  holy_saturday: "EasterVigil",

  // Divine Mercy Sunday is the same as Easter 2
  divine_mercy_sunday: "Easter2",

  // Sunday of the Word of God is Ordinary Time Sunday 3
  sunday_of_the_word_of_god: "OrdSunday3",

  // Easter
  easter_sunday: "Easter",
  easter_monday: "MonOctaveEaster",
  easter_tuesday: "TueOctaveEaster",
  easter_wednesday: "WedOctaveEaster",
  easter_thursday: "ThuOctaveEaster",
  easter_friday: "FriOctaveEaster",
  easter_saturday: "SatOctaveEaster",

  // Easter Sundays
  easter_time_2_sunday: "Easter2",
  easter_time_3_sunday: "Easter3",
  easter_time_4_sunday: "Easter4",
  easter_time_5_sunday: "Easter5",
  easter_time_6_sunday: "Easter6",
  easter_time_7_sunday: "Easter7",

  // Pentecost and after
  pentecost_sunday: "Pentecost",
  ascension_of_the_lord: "Ascension",
  most_holy_trinity: "Trinity",
  most_holy_body_and_blood_of_christ: "CorpusChristi",
  most_sacred_heart_of_jesus: "SacredHeart",

  // Christ the King
  our_lord_jesus_christ_king_of_the_universe: "ChristKing",
};

// Generate weekday mappings programmatically
function generateWeekdayMappings(): Record<string, string> {
  const mappings: Record<string, string> = {};
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const litcalDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Advent weekdays (weeks 1-3, week 4 has special Dec 17-24 days)
  for (let week = 1; week <= 3; week++) {
    for (let d = 0; d < days.length; d++) {
      mappings[`advent_${week}_${days[d]}`] =
        `AdventWeekday${week}${litcalDays[d]}`;
    }
  }

  // Lent weekdays (weeks 1-5)
  for (let week = 1; week <= 5; week++) {
    for (let d = 0; d < days.length; d++) {
      mappings[`lent_${week}_${days[d]}`] = `LentWeekday${week}${litcalDays[d]}`;
    }
  }

  // Easter time weekdays (weeks 2-7)
  for (let week = 2; week <= 7; week++) {
    for (let d = 0; d < days.length; d++) {
      mappings[`easter_time_${week}_${days[d]}`] =
        `EasterWeekday${week}${litcalDays[d]}`;
    }
  }

  // Ordinary time weekdays (weeks 1-34)
  for (let week = 1; week <= 34; week++) {
    for (let d = 0; d < days.length; d++) {
      mappings[`ordinary_time_${week}_${days[d]}`] =
        `OrdWeekday${week}${litcalDays[d]}`;
    }
  }

  // Ordinary time Sundays (weeks 1-34)
  for (let week = 1; week <= 34; week++) {
    // Week 34 Sunday is Christ the King
    if (week < 34) {
      mappings[`ordinary_time_${week}_sunday`] = `OrdSunday${week}`;
    }
  }

  return mappings;
}

// Combine all mappings
const ALL_MAPPINGS: Record<string, string> = {
  ...MANUAL_MAPPINGS,
  ...generateWeekdayMappings(),
};

// Source files to update
const SOURCE_FILES = [
  "./src/temporale.json",
  "./src/feriale_per_annum.json",
  "./src/feriale_tempus_adventus.json",
  "./src/feriale_tempus_nativitatis.json",
  "./src/feriale_tempus_quadragesimae.json",
  "./src/feriale_tempus_paschatis.json",
];

// Read all source files and build combined lookup
const allEntries: Map<string, { entry: LitcalEntry; file: string; index: number }> =
  new Map();

for (const file of SOURCE_FILES) {
  if (!existsSync(file)) {
    console.log(`Warning: ${file} not found, skipping`);
    continue;
  }
  const entries = JSON.parse(safeReadFileSync(file)) as LitcalEntry[];
  entries.forEach((entry, index) => {
    if (entry.litcal_event_key) {
      allEntries.set(entry.litcal_event_key, { entry, file, index });
    }
  });
}

console.log(`Found ${allEntries.size} total entries across all source files`);

// Read romcal temporale
const romcalJson = JSON.parse(
  safeReadFileSync("./romcal/temporale.json")
) as RomcalEntry[];

console.log(`Found ${romcalJson.length} entries in romcal/temporale.json`);

// Track matches
const unmatched: RomcalEntry[] = [];
const usedKeys = new Set<string>();
let matchCount = 0;

// Map to track file updates
const fileUpdates: Map<string, LitcalEntry[]> = new Map();

// Initialize file updates with current content
for (const file of SOURCE_FILES) {
  if (existsSync(file)) {
    const entries = JSON.parse(safeReadFileSync(file)) as LitcalEntry[];
    // Clear existing romcal_key values to allow idempotent re-runs of this script
    for (const entry of entries) {
      delete entry.romcal_key;
    }
    fileUpdates.set(file, entries);
  }
}

// Process romcal entries
for (const romcal of romcalJson) {
  // Skip entries that are in sanctorale (handled separately)
  if (SANCTORALE_EVENTS.has(romcal.romcal_id)) {
    console.log(`Skipped (sanctorale): ${romcal.romcal_id}`);
    continue;
  }

  // Skip entries that have no litcal equivalent
  if (NO_LITCAL_EQUIVALENT.has(romcal.romcal_id)) {
    unmatched.push(romcal);
    console.log(`Unmatched (no litcal equivalent): ${romcal.romcal_id}`);
    continue;
  }

  const mapping = ALL_MAPPINGS[romcal.romcal_id];

  if (mapping && allEntries.has(mapping) && !usedKeys.has(mapping)) {
    const entryData = allEntries.get(mapping);
    const fileEntries = entryData ? fileUpdates.get(entryData.file) : undefined;
    if (!entryData || !fileEntries) continue;
    const { file, index } = entryData;
    fileEntries[index] = {
      ...fileEntries[index],
      romcal_key: romcal.romcal_id,
    };
    usedKeys.add(mapping);
    console.log(`Matched: ${mapping} -> ${romcal.romcal_id}`);
    matchCount++;
  } else if (!mapping) {
    unmatched.push(romcal);
    console.log(`Unmatched (no mapping): ${romcal.romcal_id}`);
  } else if (!allEntries.has(mapping)) {
    unmatched.push(romcal);
    console.log(`Unmatched (key not found): ${romcal.romcal_id} -> ${mapping}`);
  } else {
    unmatched.push(romcal);
    console.log(`Unmatched (already used): ${romcal.romcal_id}`);
  }
}

// Process cross-category mappings (romcal sanctorale → litcal temporale)
for (const [romcalId, litcalKey] of Object.entries(CROSS_CATEGORY_FROM_SANCTORALE)) {
  if (allEntries.has(litcalKey) && !usedKeys.has(litcalKey)) {
    const entryData = allEntries.get(litcalKey);
    const fileEntries = entryData ? fileUpdates.get(entryData.file) : undefined;
    if (!entryData || !fileEntries) continue;
    const { file, index } = entryData;
    fileEntries[index] = {
      ...fileEntries[index],
      romcal_key: romcalId,
    };
    usedKeys.add(litcalKey);
    console.log(`Cross-category: ${litcalKey} -> ${romcalId} (from sanctorale)`);
    matchCount++;
  }
}

console.log(`\nTotal matched: ${matchCount}`);
console.log(`Total unmatched: ${unmatched.length}`);

// Find entries without romcal_key
const missing: Array<{ litcal_event_key: string; name: string; file: string }> =
  [];
for (const [key, { entry, file }] of allEntries) {
  if (!usedKeys.has(key)) {
    missing.push({
      litcal_event_key: entry.litcal_event_key,
      name: entry.name,
      file: file.replace("./src/", ""),
    });
  }
}

console.log(`Missing romcal_key in source files: ${missing.length}`);

// Write updated files
for (const [file, entries] of fileUpdates) {
  safeWriteFileSync(file, JSON.stringify(entries, null, 2) + "\n");
  console.log(`Updated ${file}`);
}

// Write unmatched romcal entries
const unmatchedPath = "./romcal/temporale_unmatched.json";
if (unmatched.length > 0) {
  safeWriteFileSync(unmatchedPath, JSON.stringify(unmatched, null, 2) + "\n");
  console.log(
    `Wrote ${unmatched.length} unmatched entries to romcal/temporale_unmatched.json`
  );
} else {
  if (existsSync(unmatchedPath)) {
    safeUnlinkSync(unmatchedPath);
    console.log(
      "Removed romcal/temporale_unmatched.json (no unmatched entries)"
    );
  }
}

// Write missing entries
const missingPath = "./romcal/temporale_missing.json";
if (missing.length > 0) {
  safeWriteFileSync(missingPath, JSON.stringify(missing, null, 2) + "\n");
  console.log(
    `Wrote ${missing.length} missing entries to romcal/temporale_missing.json`
  );
} else {
  if (existsSync(missingPath)) {
    safeUnlinkSync(missingPath);
    console.log("Removed romcal/temporale_missing.json (no missing entries)");
  }
}
