import type { EntryFields } from 'contentful';
import type { BaseEntry } from './base';

// Contentful Entry Fields
export interface ICategoriaNoticiaFields {
  nombreCategoria: EntryFields.Symbol;
  slug?: EntryFields.Symbol;
}

// Contentful Entry
export type ICategoriaNoticia = BaseEntry<ICategoriaNoticiaFields>;

// Clean type for use in components
export interface CategoriaNoticia {
  nombreCategoria: string;
  slug?: string;
}