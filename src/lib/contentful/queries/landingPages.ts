import { client } from '../client';
import type { ILandingPageFields, LandingPage } from '../../../types/contentful/landingPage';

export async function getLandingPages(): Promise<LandingPage[]> {
  const response = await client.getEntries<ILandingPageFields>({
    content_type: 'landingPage',
    include: 2
  });

  return response.items.map(item => ({
    tituloPagina: item.fields.tituloPagina,
    slug: item.fields.slug,
    heroLanding: {
      titulo: item.fields.heroLanding.fields.titulo,
      descripcion: item.fields.heroLanding.fields.descripcion,
      imagenDesktop: {
        url: `https:${item.fields.heroLanding.fields.imagenDesktop.fields.file.url}`,
        title: item.fields.heroLanding.fields.imagenDesktop.fields.title
      },
      imagenMobile: {
        url: `https:${item.fields.heroLanding.fields.imagenMobile.fields.file.url}`,
        title: item.fields.heroLanding.fields.imagenMobile.fields.title
      }
    },
    contenidoPgina: item.fields.contenidoPgina.map(contenido => ({
      contenido: contenido.fields.contenido
    }))
  }));
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  const response = await client.getEntries<ILandingPageFields>({
    content_type: 'landingPage',
    'fields.slug': slug,
    include: 2
  });

  if (!response.items.length) {
    return null;
  }

  const item = response.items[0];
  return {
    tituloPagina: item.fields.tituloPagina,
    slug: item.fields.slug,
    heroLanding: {
      titulo: item.fields.heroLanding.fields.titulo,
      descripcion: item.fields.heroLanding.fields.descripcion,
      imagenDesktop: {
        url: `https:${item.fields.heroLanding.fields.imagenDesktop.fields.file.url}`,
        title: item.fields.heroLanding.fields.imagenDesktop.fields.title
      },
      imagenMobile: {
        url: `https:${item.fields.heroLanding.fields.imagenMobile.fields.file.url}`,
        title: item.fields.heroLanding.fields.imagenMobile.fields.title
      }
    },
    contenidoPgina: item.fields.contenidoPgina.map(contenido => ({
      contenido: contenido.fields.contenido
    }))
  };
}