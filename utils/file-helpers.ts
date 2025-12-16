/**
 * Shared file operation utilities with error handling
 */

import { readFileSync, writeFileSync, unlinkSync } from 'fs';

export function safeReadFileSync(filePath: string): string {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error reading file '${filePath}': ${message}`);
    process.exit(1);
  }
}

export function safeWriteFileSync(filePath: string, content: string): void {
  try {
    writeFileSync(filePath, content);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error writing file '${filePath}': ${message}`);
    process.exit(1);
  }
}

export function safeUnlinkSync(filePath: string): void {
  try {
    unlinkSync(filePath);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error deleting file '${filePath}': ${message}`);
    process.exit(1);
  }
}

export function safeParseJson<T>(filePath: string, content: string): T {
  try {
    return JSON.parse(content) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error parsing JSON in '${filePath}': ${message}`);
    process.exit(1);
  }
}
