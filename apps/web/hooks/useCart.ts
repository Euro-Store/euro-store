'use client'
import { useCartStore } from '@/store/cartStore'

export function useCart() {
  const { items, add, remove, updateQty, clear, total } = useCartStore()
  return { items, add, remove, updateQty, clear, total, count: items.reduce((s, i) => s + i.qty, 0) }
}
