import React, { useState, useEffect } from 'react';
import { IndicatorsSkeleton } from './IndicatorsSkeleton';

interface Indicator {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  valor: number;
  fecha: string;
}

export function ChileanIndicators() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndicators = async () => {
    try {
      const response = await fetch('/api/indicators');
      if (!response.ok) {
        throw new Error('Error fetching indicators');
      }
      const data = await response.json();
      setIndicators(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los indicadores');
      setLoading(false);
      console.error('Error fetching indicators:', err);
    }
  };

  useEffect(() => {
    fetchIndicators();
    
    // Update every hour
    const interval = setInterval(fetchIndicators, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <IndicatorsSkeleton />;
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-left text-lg font-medium leading-6 text-white mb-4">
          Indicadores Económicos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {indicators.map((indicator) => (
            <div 
              key={indicator.codigo}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <dt className="text-sm font-medium text-white/80">
                {indicator.nombre}
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-white">
                {new Intl.NumberFormat('es-CL', {
                  style: 'currency',
                  currency: 'CLP'
                }).format(indicator.valor)}
              </dd>
              <p className="text-xs text-white/60 mt-1">
                Actualizado: {new Date(indicator.fecha).toLocaleDateString('es-CL')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}