/**
 * Script to generate missing_keys.json files for entries without eprex mappings
 */

import { existsSync } from 'fs';
import {
  safeReadFileSync,
  safeWriteFileSync,
  safeUnlinkSync,
  safeParseJson,
} from './utils/file-helpers';

interface LitcalEntry {
  litcal_event_key: string;
  name: string;
  eprex_key?: string;
  missal?: string;
  decree?: string;
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
      console.log(
        `${category}: All entries have eprex mappings, removed ${outputFile}`
      );
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
