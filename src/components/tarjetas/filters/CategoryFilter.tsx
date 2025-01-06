import React, { useState, useEffect } from 'react';

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Move sessionStorage access to useEffect
  useEffect(() => {
    const savedCategory = sessionStorage.getItem('filter-categoria');
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    const handleReset = (event: CustomEvent) => {
      if (event.detail.type === 'categoria') {
        setSelectedCategory('');
      }
    };

    document.addEventListener('filter-reset', handleReset as EventListener);
    return () => document.removeEventListener('filter-reset', handleReset as EventListener);
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    sessionStorage.setItem('filter-categoria', category);
    
    const event = new CustomEvent('filter-change', {
      detail: { type: 'categoria', value: category }
    });
    document.dispatchEvent(event);

    document.querySelector('[data-filter-categoria]')?.setAttribute('data-filter-categoria', category);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" data-filter-categoria={selectedCategory}>
      <button
        onClick={() => handleCategoryChange('')}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === ''
            ? 'bg-lime-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-lime-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}