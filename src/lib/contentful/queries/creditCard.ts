import { contentfulClient } from '../client';
import type { CreditCard } from '../types';

export async function getCreditCards() {
  const response = await contentfulClient.getEntries<CreditCard>({
    content_type: 'tarjetaDeCredito',
    include: 2
  });

  return response.items;
}

export async function getCreditCardBySlug(slug: string) {
  const response = await contentfulClient.getEntries<CreditCard>({
    content_type: 'tarjetaDeCredito',
    'fields.slug': slug,
    include: 2,
    limit: 1
  });

  return response.items[0];
}