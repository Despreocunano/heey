import type { EntryFields } from 'contentful';
import type { Asset, BaseEntry } from './base';

export interface IHeroFields {
  titulo: EntryFields.Symbol;
  descripcion: EntryFields.Symbol;
  imagenDesktop: Asset;
  imagenMobile: Asset;
}

export type IHero = BaseEntry<IHeroFields>;

export interface Hero {
  titulo: string;
  descripcion: string;
  imagenDesktop: {
    url: string;
    title: string;
  };
  imagenMobile: {
    url: string;
    title: string;
  };
}