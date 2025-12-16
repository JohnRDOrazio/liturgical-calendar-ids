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

function safeParseJson<T>(filePath: string, content: string): T {
  try {
    return JSON.parse(content) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error parsing JSON in '${filePath}': ${message}`);
    process.exit(1);
  }
}

interface MissingKeyEntry {
  litcal_event_key: string;
  name: string;
  missal?: string;
  decree?: string;
}

function generateMissingKeys(
  sourceFile: string,
  outputFile: string,
  category: string,
  includeSource: boolean = false
): void {
  const fileContent = safeReadFileSync(sourceFile);
  const entries = safeParseJson<LitcalEntry[]>(sourceFile, fileContent);

  const missingKeys: MissingKeyEntry[] = entries
    .filter((entry) => !entry.eprex_key)
    .map((entry) => {
      const result: MissingKeyEntry = {
        litcal_event_key: entry.litcal_event_key,
        name: entry.name,
      };
      if (includeSource) {
        if (entry.missal) {
          result.missal = entry.missal;
        }
        if (entry.decree) {
          result.decree = entry.decree;
        }
      }
      return result;
    });

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

// Generate missing keys for sanctorale (include missal/decree properties)
generateMissingKeys(
  './src/sanctorale.json',
  './eprex/sanctorale_missing_keys.json',
  'Sanctorale',
  true
);
