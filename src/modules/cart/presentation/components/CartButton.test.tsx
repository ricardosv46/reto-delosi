import { render, screen } from '@testing-library/react';
import { CartButton } from './CartButton';
import { useCartStore } from '../../infrastructure/store/cart.store';
import { MockProductRepository } from '@/modules/products/infrastructure/adapters/MockProductRepository';

describe('CartButton', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('should not display a badge when the cart is empty', () => {
    render(<CartButton />);

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('should display the total quantity badge after a product is added to the cart', async () => {
    const [product] = await new MockProductRepository().getProducts();
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);

    render(<CartButton />);

    expect(await screen.findByText('2')).toBeInTheDocument();
  });
});
