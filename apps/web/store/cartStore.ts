import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cartApi, type CartItem } from '@/lib/api-client'

interface CartState {
  items: CartItem[]
  subtotal: number
  isLoading: boolean
  isOpen: boolean
  fetchCart: () => Promise<void>
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  openCart: () => void
  closeCart: () => void
  totalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      isLoading: false,
      isOpen: false,

      fetchCart: async () => {
        set({ isLoading: true })
        try {
          const { cart } = await cartApi.get()
          set({ items: cart.items, subtotal: cart.subtotal, isLoading: false })
        } catch { set({ isLoading: false }) }
      },

      addItem: async (variantId, quantity = 1) => {
        set({ isLoading: true })
        try {
          const { cart } = await cartApi.add(variantId, quantity)
          set({ items: cart.items, subtotal: cart.subtotal, isLoading: false, isOpen: true })
        } catch {
          set({ isLoading: false })
          throw new Error('فشل إضافة المنتج للسلة')
        }
      },

      updateItem: async (itemId, quantity) => {
        try {
          const { cart } = await cartApi.update(itemId, quantity)
          set({ items: cart.items, subtotal: cart.subtotal })
        } catch {}
      },

      removeItem: async (itemId) => {
        try {
          const { cart } = await cartApi.remove(itemId)
          set({ items: cart.items, subtotal: cart.subtotal })
        } catch {}
      },

      clearCart: async () => {
        try { await cartApi.clear() } catch {}
        set({ items: [], subtotal: 0 })
      },

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: 'euro-cart', partialize: (s) => ({ items: s.items, subtotal: s.subtotal }) }
  )
)
