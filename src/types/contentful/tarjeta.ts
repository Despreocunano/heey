import type { EntryFields } from 'contentful';
import type { Asset, BaseEntry } from './base';
import type { IBanco } from './banco';

// Define Brand type
export type Brand = 'Visa' | 'Mastercard' | 'AmericanExpress';

// Define Category type
export type Category = 'Viajes' | 'Estudiantes' | 'Cashback' | 'Negocios' | 'Acumulación de puntos' | 'Supermercado' | 'Sin comisión internacional';

// Contentful Entry Fields
export interface ITarjetaCreditoFields {
  nombre: EntryFields.Symbol;
  imagenTarjeta: Asset;
  emisor: Asset;
  entidadBancaria: IBanco;
  mantencion: EntryFields.Symbol;
  renta: EntryFields.Number;
  comisionInternacional?: EntryFields.Symbol;
  requisitos: EntryFields.Text;
  beneficios?: EntryFields.Text;
  marca: Brand[];
  categoria: Category[];
  ofertaDeBienvenida?: EntryFields.Symbol;
  pros?: EntryFields.Symbol[];
  contras?: EntryFields.Symbol[];
  url: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  isFeatured: EntryFields.Boolean;
}

// Contentful Entry
export type ITarjetaCredito = BaseEntry<ITarjetaCreditoFields>;

// Clean type for use in components
export interface TarjetaCredito {
  nombre: string;
  imagenTarjeta: {
    url: string;
    title: string;
  };
  emisor: {
    url: string;
    title: string;
  };
  entidadBancaria: {
    nombreBanco: string;
    logoBanco: {
      url: string;
      title: string;
    };
    emergencias?: string;
    emergenciasInternacionales?: string;
    whatsapp?: string;
    slug: string;
  };
  mantencion: string;
  renta: number;
  comisionInternacional?: string;
  requisitos: string;
  beneficios?: string;
  marca: Brand[];
  categoria: Category[];
  ofertaDeBienvenida?: string;
  pros?: string[];
  contras?: string[];
  url: string;
  slug: string;
  isFeatured: boolean;
}