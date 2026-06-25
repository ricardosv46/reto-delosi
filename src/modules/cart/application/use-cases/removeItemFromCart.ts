import { CartItem } from '../../domain/models/CartItem.model';

export function removeItemFromCart(items: CartItem[], productId: number): CartItem[] {
  return items.filter((item) => item.product.id !== productId);
}
