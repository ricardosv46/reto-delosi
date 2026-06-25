import { Product } from '../models/Product.model';

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  getCategories(): Promise<string[]>;
}
