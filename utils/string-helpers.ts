/**
 * Shared string normalization utilities for merge scripts
 */

/**
 * Normalize Latin text for comparison
 * - Converts to lowercase
 * - Replaces æ/œ ligatures with ae/oe
 * - Removes punctuation
 * - Normalizes whitespace
 */
export function normalizeLatinName(name: string): string {
  return name
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/œ/g, "oe")
    .replace(/[.,;:'"()«»]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalize event key formats for comparison
 * - Converts to lowercase
 * - Removes underscores (snake_case -> lowercase)
 */
export function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/_/g, "");
}
