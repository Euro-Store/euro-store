import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  items: string[]
  toggle: (productId: string) => void
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) => {
        const exists = get().items.includes(productId)
        set({ items: exists ? get().items.filter(id => id !== productId) : [...get().items, productId] })
      },
      clear: () => set({ items: [] }),
    }),
    { name: 'euro-wishlist' }
  )
)
