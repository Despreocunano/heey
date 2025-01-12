import type { EntryFields } from 'contentful';
import type { BaseEntry } from './base';

export interface IContenidoLandingFields {
  titulo: EntryFields.Symbol;
  contenido: EntryFields.RichText;
}

export type IContenidoLanding = BaseEntry<IContenidoLandingFields>;

export interface ContenidoLanding {
  titulo: string;
  contenido: EntryFields.RichText;
}