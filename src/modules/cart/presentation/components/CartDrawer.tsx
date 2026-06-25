'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingCart, BadgeCheck, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../infrastructure/store/cart.store';
import { useCartDrawerStore } from '../../infrastructure/store/cartDrawer.store';
import { useMounted } from '@/shared/presentation/hooks/useMounted';

interface ConfirmedOrder {
  code: string;
  total: number;
  itemCount: number;
}

export const CartDrawer: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const { isOpen, closeCart } = useCartDrawerStore();
  const mounted = useMounted();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<ConfirmedOrder | null>(null);

  const handleClose = useCallback(() => {
    closeCart();
    setOrder(null);
  }, [closeCart]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const totalPrice = mounted
    ? items.reduce((total, item) => total + item.product.price * item.quantity, 0)
    : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={handleClose}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md h-full flex flex-col glass text-foreground border-l border-border/80 shadow-2xl animate-in slide-in-from-right duration-300 ease-out z-10"
      >
        {/* Header */}
        <div className="p-5 border-b border-border/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {order ? (
              <BadgeCheck className="w-5 h-5 text-primary" />
            ) : (
              <ShoppingCart className="w-5 h-5 text-primary" />
            )}
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              {order ? 'Pedido Confirmado' : 'Tu Carrito'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-150"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {order ? (
          /* Order confirmation screen */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12 space-y-6 animate-in fade-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
              <div className="relative w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center animate-in zoom-in duration-500">
                <BadgeCheck className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Pedido confirmado
              </p>
              <h3 className="text-2xl font-bold font-display text-foreground">
                Gracias por tu compra
              </h3>
              <p className="text-xs text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
                Tu orden <span className="text-foreground font-semibold">#{order.code}</span> por{' '}
                {order.itemCount} {order.itemCount === 1 ? 'artículo' : 'artículos'} fue procesada
                correctamente.
              </p>
            </div>

            <div className="w-full max-w-[220px] py-3 px-4 rounded-lg border border-border/60 bg-card/30 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">
                Total
              </span>
              <span className="text-base font-bold text-foreground">${order.total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleClose}
              className="group inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors duration-150"
            >
              Seguir comprando
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          </div>
        ) : (
          <>
            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {!mounted || items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                  <div className="p-4 rounded-full bg-muted/30">
                    <ShoppingCart className="w-10 h-10 text-muted-foreground/60" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">Tu carrito está vacío</p>
                  <button
                    onClick={handleClose}
                    className="text-xs text-primary hover:underline font-semibold"
                  >
                    Explorar catálogo
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 rounded-lg border border-border/40 bg-card/30 hover:bg-card/50 transition-colors duration-200"
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-white/5 flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Info & Quantity controls */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3
                          className="text-xs font-semibold text-foreground truncate"
                          title={item.product.title}
                        >
                          {item.product.title}
                        </h3>
                        <p className="text-[10px] text-muted-foreground capitalize mt-0.5">
                          {item.product.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity selectors */}
                        <div className="flex items-center border border-border/80 rounded bg-muted/40 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-medium text-foreground select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-foreground">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-muted-foreground hover:text-red-400 p-1 transition-colors duration-150"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {mounted && items.length > 0 && (
              <div className="p-5 border-t border-border/80 bg-card/40 space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-bold text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      const code = Math.floor(100000 + Math.random() * 900000).toString();
                      const itemCount = items.reduce((total, item) => total + item.quantity, 0);
                      setOrder({ code, total: totalPrice, itemCount });
                      clearCart();
                    }}
                    className="w-full py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-md hover:bg-primary/95 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 active:scale-[0.98]"
                  >
                    Completar Compra
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 border border-border bg-transparent hover:bg-muted/40 text-muted-foreground hover:text-foreground text-xs font-semibold rounded-md transition-colors duration-150"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
