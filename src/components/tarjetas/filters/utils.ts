// Utility functions for filters
export function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

export function arrayIncludes(arr: string[], value: string): boolean {
  const normalizedValue = normalizeString(value);
  return arr.some(item => normalizeString(item) === normalizedValue);
}