import React from 'react';

export function MobileFilterButton() {
  const openFilters = () => {
    const event = new CustomEvent('open-mobile-filters');
    document.dispatchEvent(event);
  };

  return (
    <button
      onClick={openFilters}
      className="md:hidden fixed bottom-4 right-4 z-50 bg-red-600 text-white rounded-full px-6 py-3 shadow-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
        />
      </svg>
      Filtros
    </button>
  );
}