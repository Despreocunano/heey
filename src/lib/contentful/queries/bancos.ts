import { client } from '../client';
import type { IBancoFields, Banco } from '../../../types/contentful';

export async function getBancos(): Promise<Banco[]> {
  const response = await client.getEntries<IBancoFields>({
    content_type: 'bancos',
  });
  
  return response.items.map(item => ({
    ...item.fields,
    logoBanco: {
      url: `https:${item.fields.logoBanco.fields.file.url}`,
      title: item.fields.logoBanco.fields.title,
    },
  }));
}