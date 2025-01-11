import type { EntryFields } from 'contentful';
import type { BaseEntry } from './base';
import type { IHero } from './hero';
import type { IContenidoLanding } from './contenidoLanding';

export interface ILandingPageFields {
  tituloPagina: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  heroLanding: IHero;
  contenidoPgina: IContenidoLanding[];
}

export type ILandingPage = BaseEntry<ILandingPageFields>;

export interface LandingPage {
  tituloPagina: string;
  slug: string;
  heroLanding: {
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
  };
  contenidoPgina: {
    contenido: EntryFields.RichText;
  }[];
}