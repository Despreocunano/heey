import React from 'react';

export function ClearFilters() {
  const handleClearFilters = () => {
    const event = new CustomEvent('clear-filters');
    document.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleClearFilters}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M6 18L18 6M6 6l12 12" 
        />
      </svg>
      Limpiar filtros
    </button>
  );
}