import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  variantId?: string
  name: string
  brand: string
  price: number
  image: string
  size?: string
  color?: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(
          i => i.productId === item.productId && i.size === item.size && i.color === item.color
        )
        if (existing) {
          set(s => ({
            items: s.items.map(i =>
              i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          }))
        } else {
          set(s => ({
            items: [...s.items, { ...item, id: `${item.productId}-${Date.now()}` }]
          }))
        }
      },
      removeItem: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) { get().removeItem(id); return }
        set(s => ({ items: s.items.map(i => i.id === id ? { ...i, quantity } : i) }))
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    { name: 'euro-cart' }
  )
)
