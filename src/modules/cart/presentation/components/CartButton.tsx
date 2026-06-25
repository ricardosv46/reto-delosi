'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../infrastructure/store/cart.store';
import { useCartDrawerStore } from '../../infrastructure/store/cartDrawer.store';
import { useMounted } from '@/shared/presentation/hooks/useMounted';

export const CartButton: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const openCart = useCartDrawerStore((state) => state.openCart);
  const mounted = useMounted();

  const totalCount = mounted ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <button
      onClick={openCart}
      aria-label="Abrir carrito"
      className="relative flex items-center justify-center p-2 rounded-full border border-border bg-card/40 hover:bg-muted transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <ShoppingBag className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-200" />
      {totalCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in duration-300">
          {totalCount}
        </span>
      )}
    </button>
  );
};
