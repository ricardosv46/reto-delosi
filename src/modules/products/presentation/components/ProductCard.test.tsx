import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { MockProductRepository } from '@/modules/products/infrastructure/adapters/MockProductRepository';
import { useCartStore } from '@/modules/cart/infrastructure/store/cart.store';
import { useCartDrawerStore } from '@/modules/cart/infrastructure/store/cartDrawer.store';

describe('ProductCard', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
    useCartDrawerStore.setState({ isOpen: false });
  });

  it('should add the product to the cart when clicking "Agregar al carrito"', async () => {
    const [product] = await new MockProductRepository().getProducts();
    render(<ProductCard product={product} />);

    fireEvent.click(screen.getByLabelText('Agregar al carrito'));

    expect(useCartStore.getState().items).toEqual([{ product, quantity: 1 }]);
  });

  it('should not open the cart drawer from the listing, to avoid interrupting browsing', async () => {
    const [product] = await new MockProductRepository().getProducts();
    render(<ProductCard product={product} />);

    fireEvent.click(screen.getByLabelText('Agregar al carrito'));

    expect(useCartDrawerStore.getState().isOpen).toBe(false);
  });
});
