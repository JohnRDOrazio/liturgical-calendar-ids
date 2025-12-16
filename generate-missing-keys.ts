/**
 * Script to generate missing_keys.json files for entries without eprex mappings
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';

interface LitcalEntry {
  litcal_event_key: string;
  name: string;
  eprex_key?: string;
  missal?: string;
  decree?: string;
}

function safeReadFileSync(filePath: string): string {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error reading file '${filePath}': ${message}`);
    process.exit(1);
  }
}

function safeWriteFileSync(filePath: string, content: string): void {
  try {
    writeFileSync(filePath, content);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error writing file '${filePath}': ${message}`);
    process.exit(1);
  }
}

function safeUnlinkSync(filePath: string): void {
  try {
    unlinkSync(filePath);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error deleting file '${filePath}': ${message}`);
    process.exit(1);
  }
}

function generateMissingKeys(
  sourceFile: string,
  outputFile: string,
  category: string
): void {
  const entries = JSON.parse(safeReadFileSync(sourceFile)) as LitcalEntry[];

  const missingKeys = entries
    .filter((entry) => !entry.eprex_key)
    .map((entry) => ({
      litcal_event_key: entry.litcal_event_key,
      name: entry.name,
    }));

  if (missingKeys.length > 0) {
    safeWriteFileSync(outputFile, JSON.stringify(missingKeys, null, 2) + '\n');
    console.log(
      `${category}: ${missingKeys.length} entries without eprex mappings -> ${outputFile}`
    );
  } else {
    if (existsSync(outputFile)) {
      safeUnlinkSync(outputFile);
      console.log(`${category}: All entries have eprex mappings, removed ${outputFile}`);
    } else {
      console.log(`${category}: All entries have eprex mappings`);
    }
  }
}

// Generate missing keys for temporale
generateMissingKeys(
  './src/temporale.json',
  './eprex/temporale_missing_keys.json',
  'Temporale'
);

// Generate missing keys for sanctorale
generateMissingKeys(
  './src/sanctorale.json',
  './eprex/sanctorale_missing_keys.json',
  'Sanctorale'
);
