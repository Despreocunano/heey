import type { EntryFields } from 'contentful';
import type { Asset, BaseEntry } from './base';
import type { ICategoriaNoticia } from './categoriaNoticia';

// Contentful Entry Fields
export interface INoticiaFields {
  titulo: EntryFields.Symbol;
  imagen: Asset;
  contenido: EntryFields.RichText;
  slug: EntryFields.Symbol;
  categoria?: ICategoriaNoticia[];
  fecha: EntryFields.Date; // Agregamos el campo fecha
}

// Contentful Entry
export type INoticia = BaseEntry<INoticiaFields>;

// Clean type for use in components
export interface Noticia {
  titulo: string;
  imagen: {
    url: string;
    title: string;
  };
  contenido: EntryFields.RichText;
  slug: string;
  categoria?: {
    nombreCategoria: string;
    slug: string;
  }[];
  fecha: string; // Agregamos el campo fecha
}