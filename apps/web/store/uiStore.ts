import { create } from 'zustand'

interface UiStore {
  cartOpen:      boolean
  searchOpen:    boolean
  filterOpen:    boolean
  setCartOpen:   (v: boolean) => void
  setSearchOpen: (v: boolean) => void
  setFilterOpen: (v: boolean) => void
}

export const useUiStore = create<UiStore>()((set) => ({
  cartOpen:      false,
  searchOpen:    false,
  filterOpen:    false,
  setCartOpen:   (v) => set({ cartOpen:   v }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setFilterOpen: (v) => set({ filterOpen: v }),
}))
