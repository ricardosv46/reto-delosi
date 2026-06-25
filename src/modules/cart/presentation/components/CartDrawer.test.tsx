import { render, screen, fireEvent } from '@testing-library/react';
import { CartDrawer } from './CartDrawer';
import { useCartStore } from '../../infrastructure/store/cart.store';
import { useCartDrawerStore } from '../../infrastructure/store/cartDrawer.store';
import { Product } from '@/modules/products/domain/models/Product.model';

const product: Product = {
  id: 1,
  title: 'Minimalist Leather Watch',
  price: 100,
  description: 'A sleek watch.',
  category: 'accessories',
  image: 'https://images.unsplash.com/photo-1',
};

describe('CartDrawer', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [{ product, quantity: 2 }] });
    useCartDrawerStore.setState({ isOpen: true });
  });

  it('should show the order confirmation screen and clear the cart after completing the purchase', () => {
    render(<CartDrawer />);

    fireEvent.click(screen.getByRole('button', { name: 'Completar Compra' }));

    expect(screen.getByText('Gracias por tu compra')).toBeInTheDocument();
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('should close the drawer when clicking "Seguir comprando" after a purchase', () => {
    render(<CartDrawer />);

    fireEvent.click(screen.getByRole('button', { name: 'Completar Compra' }));
    fireEvent.click(screen.getByRole('button', { name: 'Seguir comprando' }));

    expect(useCartDrawerStore.getState().isOpen).toBe(false);
  });

  it('should remove an item when clicking the delete button', () => {
    render(<CartDrawer />);

    fireEvent.click(screen.getByLabelText('Eliminar producto'));

    expect(useCartStore.getState().items).toEqual([]);
  });
});
