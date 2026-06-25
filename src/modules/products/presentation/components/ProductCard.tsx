'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Plus } from 'lucide-react';
import { Product } from '../../domain/models/Product.model';
import { useCartStore } from '@/modules/cart/infrastructure/store/cart.store';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to PDP when clicking Add to Cart
    addItem(product);
  };

  return (
    <div className="group glass-card glass-card-hover rounded-xl overflow-hidden flex flex-col h-full border border-border/40 relative">
      {/* Product Link wrapper */}
      <Link href={`/products/${product.id}`} className="flex flex-col flex-1 p-4">
        {/* Image block */}
        <div className="relative w-full aspect-square rounded-lg bg-white/5 overflow-hidden flex items-center justify-center p-6 mb-4 group-hover:bg-white/10 transition-colors duration-300">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-contain transform group-hover:scale-105 transition-transform duration-300 ease-out"
          />
          {/* Category Tag */}
          <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider bg-black/75 text-muted-foreground px-2 py-0.5 rounded-full border border-border/60">
            {product.category}
          </span>
        </div>

        {/* Product Meta */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2rem]">
              {product.title}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex items-center text-secondary">
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-[10px] text-foreground font-semibold">
                  {product.rating.rate.toFixed(1)}
                </span>
                <span className="text-[9px] text-muted-foreground">({product.rating.count})</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
            <span className="text-sm font-extrabold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-200 hover:shadow-md hover:shadow-primary/20 active:scale-95"
              aria-label="Agregar al carrito"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
