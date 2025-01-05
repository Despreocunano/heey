import type { EntryFields } from 'contentful';
import type { Asset, BaseEntry } from './base';

// Contentful Entry Fields
export interface IBancoFields {
  nombreBanco: EntryFields.Symbol;
  logoBanco: Asset;
  emergencias?: EntryFields.Symbol;
  emergenciasInternacionales?: EntryFields.Symbol;
  whatsapp?: EntryFields.Symbol;
  slug: EntryFields.Symbol;
}

// Contentful Entry
export type IBanco = BaseEntry<IBancoFields>;

// Clean type for use in components
export interface Banco {
  nombreBanco: string;
  logoBanco: {
    url: string;
    title: string;
  };
  emergencias?: string;
  emergenciasInternacionales?: string;
  whatsapp?: string;
  slug: string;
}