import { Product } from '../../domain/models/Product.model';
import { ProductRepository } from '../../domain/ports/ProductRepository.interface';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Minimalist Leather Watch',
    price: 189.99,
    description:
      'Sleek, silver-plated casing paired with full-grain Italian leather strap. Designed for the refined individual.',
    category: 'accessories',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60',
    rating: { rate: 4.8, count: 120 },
  },
  {
    id: 2,
    title: 'Noise-Cancelling Premium Headphones',
    price: 349.99,
    description:
      'Immersive audio featuring active acoustic noise cancellation, high-fidelity sound, and 30-hour battery life.',
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60',
    rating: { rate: 4.9, count: 340 },
  },
  {
    id: 3,
    title: 'Dusk-to-Dawn Organic Fragrance',
    price: 95.0,
    description:
      'An evocative blend of amberwood, vetiver, and subtle citrus notes sourced from sustainable botanical farms.',
    category: 'accessories',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=60',
    rating: { rate: 4.5, count: 85 },
  },
  {
    id: 4,
    title: 'Ergonomic Mechanical Keyboard',
    price: 159.0,
    description:
      'Double-shot PBT keycaps with custom tactile silent switches, mounted on a solid anodized aluminum chassis.',
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=60',
    rating: { rate: 4.7, count: 145 },
  },
  {
    id: 5,
    title: 'Sculpted Ceramic Pour-Over Set',
    price: 64.99,
    description:
      'Artisanal stoneware brewer paired with a ribbed heat-resistant glass carafe. Beautiful design meets precision brewing.',
    category: 'home & lifestyle',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=60',
    rating: { rate: 4.6, count: 98 },
  },
  {
    id: 6,
    title: 'Recycled Tech Organizer Pouch',
    price: 45.0,
    description:
      'Waterproof ripstop fabric shell with soft felt divider slots to secure your daily drives, cables, and power banks.',
    category: 'accessories',
    image:
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=60',
    rating: { rate: 4.4, count: 50 },
  },
];

const MOCK_CATEGORIES = ['electronics', 'accessories', 'home & lifestyle'];

export class MockProductRepository implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    return MOCK_PRODUCTS;
  }

  async getProductById(id: number): Promise<Product | null> {
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    return product || null;
  }

  async getCategories(): Promise<string[]> {
    return MOCK_CATEGORIES;
  }
}
