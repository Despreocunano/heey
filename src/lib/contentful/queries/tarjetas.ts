import { client } from '../client';
import type { ITarjetaCreditoFields, TarjetaCredito } from '../../../types/contentful';

export async function getTarjetas(): Promise<TarjetaCredito[]> {
  const response = await client.getEntries<ITarjetaCreditoFields>({
    content_type: 'tarjetaDeCredito',
    include: 2,
  });
  
  return response.items.map(item => ({
    ...item.fields,
    entidadBancaria: {
      ...item.fields.entidadBancaria.fields,
      logoBanco: {
        url: `https:${item.fields.entidadBancaria.fields.logoBanco.fields.file.url}`,
        title: item.fields.entidadBancaria.fields.logoBanco.fields.title,
      },
    },
    imagenTarjeta: {
      url: `https:${item.fields.imagenTarjeta.fields.file.url}`,
      title: item.fields.imagenTarjeta.fields.title,
    },
    emisor: {
      url: `https:${item.fields.emisor.fields.file.url}`,
      title: item.fields.emisor.fields.title,
    },
  }));
}

export async function getTarjetaBySlug(slug: string): Promise<TarjetaCredito | null> {
  const response = await client.getEntries<ITarjetaCreditoFields>({
    content_type: 'tarjetaDeCredito',
    'fields.slug': slug,
    include: 2,
  });

  if (!response.items.length) {
    return null;
  }

  const item = response.items[0];
  return {
    ...item.fields,
    entidadBancaria: {
      ...item.fields.entidadBancaria.fields,
      logoBanco: {
        url: `https:${item.fields.entidadBancaria.fields.logoBanco.fields.file.url}`,
        title: item.fields.entidadBancaria.fields.logoBanco.fields.title,
      },
    },
    imagenTarjeta: {
      url: `https:${item.fields.imagenTarjeta.fields.file.url}`,
      title: item.fields.imagenTarjeta.fields.title,
    },
    emisor: {
      url: `https:${item.fields.emisor.fields.file.url}`,
      title: item.fields.emisor.fields.title,
    },
  };
}