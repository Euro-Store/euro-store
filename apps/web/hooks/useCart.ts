import { useCartStore } from '@/store/cartStore'

export function useCart() {
  const { items, addItem, removeItem, updateQuantity, clearCart, total } = useCartStore()
  return {
    items,
    add: addItem,
    remove: removeItem,
    updateQty: updateQuantity,
    clear: clearCart,
    total,
    count: items.reduce((s, i) => s + i.quantity, 0),
  }
}
