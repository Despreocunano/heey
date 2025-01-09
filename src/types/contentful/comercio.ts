import type { EntryFields } from 'contentful';
import type { Asset, BaseEntry } from './base';

export type ComercioCategoria = 'Comida Rápida' | 'Retail' | 'Supermercado' | 'Restaurantes' | 'Cine';

export interface IComercioFields {
  nombre: EntryFields.Symbol;
  logo: Asset;
  categoria: ComercioCategoria;
  slug: EntryFields.Symbol;
  descripcion: EntryFields.Text;
}

export type IComercio = BaseEntry<IComercioFields>;

export interface Comercio {
  nombre: string;
  logo: {
    url: string;
    title: string;
  };
  categoria: ComercioCategoria;
  slug: string;
  descripcion: string;
}