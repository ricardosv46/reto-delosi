'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialValue: string;
  onSearch: (val: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ initialValue, onSearch }) => {
  const [value, setValue] = useState(initialValue);
  const [trackedInitialValue, setTrackedInitialValue] = useState(initialValue);

  if (initialValue !== trackedInitialValue) {
    setTrackedInitialValue(initialValue);
    setValue(initialValue);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== initialValue) {
        onSearch(value);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [value, onSearch, initialValue]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="relative w-full md:max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground/60">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-card/30 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-all duration-200"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground/50 hover:text-foreground transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
