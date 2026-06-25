import { Product } from '@/modules/products/domain/models/Product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}
