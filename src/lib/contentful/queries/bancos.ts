import { client } from '../client';
import type { IBancoFields, Banco } from '../../../types/contentful';

export async function getBancos(): Promise<Banco[]> {
  const response = await client.getEntries<IBancoFields>({
    content_type: 'bancos',
  });
  
  return response.items.map(item => ({
    ...item.fields,
    logoBanco: {
      url: `https:${item.fields.logoBanco.fields.file.url}`,
      title: item.fields.logoBanco.fields.title,
    },
  }));
}

export async function getBancoBySlug(slug: string): Promise<Banco | null> {
  const response = await client.getEntries<IBancoFields>({
    content_type: 'bancos',
    'fields.slug': slug,
  });

  if (!response.items.length) {
    return null;
  }

  const item = response.items[0];
  return {
    ...item.fields,
    logoBanco: {
      url: `https:${item.fields.logoBanco.fields.file.url}`,
      title: item.fields.logoBanco.fields.title,
    },
  };
}