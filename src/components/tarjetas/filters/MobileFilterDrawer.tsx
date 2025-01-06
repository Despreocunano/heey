import React, { useState, useEffect } from 'react';
import type { Banco, Brand } from '../../../types/contentful';
import { CategoryFilter } from './CategoryFilter';
import { BrandFilter } from './BrandFilter';
import { BankFilter } from './BankFilter';
import { ClearFilters } from './ClearFilters';

interface MobileFilterDrawerProps {
  categories: string[];
  brands: Brand[];
  banks: Banco[];
}

export function MobileFilterDrawer({ categories, brands, banks }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    document.addEventListener('open-mobile-filters', handleOpen);
    document.addEventListener('close-mobile-filters', handleClose);

    return () => {
      document.removeEventListener('open-mobile-filters', handleOpen);
      document.removeEventListener('close-mobile-filters', handleClose);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-25"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="absolute inset-x-0 bottom-0 transform transition-transform duration-300 ease-out bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        
        {/* Content */}
        <div className="px-4 pb-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <CategoryFilter categories={categories} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca
              </label>
              <BrandFilter brands={brands} />
            </div>

            <BankFilter banks={banks} />

            <div className="pt-4">
              <ClearFilters />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}