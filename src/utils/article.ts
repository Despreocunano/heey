import type { Document } from '@contentful/rich-text-types';

export function calculateReadingTime(content: Document): number {
  const wordsPerMinute = 200;
  let textContent = '';

  // Extraer texto del documento rich text
  const extractText = (node: any) => {
    if (node.nodeType === 'text') {
      textContent += node.value + ' ';
    }
    if (node.content) {
      node.content.forEach(extractText);
    }
  };

  extractText(content);
  
  const words = textContent.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function formatTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffTime = Math.abs(now.getTime() - past.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
  return `Hace ${Math.floor(diffDays / 365)} años`;
}