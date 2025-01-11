import { client } from '../client';
import type { INoticiaFields, Noticia } from '../../../types/contentful/noticia';

export async function getNoticias(): Promise<Noticia[]> {
  const response = await client.getEntries<INoticiaFields>({
    content_type: 'noticias',
    include: 2,
    order: '-fields.fecha', // Ordenar por fecha descendente
  });

  return response.items.map(item => ({
    titulo: item.fields.titulo,
    imagen: {
      url: `https:${item.fields.imagen.fields.file.url}`,
      title: item.fields.imagen.fields.title,
    },
    contenido: item.fields.contenido,
    slug: item.fields.slug,
    categoria: item.fields.categoria?.map(cat => ({
      nombreCategoria: cat.fields.nombreCategoria,
      slug: cat.fields.slug || '',
    })),
    fecha: item.fields.fecha, // Incluir la fecha en el resultado
  }));
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const response = await client.getEntries<INoticiaFields>({
    content_type: 'noticias',
    'fields.slug': slug,
    include: 2,
  });

  if (!response.items.length) {
    return null;
  }

  const item = response.items[0];
  return {
    titulo: item.fields.titulo,
    imagen: {
      url: `https:${item.fields.imagen.fields.file.url}`,
      title: item.fields.imagen.fields.title,
    },
    contenido: item.fields.contenido,
    slug: item.fields.slug,
    categoria: item.fields.categoria?.map(cat => ({
      nombreCategoria: cat.fields.nombreCategoria,
      slug: cat.fields.slug || '',
    })),
    fecha: item.fields.fecha, // Incluir la fecha en el resultado
  };
}

export async function getNoticiasByCategoria(categoriaSlug: string): Promise<Noticia[]> {
  // Primero obtenemos el ID de la categoría
  const categoriaResponse = await client.getEntries({
    content_type: 'categoriaNoticias',
    'fields.slug': categoriaSlug,
    limit: 1
  });

  if (!categoriaResponse.items.length) {
    return [];
  }

  const categoriaId = categoriaResponse.items[0].sys.id;

  // Ahora buscamos las noticias que referencian esta categoría
  const response = await client.getEntries<INoticiaFields>({
    content_type: 'noticias',
    'fields.categoria.sys.id': categoriaId,
    include: 2,
    order: '-fields.fecha', // Ordenar por fecha descendente
  });

  return response.items.map(item => ({
    titulo: item.fields.titulo,
    imagen: {
      url: `https:${item.fields.imagen.fields.file.url}`,
      title: item.fields.imagen.fields.title,
    },
    contenido: item.fields.contenido,
    slug: item.fields.slug,
    categoria: item.fields.categoria?.map(cat => ({
      nombreCategoria: cat.fields.nombreCategoria,
      slug: cat.fields.slug || '',
    })),
    fecha: item.fields.fecha, // Incluir la fecha en el resultado
  }));
}