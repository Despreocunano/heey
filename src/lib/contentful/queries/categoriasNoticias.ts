import { client } from '../client';
import type { ICategoriaNoticiaFields, CategoriaNoticia } from '../../../types/contentful/categoriaNoticia';

export async function getCategoriasNoticias(): Promise<CategoriaNoticia[]> {
  const response = await client.getEntries<ICategoriaNoticiaFields>({
    content_type: 'categoriaNoticias',
  });

  return response.items.map(item => ({
    nombreCategoria: item.fields.nombreCategoria,
    slug: item.fields.slug,
  }));
}

export async function getCategoriaNoticiaBySlug(slug: string): Promise<CategoriaNoticia | null> {
  const response = await client.getEntries<ICategoriaNoticiaFields>({
    content_type: 'categoriaNoticias',
    'fields.slug': slug,
  });

  if (!response.items.length) {
    return null;
  }

  const item = response.items[0];
  return {
    nombreCategoria: item.fields.nombreCategoria,
    slug: item.fields.slug,
  };
}