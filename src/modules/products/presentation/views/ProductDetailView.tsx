'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../../domain/models/Product.model';
import { useCartStore } from '@/modules/cart/infrastructure/store/cart.store';
import { useCartDrawerStore } from '@/modules/cart/infrastructure/store/cartDrawer.store';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartDrawerStore((state) => state.openCart);

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Volver al catálogo
        </Link>
      </div>

      {/* Main product display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left Side: Product Image */}
        <div className="glass-card rounded-2xl border border-border/40 p-8 flex items-center justify-center bg-white/5 aspect-square relative group">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            {/* Category */}
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
              {product.category}
            </span>
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.round(product.rating!.rate) ? 'fill-current' : 'text-muted/40'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-foreground">
                  {product.rating.rate.toFixed(1)}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  • {product.rating.count} valoraciones
                </span>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="py-4 border-y border-border/30 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Precio Especial
              </p>
              <p className="text-3xl font-black text-foreground mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <span className="text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary rounded-md">
              En Stock
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">
              Descripción
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Call to Action */}
          <div className="pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all duration-200 hover:shadow-lg hover:shadow-primary/15 active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Agregar al Carrito
            </button>
          </div>

          {/* Value Props Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/30">
            <div className="flex flex-col items-center text-center p-3 rounded-lg border border-border/30 bg-card/20 space-y-1">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-[9px] font-bold text-foreground">Envío Express</span>
              <span className="text-[8px] text-muted-foreground">Gratis desde $99</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg border border-border/30 bg-card/20 space-y-1">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-[9px] font-bold text-foreground">Garantía Oficial</span>
              <span className="text-[8px] text-muted-foreground">100% Asegurado</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg border border-border/30 bg-card/20 space-y-1">
              <RefreshCw className="w-5 h-5 text-primary" />
              <span className="text-[9px] font-bold text-foreground">Retornos Gratis</span>
              <span className="text-[8px] text-muted-foreground">Hasta 30 días</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
