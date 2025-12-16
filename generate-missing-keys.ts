/**
 * Script to generate missing_keys.json and .md files for entries without eprex mappings
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

function filenameToTitle(filename: string): string {
  return filename
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function generateMarkdown(
  entries: MissingKeyEntry[],
  title: string,
  includeSource: boolean
): string {
  const headers = includeSource
    ? ['litcal_event_key', 'name', 'missal/decree']
    : ['litcal_event_key', 'name'];

  const headerRow = `| ${headers.join(' | ')} |`;
  const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
  const dataRows = entries.map((entry) => {
    const values = includeSource
      ? [entry.litcal_event_key, entry.name, entry.missal || entry.decree || '']
      : [entry.litcal_event_key, entry.name];
    return `| ${values.join(' | ')} |`;
  });

  return [title, '', headerRow, separatorRow, ...dataRows, ''].join('\n');
}

function generateMissingKeys(
  sourceFile: string,
  outputJsonFile: string,
  outputMdFile: string,
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
    // Write JSON file
    safeWriteFileSync(
      outputJsonFile,
      JSON.stringify(missingKeys, null, 2) + '\n'
    );

    // Write Markdown file
    const basename = outputMdFile
      .replace('./eprex/', '')
      .replace('.md', '');
    const title = `# ${filenameToTitle(basename)}`;
    const markdown = generateMarkdown(missingKeys, title, includeSource);
    safeWriteFileSync(outputMdFile, markdown);

    console.log(
      `${category}: ${missingKeys.length} entries without eprex mappings`
    );
    console.log(`  -> ${outputJsonFile}`);
    console.log(`  -> ${outputMdFile}`);
  } else {
    // Remove JSON file if exists
    if (existsSync(outputJsonFile)) {
      safeUnlinkSync(outputJsonFile);
      console.log(
        `${category}: All entries have eprex mappings, removed ${outputJsonFile}`
      );
    }
    // Remove MD file if exists
    if (existsSync(outputMdFile)) {
      safeUnlinkSync(outputMdFile);
      console.log(
        `${category}: All entries have eprex mappings, removed ${outputMdFile}`
      );
    }
    if (!existsSync(outputJsonFile) && !existsSync(outputMdFile)) {
      console.log(`${category}: All entries have eprex mappings`);
    }
  }
}

// Generate missing keys for temporale
generateMissingKeys(
  './src/temporale.json',
  './eprex/temporale_missing_keys.json',
  './eprex/temporale_missing_keys.md',
  'Temporale'
);

// Generate missing keys for sanctorale (include missal/decree properties)
generateMissingKeys(
  './src/sanctorale.json',
  './eprex/sanctorale_missing_keys.json',
  './eprex/sanctorale_missing_keys.md',
  'Sanctorale',
  true
);
