import { client } from '../client';
import type { ILandingPageFields, LandingPage } from '../../../types/contentful/landingPage';

export async function getLandingPages(): Promise<LandingPage[]> {
  try {
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
        titulo: contenido.fields.titulo,
        contenido: contenido.fields.contenido
      }))
    }));
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    return [];
  }
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  try {
    const response = await client.getEntries<ILandingPageFields>({
      content_type: 'landingPage',
      'fields.slug': slug,
      include: 2
    });

    if (!response.items.length) {
      console.log(`No landing page found for slug: ${slug}`);
      return null;
    }

    const item = response.items[0];
    
    if (!item.fields.heroLanding?.fields) {
      console.error('Hero landing data is missing');
      return null;
    }

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
        titulo: contenido.fields.titulo,
        contenido: contenido.fields.contenido
      }))
    };
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}