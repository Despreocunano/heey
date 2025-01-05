import type { Entry, EntrySkeletonType, Asset as ContentfulAsset } from 'contentful';

// Define Asset type explicitly
export interface AssetFile {
  url: string;
  details: {
    size: number;
    image?: {
      width: number;
      height: number;
    };
  };
  fileName: string;
  contentType: string;
}

export interface AssetFields {
  title: string;
  description: string;
  file: AssetFile;
}

export interface Asset extends ContentfulAsset {
  fields: AssetFields;
}

export interface BankFields {
  nombreBanco: string;
  logoBanco: Asset;
  slug: string;
}

export interface BankSkeleton extends EntrySkeletonType<BankFields> {
  contentTypeId: 'bancos';
}

export type Bank = Entry<BankSkeleton>;

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