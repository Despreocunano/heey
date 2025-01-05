import type { Entry, EntrySkeletonType } from 'contentful';

// Define los campos de entidad bancaria
export interface BankEntityFields {
  nombre: string;
  slug: string; // Campo necesario para las consultas
}

// Define la estructura compatible
export interface BankEntitySkeleton extends EntrySkeletonType<BankEntityFields> {
  contentTypeId: 'entidadBancaria';
}

// Define BankEntity como Entry basado en BankEntitySkeleton
export type BankEntity = Entry<BankEntitySkeleton>;

// Define los campos de Benefit
export interface BenefitFields {
  nombre: string;
  descripcion: string;
}

export interface BenefitSkeleton extends EntrySkeletonType<BenefitFields> {
  contentTypeId: 'beneficio';
}

export type Benefit = Entry<BenefitSkeleton>;

// Define CreditCard con su estructura compatible
export interface CreditCardFields {
  nombre: string;
  slug: string;
  entidadBancaria: BankEntity; // Referencia a otra entrada
  beneficios: Benefit[]; // Referencia a un arreglo de beneficios
}

export interface CreditCardSkeleton extends EntrySkeletonType<CreditCardFields> {
  contentTypeId: 'tarjetaDeCredito';
}

export type CreditCard = Entry<CreditCardSkeleton>;