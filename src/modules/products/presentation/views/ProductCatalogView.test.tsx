import { render, screen } from '@testing-library/react';
import { ProductCatalogView } from './ProductCatalogView';
import { Product } from '../../domain/models/Product.model';
import { useProductFilterParams } from '../hooks/useProductFilterParams';

jest.mock('../hooks/useProductFilterParams');

const mockedUseProductFilterParams = useProductFilterParams as jest.Mock;

const buildProduct = (overrides: Partial<Product>): Product => ({
  id: 1,
  title: 'Generic Product',
  price: 10,
  description: 'A generic description',
  category: 'electronics',
  image: 'https://images.unsplash.com/photo-1',
  ...overrides,
});

const products: Product[] = [
  buildProduct({ id: 1, title: 'Mechanical Keyboard', category: 'electronics', price: 100 }),
  buildProduct({ id: 2, title: 'Leather Watch', category: 'accessories', price: 50 }),
  buildProduct({ id: 3, title: 'Wireless Headphones', category: 'electronics', price: 200 }),
];

const setFilters = (overrides: Partial<ReturnType<typeof useProductFilterParams>> = {}) => {
  mockedUseProductFilterParams.mockReturnValue({
    search: '',
    category: '',
    sortBy: '',
    setSearch: jest.fn(),
    setCategory: jest.fn(),
    setSortBy: jest.fn(),
    ...overrides,
  });
};

describe('ProductCatalogView', () => {
  it('should render every product when there is no active filter', () => {
    setFilters();

    render(
      <ProductCatalogView initialProducts={products} categories={['electronics', 'accessories']} />
    );

    expect(screen.getByText('Mechanical Keyboard')).toBeInTheDocument();
    expect(screen.getByText('Leather Watch')).toBeInTheDocument();
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
  });

  it('should only show products matching the active category', () => {
    setFilters({ category: 'accessories' });

    render(
      <ProductCatalogView initialProducts={products} categories={['electronics', 'accessories']} />
    );

    expect(screen.getByText('Leather Watch')).toBeInTheDocument();
    expect(screen.queryByText('Mechanical Keyboard')).not.toBeInTheDocument();
  });

  it('should only show products matching the search term in title or description', () => {
    setFilters({ search: 'headphones' });

    render(
      <ProductCatalogView initialProducts={products} categories={['electronics', 'accessories']} />
    );

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.queryByText('Mechanical Keyboard')).not.toBeInTheDocument();
  });

  it('should sort products by price ascending when sortBy is price-asc', () => {
    setFilters({ sortBy: 'price-asc' });

    render(
      <ProductCatalogView initialProducts={products} categories={['electronics', 'accessories']} />
    );

    const titles = screen.getAllByRole('heading', { level: 3 }).map((el) => el.textContent);
    expect(titles).toEqual(['Leather Watch', 'Mechanical Keyboard', 'Wireless Headphones']);
  });

  it('should show an empty state when no product matches the filters', () => {
    setFilters({ search: 'nonexistent-product' });

    render(
      <ProductCatalogView initialProducts={products} categories={['electronics', 'accessories']} />
    );

    expect(screen.getByText('No encontramos coincidencias')).toBeInTheDocument();
  });
});
