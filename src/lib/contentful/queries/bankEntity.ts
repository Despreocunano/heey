import { contentfulClient } from '../client';
import type { BankEntity } from '../types';

export async function getBankEntities() {
  const response = await contentfulClient.getEntries<BankEntity>({
    content_type: 'entidadBancaria', // contentTypeId en el esquema
  });

  return response.items;
}

export async function getBankEntityBySlug(slug: string) {
  const response = await contentfulClient.getEntries<BankEntity>({
    content_type: 'entidadBancaria',
    'fields.slug': slug, // Válido
    limit: 1,
  });

  return response.items[0];
}