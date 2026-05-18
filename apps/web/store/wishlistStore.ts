import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { wishlistApi, type WishlistItem } from '@/lib/api-client'

interface WishlistState {
  items: WishlistItem[]
  isLoading: boolean
  fetchWishlist: () => Promise<void>
  toggle: (productId: string) => Promise<boolean>
  isWishlisted: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      fetchWishlist: async () => {
        set({ isLoading: true })
        try {
          const { items } = await wishlistApi.get()
          set({ items, isLoading: false })
        } catch { set({ isLoading: false }) }
      },

      toggle: async (productId) => {
        try {
          const { added } = await wishlistApi.toggle(productId)
          if (added) await get().fetchWishlist()
          else set(s => ({ items: s.items.filter(i => i.product.id !== productId) }))
          return added
        } catch { return false }
      },

      isWishlisted: (productId) => get().items.some(i => i.product.id === productId),
    }),
    { name: 'euro-wishlist', partialize: (s) => ({ items: s.items }) }
  )
)
