import type { EntryFields } from 'contentful';
import type { Asset, BaseEntry } from './base';
import type { IBanco } from './banco';

// Contentful Entry Fields
export interface ITarjetaCreditoFields {
  nombre: EntryFields.Symbol;
  entidadBancaria: IBanco;
  mantencion: EntryFields.Symbol;
  renta: EntryFields.Number;
  comisionInternacional?: EntryFields.Symbol;
  requisitos: EntryFields.Text;
  marca: EntryFields.Symbol[];
  categoria: EntryFields.Symbol[];
  beneficios: BaseEntry<any>[];
  imagenTarjeta: Asset;
  slug: EntryFields.Symbol;
}

// Contentful Entry
export type ITarjetaCredito = BaseEntry<ITarjetaCreditoFields>;

// Clean type for use in components
export interface TarjetaCredito {
  nombre: string;
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
  marca: ('Visa' | 'Mastercard')[];
  categoria: ('Viajes' | 'Estudiantes' | 'Cashback' | 'Sin comisión' | 'Negocios' | 'Fidelización')[];
  beneficios: any[];
  imagenTarjeta: {
    url: string;
    title: string;
  };
  slug: string;
}