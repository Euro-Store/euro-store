'use client'
import { useEffect } from 'react'
import { useWishlistStore } from '@/store/wishlistStore'

export function useWishlist() {
  const { items, add, remove, toggle, has } = useWishlistStore()
  return { items, add, remove, toggle, has, count: items.length }
}
