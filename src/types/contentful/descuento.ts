import type { EntryFields } from 'contentful';
import type { BaseEntry } from './base';
import type { IComercio } from './comercio';
import type { ITarjetaCredito } from './tarjeta';
import type { IBanco } from './banco';

export type DiaSemana = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export interface IDescuentoFields {
  comercio: IComercio;
  tarjetas?: ITarjetaCredito[];
  bancos?: IBanco[];
  porcentajeDescuento: EntryFields.Number;
  condiciones: EntryFields.Text;
  fechaInicio: EntryFields.Date;
  fechaTermino: EntryFields.Date;
  diasAplicables: DiaSemana[];
  topeDescuento?: EntryFields.Number;
  estado: EntryFields.Boolean;
}

export type IDescuento = BaseEntry<IDescuentoFields>;

export interface Descuento {
  comercio: {
    nombre: string;
    logo: {
      url: string;
      title: string;
    };
    categoria: string;
    slug: string;
  };
  tarjetas?: {
    nombre: string;
    slug: string;
    imagenTarjeta: {
      url: string;
      title: string;
    };
  }[];
  bancos?: {
    nombreBanco: string;
    logoBanco: {
      url: string;
      title: string;
    };
    slug: string;
  }[];
  porcentajeDescuento: number;
  condiciones: string;
  fechaInicio: string;
  fechaTermino: string;
  diasAplicables: DiaSemana[];
  topeDescuento?: number;
  estado: boolean;
}