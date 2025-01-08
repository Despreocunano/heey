import type { APIRoute } from 'astro';

const API_KEY = 'd5f4e2d9120afc6f20e597eab43e9599faf94fb7';
const BASE_URL = 'https://api.sbif.cl/api-sbifv3/recursos_api';

async function fetchIndicator(endpoint: string) {
  const response = await fetch(`${BASE_URL}/${endpoint}?apikey=${API_KEY}&formato=json`);
  return await response.json();
}

export const GET: APIRoute = async () => {
  try {
    const [ufData, utmData, dolarData, euroData] = await Promise.all([
      fetchIndicator('uf'),
      fetchIndicator('utm'),
      fetchIndicator('dolar'),
      fetchIndicator('euro')
    ]);

    const indicators = [
      {
        codigo: 'UF',
        nombre: 'Unidad de Fomento',
        unidad_medida: 'Pesos',
        valor: parseFloat(ufData.UFs[0].Valor.replace('.', '').replace(',', '.')),
        fecha: ufData.UFs[0].Fecha
      },
      {
        codigo: 'UTM',
        nombre: 'Unidad Tributaria Mensual',
        unidad_medida: 'Pesos',
        valor: parseFloat(utmData.UTMs[0].Valor.replace('.', '').replace(',', '.')),
        fecha: utmData.UTMs[0].Fecha
      },
      {
        codigo: 'USD',
        nombre: 'Dólar Observado',
        unidad_medida: 'Pesos',
        valor: parseFloat(dolarData.Dolares[0].Valor.replace('.', '').replace(',', '.')),
        fecha: dolarData.Dolares[0].Fecha
      },
      {
        codigo: 'EUR',
        nombre: 'Euro',
        unidad_medida: 'Pesos',
        valor: parseFloat(euroData.Euros[0].Valor.replace('.', '').replace(',', '.')),
        fecha: euroData.Euros[0].Fecha
      }
    ];

    return new Response(JSON.stringify(indicators), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching indicators' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}