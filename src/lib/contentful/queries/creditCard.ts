import { contentfulClient } from '../client';
import type { CreditCard, CreditCardSkeleton } from '../types';

export async function getCreditCards() {
  const response = await contentfulClient.getEntries<CreditCardSkeleton>({
    content_type: 'tarjetaDeCredito',
    include: 2
  });

  return response.items as CreditCard[];
}

export async function getCreditCardBySlug(slug: string) {
  const response = await contentfulClient.getEntries<CreditCardSkeleton>({
    content_type: 'tarjetaDeCredito',
    'fields.slug': slug,
    include: 2,
    limit: 1
  });

  return response.items[0] as CreditCard;
}