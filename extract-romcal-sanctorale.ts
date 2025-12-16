/**
 * Extract all Proper of Saints (sanctorale) IDs from romcal's General Roman Calendar
 * and generate a JSON file with IDs and Latin names
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Read the general-roman calendar file
const generalRomanPath = join(
  import.meta.dir,
  "..",
  "romcal",
  "rites",
  "roman1969",
  "src",
  "calendars",
  "general-roman",
  "index.ts"
);

const generalRomanContent = readFileSync(generalRomanPath, "utf-8");

// Read the Latin locale file
const latinLocalePath = join(
  import.meta.dir,
  "..",
  "romcal",
  "rites",
  "roman1969",
  "src",
  "locales",
  "la.ts"
);

const latinLocaleContent = readFileSync(latinLocalePath, "utf-8");

// Extract the names object from the Latin locale
// The file exports: export const locale: Locale = { ... names: { ... } ... }
const namesMatch = latinLocaleContent.match(/names:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);

if (!namesMatch) {
  console.error("Could not find names object in Latin locale file");
  process.exit(1);
}

// Parse the names object into a map
const latinNames: Record<string, string> = {};
const namesContent = namesMatch[1];

// Match key-value pairs like: key: 'value' or key: "value"
// Handle multi-line values and nested template strings
const nameEntries = namesContent.matchAll(
  /(\w+):\s*['"`]([^'"`]+)['"`]/g
);

for (const match of nameEntries) {
  const [, key, value] = match;
  latinNames[key] = value;
}

// Extract all event IDs from the inputs object in general-roman/index.ts
// The pattern is: event_id: { ... }
const inputsMatch = generalRomanContent.match(/inputs:\s*Inputs\s*=\s*\{([\s\S]+)\};?\s*\}/);

if (!inputsMatch) {
  console.error("Could not find inputs object in general-roman file");
  process.exit(1);
}

const inputsContent = inputsMatch[1];

// Find all event IDs (they are keys at the start of lines, followed by colon and opening brace)
const eventIdPattern = /^\s{4}(\w+):\s*\{/gm;
const eventIds: string[] = [];

let match;
while ((match = eventIdPattern.exec(inputsContent)) !== null) {
  eventIds.push(match[1]);
}

interface SanctoraleEvent {
  romcal_id: string;
  name_la: string;
}

const events: SanctoraleEvent[] = [];

for (const id of eventIds) {
  const name_la = latinNames[id] || `[Missing Latin name for: ${id}]`;
  events.push({ romcal_id: id, name_la });
}

// Sort by romcal_id for consistency
events.sort((a, b) => a.romcal_id.localeCompare(b.romcal_id));

// Write to JSON file
const outputPath = join(import.meta.dir, "romcal", "sanctorale.json");

writeFileSync(outputPath, JSON.stringify(events, null, 2));

console.log(`Generated ${events.length} sanctorale events`);
console.log(`Output written to: ${outputPath}`);

// Report any missing Latin names
const missing = events.filter((e) => e.name_la.startsWith("[Missing"));
if (missing.length > 0) {
  console.log(`\nWarning: ${missing.length} events have missing Latin names:`);
  for (const e of missing) {
    console.log(`  - ${e.romcal_id}`);
  }
}
