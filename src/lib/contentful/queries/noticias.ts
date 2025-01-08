import { client } from '../client';
import type { INoticiaFields, Noticia } from '../../../types/contentful/noticia';

export async function getNoticias(): Promise<Noticia[]> {
  const response = await client.getEntries<INoticiaFields>({
    content_type: 'noticias',
    include: 2,
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
  };
}

export async function getNoticiasByCategoria(categoriaSlug: string): Promise<Noticia[]> {
  // Primero obtenemos todas las noticias
  const noticias = await getNoticias();
  
  // Luego filtramos por categoría
  return noticias.filter(noticia => 
    noticia.categoria?.some(cat => cat.slug === categoriaSlug)
  );
}