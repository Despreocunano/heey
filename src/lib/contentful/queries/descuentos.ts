import { client } from '../client';
import { cache } from '../cache';
import type { IDescuentoFields, Descuento } from '../../../types/contentful/descuento';

function mapDescuento(item: any): Descuento {
  console.log('Mapping descuento:', JSON.stringify(item, null, 2)); // Debug

  if (!item.fields) {
    throw new Error('Descuento fields are missing');
  }

  if (!item.fields.comercio?.fields) {
    throw new Error('Comercio fields are missing');
  }

  const bancos = item.fields.bancos?.map((banco: any) => {
    if (!banco?.fields) {
      console.log('Banco fields missing:', banco);
      return null;
    }

    return {
      nombreBanco: banco.fields.nombreBanco,
      logoBanco: {
        url: `https:${banco.fields.logoBanco.fields.file.url}`,
        title: banco.fields.logoBanco.fields.title,
      },
      slug: banco.fields.slug,
    };
  }).filter((b: any) => b !== null) || [];

  return {
    comercio: {
      nombre: item.fields.comercio.fields.nombre,
      logo: {
        url: `https:${item.fields.comercio.fields.logo.fields.file.url}`,
        title: item.fields.comercio.fields.logo.fields.title,
      },
      categoria: item.fields.comercio.fields.categoria,
      slug: item.fields.comercio.fields.slug,
    },
    bancos,
    porcentajeDescuento: item.fields.porcentajeDescuento,
    condiciones: item.fields.condiciones,
    fechaInicio: item.fields.fechaInicio,
    fechaTermino: item.fields.fechaTermino,
    diasAplicables: item.fields.diasAplicables,
    topeDescuento: item.fields.topeDescuento,
    estado: item.fields.estado,
  };
}

export async function getDescuentosActivos(): Promise<Descuento[]> {
  const cached = cache.get<Descuento[]>('descuentos-activos');
  if (cached) return cached;

  const today = new Date().toISOString();

  try {
    console.log('Fetching descuentos activos...'); // Debug

    const response = await client.getEntries<IDescuentoFields>({
      content_type: 'descuento',
      include: 3,
      'fields.estado': true,
      'fields.fechaInicio[lte]': today,
      'fields.fechaTermino[gte]': today,
      order: ['-fields.porcentajeDescuento']
    });
    
    console.log('Descuentos response:', JSON.stringify(response, null, 2)); // Debug
    
    const descuentos = response.items.map(mapDescuento);
    cache.set('descuentos-activos', descuentos);
    return descuentos;
  } catch (error) {
    console.error('Error fetching descuentos:', error);
    return [];
  }
}

export async function getDescuentosByComercio(comercioSlug: string): Promise<Descuento[]> {
  const cached = cache.get<Descuento[]>(`descuentos-comercio-${comercioSlug}`);
  if (cached) return cached;

  const today = new Date().toISOString();

  try {
    const response = await client.getEntries<IDescuentoFields>({
      content_type: 'descuento',
      include: 3,
      'fields.estado': true,
      'fields.fechaInicio[lte]': today,
      'fields.fechaTermino[gte]': today,
      'fields.comercio.sys.contentType.sys.id': 'comercio',
      'fields.comercio.fields.slug': comercioSlug,
      order: ['-fields.porcentajeDescuento']
    });
    
    const descuentos = response.items.map(mapDescuento);
    cache.set(`descuentos-comercio-${comercioSlug}`, descuentos);
    return descuentos;
  } catch (error) {
    console.error('Error fetching descuentos by comercio:', error);
    return [];
  }
}