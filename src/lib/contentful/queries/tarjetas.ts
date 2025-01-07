import { client } from '../client';
import { cache } from '../cache';
import type { ITarjetaCreditoFields, TarjetaCredito } from '../../../types/contentful';

export async function getTarjetas(): Promise<TarjetaCredito[]> {
  // Check cache first
  const cached = cache.get<TarjetaCredito[]>('tarjetas');
  if (cached) return cached;

  const response = await client.getEntries<ITarjetaCreditoFields>({
    content_type: 'tarjetaDeCredito',
    include: 2,
    limit: 1000, // Fetch maximum items per request
    select: [
      'fields.nombre',
      'fields.imagenTarjeta',
      'fields.emisor',
      'fields.entidadBancaria',
      'fields.mantencion',
      'fields.renta',
      'fields.comisionInternacional',
      'fields.requisitos',
      'fields.beneficios',
      'fields.marca',
      'fields.categoria',
      'fields.ofertaDeBienvenida',
      'fields.pros',
      'fields.contras',
      'fields.url',
      'fields.slug'
    ]
  });
  
  const tarjetas = response.items.map(item => ({
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

  // Save to cache
  cache.set('tarjetas', tarjetas);
  
  return tarjetas;
}

export async function getTarjetaBySlug(slug: string): Promise<TarjetaCredito | null> {
  // Check cache first
  const cached = cache.get<TarjetaCredito>(`tarjeta-${slug}`);
  if (cached) return cached;

  const response = await client.getEntries<ITarjetaCreditoFields>({
    content_type: 'tarjetaDeCredito',
    'fields.slug': slug,
    include: 2,
    limit: 1,
    select: [
      'fields.nombre',
      'fields.imagenTarjeta',
      'fields.emisor',
      'fields.entidadBancaria',
      'fields.mantencion',
      'fields.renta',
      'fields.comisionInternacional',
      'fields.requisitos',
      'fields.beneficios',
      'fields.marca',
      'fields.categoria',
      'fields.ofertaDeBienvenida',
      'fields.pros',
      'fields.contras',
      'fields.url',
      'fields.slug'
    ]
  });

  if (!response.items.length) {
    return null;
  }

  const item = response.items[0];
  const tarjeta = {
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

  // Save to cache
  cache.set(`tarjeta-${slug}`, tarjeta);

  return tarjeta;
}