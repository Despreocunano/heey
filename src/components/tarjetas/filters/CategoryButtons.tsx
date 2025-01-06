import React from 'react';

interface CategoryButtonsProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

export function CategoryButtons({ categories, selectedCategory, onChange }: CategoryButtonsProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Categoría
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
            onClick={() => onChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-lime-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}