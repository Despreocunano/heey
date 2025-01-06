import React, { useState, useEffect } from 'react';
import type { Brand } from '../../../types/contentful/tarjeta';

interface BrandFilterProps {
  brands: Brand[];
}

export function BrandFilter({ brands }: BrandFilterProps) {
  const [selectedBrand, setSelectedBrand] = useState('');

  // Move sessionStorage access to useEffect
  useEffect(() => {
    const savedBrand = sessionStorage.getItem('filter-marca');
    if (savedBrand) {
      setSelectedBrand(savedBrand);
    }
  }, []);

  useEffect(() => {
    const handleReset = (event: CustomEvent) => {
      if (event.detail.type === 'marca') {
        setSelectedBrand('');
      }
    };

    document.addEventListener('filter-reset', handleReset as EventListener);
    return () => document.removeEventListener('filter-reset', handleReset as EventListener);
  }, []);

  const handleBrandChange = (brand: string) => {
    const newBrand = selectedBrand === brand ? '' : brand;
    setSelectedBrand(newBrand);
    sessionStorage.setItem('filter-marca', newBrand);
    
    const event = new CustomEvent('filter-change', {
      detail: { type: 'marca', value: newBrand }
    });
    document.dispatchEvent(event);

    document.querySelector('[data-filter-marca]')?.setAttribute('data-filter-marca', newBrand);
  };

  return (
    <div className="flex gap-2" data-filter-marca={selectedBrand}>
      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => handleBrandChange(brand)}
          className={`px-6 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedBrand === brand
              ? 'bg-lime-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          <img 
            src={`/images/${brand.toLowerCase()}-logo.svg`}
            alt={brand}
            className="h-8"
          />
        </button>
      ))}
    </div>
  );
}