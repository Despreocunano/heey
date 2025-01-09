import { client } from '../client';
import { cache } from '../cache';
import type { IComercioFields, Comercio } from '../../../types/contentful/comercio';

export async function getComercios(): Promise<Comercio[]> {
  const cached = cache.get<Comercio[]>('comercios');
  if (cached) return cached;

  const response = await client.getEntries<IComercioFields>({
    content_type: 'comercio',
    include: 1,
    order: ['fields.nombre']
  });

  const comercios = response.items.map(item => ({
    ...item.fields,
    logo: {
      url: `https:${item.fields.logo.fields.file.url}`,
      title: item.fields.logo.fields.title,
    }
  }));

  cache.set('comercios', comercios);
  return comercios;
}

export async function getComercioBySlug(slug: string): Promise<Comercio | null> {
  const cached = cache.get<Comercio>(`comercio-${slug}`);
  if (cached) return cached;

  const response = await client.getEntries<IComercioFields>({
    content_type: 'comercio',
    'fields.slug': slug,
    include: 1
  });

  if (!response.items.length) {
    return null;
  }

  const item = response.items[0];
  const comercio = {
    ...item.fields,
    logo: {
      url: `https:${item.fields.logo.fields.file.url}`,
      title: item.fields.logo.fields.title,
    }
  };

  cache.set(`comercio-${slug}`, comercio);
  return comercio;
}