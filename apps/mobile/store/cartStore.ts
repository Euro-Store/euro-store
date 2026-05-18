import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface CartItem { id: string; name: string; price: number; qty: number; image?: string }
interface CartStore {
  items: CartItem[]
  add:   (item: CartItem) => void
  remove:(id: string) => void
  clear: () => void
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add:    (item) => set(s => {
        const ex = s.items.find(i => i.id === item.id)
        if (ex) return { items: s.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) }
        return { items: [...s.items, { ...item, qty: 1 }] }
      }),
      remove: (id)  => set(s => ({ items: s.items.filter(i => i.id !== id) })),
      clear:  ()    => set({ items: [] }),
      total:  ()    => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name:'euro-cart-mobile', storage: createJSONStorage(() => AsyncStorage) }
  )
)
