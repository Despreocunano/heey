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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    };

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    };

    document.addEventListener('open-mobile-filters', handleOpen);
    document.addEventListener('close-mobile-filters', handleClose);

    return () => {
      document.removeEventListener('open-mobile-filters', handleOpen);
      document.removeEventListener('close-mobile-filters', handleClose);
    };
  }, []);

  const closeDrawer = () => {
    const event = new CustomEvent('close-mobile-filters');
    document.dispatchEvent(event);
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-25' : 'opacity-0'
        }`}
        onClick={closeDrawer}
      />
      
      <div 
        className={`absolute inset-x-0 bottom-0 transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        } bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        
        <div className="px-4 pb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
            <button
              onClick={closeDrawer}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mejor para</h3>
              <CategoryFilter categories={categories} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compañía</h3>
              <BankFilter banks={banks} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Marca</h3>
              <BrandFilter brands={brands} />
            </div>

            <div className="pt-4">
              <ClearFilters />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}