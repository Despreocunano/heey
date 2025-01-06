import { client } from '../client';
import type { IBancoFields, Banco } from '../../../types/contentful';

function formatImageUrl(url: string): string {
  // If URL already starts with https://, return as is
  if (url.startsWith('https://')) {
    return url;
  }
  // If URL starts with //, add https:
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  // Otherwise, assume it needs https:// prefix
  return `https://${url}`;
}

export async function getBancos(): Promise<Banco[]> {
  const response = await client.getEntries<IBancoFields>({
    content_type: 'bancos',
  });
  
  return response.items.map(item => {
    const logoUrl = item.fields.logoBanco.fields.file.url;
    console.log(`Processing bank: ${item.fields.nombreBanco}, Logo URL: ${logoUrl}`);
    
    return {
      ...item.fields,
      logoBanco: {
        url: formatImageUrl(logoUrl),
        title: item.fields.logoBanco.fields.title,
      },
    };
  });
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
  const logoUrl = item.fields.logoBanco.fields.file.url;
  console.log(`Processing bank by slug: ${item.fields.nombreBanco}, Logo URL: ${logoUrl}`);

  return {
    ...item.fields,
    logoBanco: {
      url: formatImageUrl(logoUrl),
      title: item.fields.logoBanco.fields.title,
    },
  };
}