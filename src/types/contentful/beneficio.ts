import type { EntryFields } from 'contentful';
import type { BaseEntry } from './base';

// Contentful Entry Fields
export interface IBeneficioFields {
  // Add the fields from your beneficios content type here
  // This is a placeholder since the beneficios content type wasn't provided
  titulo?: EntryFields.Symbol;
  descripcion?: EntryFields.Text;
}

// Contentful Entry
export type IBeneficio = BaseEntry<IBeneficioFields>;

// Clean type for use in components
export interface Beneficio {
  titulo?: string;
  descripcion?: string;
}