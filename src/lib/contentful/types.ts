import type { Entry, EntrySkeletonType, Asset } from 'contentful';

export interface BankFields {
  nombreBanco: string;
  slug: string;
}

export interface BankSkeleton extends EntrySkeletonType<BankFields> {
  contentTypeId: 'bancos';
}

export type Bank = Entry<BankSkeleton>;

// Updated Benefit fields to match the API response
export interface BenefitFields {
  nombreBeneficio: string;
  imagenBeneficio: Asset;
  detalleBeneficio: string;
}

export interface BenefitSkeleton extends EntrySkeletonType<BenefitFields> {
  contentTypeId: 'beneficios';
}

export type Benefit = Entry<BenefitSkeleton>;

export interface CreditCardFields {
  nombre: string;
  slug: string;
  entidadBancaria: Bank;
  mantencion: string;
  renta: number;
  comisionInternacional?: string;
  requisitos: string;
  beneficios: Benefit[];
}

export interface CreditCardSkeleton extends EntrySkeletonType<CreditCardFields> {
  contentTypeId: 'tarjetaDeCredito';
}

export type CreditCard = Entry<CreditCardSkeleton>;