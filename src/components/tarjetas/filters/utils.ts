// Utility functions for filters
export function normalizeString(str: string): string {
    return str.toLowerCase().trim();
  }
  
  export function arrayIncludes(arr: string[], value: string): boolean {
    const normalizedValue = normalizeString(value);
    return arr.some(item => normalizeString(item) === normalizedValue);
  }
  
  export function logFilterDebug(filters: any, cardData: any): void {
    console.group('Filter Debug');
    console.log('Applied Filters:', filters);
    console.log('Card Data:', cardData);
    console.log('Bank comparison:', {
      filterBank: filters.banco,
      cardBank: cardData.banco,
      normalized: {
        filterBank: normalizeString(filters.banco),
        cardBank: normalizeString(cardData.banco)
      }
    });
    console.groupEnd();
  }