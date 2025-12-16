/**
 * Shared TypeScript AST parsing utilities
 */

import * as ts from 'typescript';

/**
 * Get string literal value from AST node
 */
export function getStringLiteralValue(
  node: ts.Node | undefined
): string | undefined {
  if (node && ts.isStringLiteral(node)) {
    return node.text;
  }
  return undefined;
}

/**
 * Find property in object literal by name
 */
export function findProperty(
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

/**
 * Get property value as string from object literal
 */
export function getPropertyString(
  obj: ts.ObjectLiteralExpression,
  name: string
): string | undefined {
  const prop = findProperty(obj, name);
  if (prop && ts.isPropertyAssignment(prop)) {
    return getStringLiteralValue(prop.initializer);
  }
  return undefined;
}

/**
 * Get nested property value (e.g., nomina.la or externalIds.romcal)
 */
export function getNestedPropertyString(
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

/**
 * Levenshtein distance for fuzzy string matching
 */
export function levenshteinDistance(a: string, b: string): number {
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
