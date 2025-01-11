import type { EntryFields } from 'contentful';
import type { BaseEntry } from './base';

export interface IContenidoLandingFields {
  contenido: EntryFields.RichText;
}

export type IContenidoLanding = BaseEntry<IContenidoLandingFields>;

export interface ContenidoLanding {
  contenido: EntryFields.RichText;
}