'use client';

import React, { useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Product } from '../../domain/models/Product.model';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilters } from '../components/CategoryFilters';
import { useProductFilterParams } from '../hooks/useProductFilterParams';
import { filterAndSortProducts } from '../../application/use-cases/filterAndSortProducts';

interface ProductCatalogViewProps {
  initialProducts: Product[];
  categories: string[];
  hasLoadError?: boolean;
}

export const ProductCatalogView: React.FC<ProductCatalogViewProps> = ({
  initialProducts,
  categories,
  hasLoadError = false,
}) => {
  const { search, category, sortBy, setSearch, setCategory, setSortBy } = useProductFilterParams();

  const processedProducts = useMemo(
    () => filterAndSortProducts(initialProducts, { category, search, sortBy }),
    [initialProducts, search, category, sortBy]
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Title & Banner */}
      <div className="space-y-2 border-b border-border/30 pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
          Catálogo Selecto
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground max-w-xl font-medium leading-relaxed">
          Explora nuestra colección seleccionada de productos premium. Filtrado instantáneo,
          renderizado ultra-rápido en servidor y sincronización dinámica de metadatos SEO.
        </p>
      </div>

      {/* Control Panel (Search, Sort, Categories) */}
      <div className="p-4 rounded-xl border border-border/40 bg-card/20 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <SearchBar initialValue={search} onSearch={setSearch} />

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Ordenar:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-card/40 border border-border rounded-lg text-xs text-foreground px-3 py-1.5 focus:outline-none focus:border-primary/80 transition-colors"
            >
              <option value="">Relevancia</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="border-t border-border/20 pt-4 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <CategoryFilters
            categories={categories}
            activeCategory={category}
            onSelectCategory={setCategory}
          />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase mt-1 md:mt-0 select-none">
            {processedProducts.length} {processedProducts.length === 1 ? 'Producto' : 'Productos'}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      {hasLoadError ? (
        <div className="py-16 text-center rounded-xl border border-dashed border-destructive/40 bg-destructive/5 space-y-2">
          <p className="text-sm font-semibold text-foreground">
            No pudimos cargar el catálogo en este momento
          </p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            El proveedor de datos no respondió correctamente. Por favor, recarga la página en unos
            instantes.
          </p>
        </div>
      ) : processedProducts.length === 0 ? (
        <div className="py-16 text-center rounded-xl border border-dashed border-border/80 space-y-2">
          <p className="text-sm font-semibold text-foreground">No encontramos coincidencias</p>
          <p className="text-xs text-muted-foreground">
            Prueba ajustando los filtros o el término de búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
