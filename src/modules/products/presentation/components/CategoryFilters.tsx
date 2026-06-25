'use client';

import React from 'react';

interface CategoryFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* "Todos" button */}
      <button
        onClick={() => onSelectCategory('')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 uppercase ${
          activeCategory === ''
            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10'
            : 'border-border bg-card/30 text-muted-foreground hover:text-foreground hover:bg-muted/40'
        }`}
      >
        Todos
      </button>

      {/* Dynamic categories */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 capitalize uppercase ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10'
              : 'border-border bg-card/30 text-muted-foreground hover:text-foreground hover:bg-muted/40'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
