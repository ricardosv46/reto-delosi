import { CartItem } from '../../domain/models/CartItem.model';

export function updateCartItemQuantity(
  items: CartItem[],
  productId: number,
  quantity: number
): CartItem[] {
  return items.map((item) =>
    item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
  );
}
