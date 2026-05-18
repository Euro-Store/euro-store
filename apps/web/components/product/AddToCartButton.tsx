'use client'
import { useState } from 'react'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useCartStore } from '@/store/cartStore'

interface AddToCartButtonProps {
  productId: string
  name: string
  brand: string
  price: number
  image: string
  variantId?: string
  size?: string
  color?: string
  className?: string
}

export function AddToCartButton({ productId, name, brand, price, image, variantId, size, color, className = '' }: AddToCartButtonProps) {
  const { requireAuth } = useAuthGuard()
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    requireAuth(() => {
      addItem({ productId, name, brand, price, image, variantId, size, color, quantity: 1 })
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    })
  }

  return (
    <button onClick={handleAdd}
      className={`w-full py-3 px-6 rounded-btn font-semibold text-sm transition-all duration-200 ${added ? 'bg-green-600 text-white' : 'bg-gold text-dark-base hover:bg-gold-light active:scale-95'} ${className}`}>
      {added ? '✓ أُضيف للسلة' : 'أضف إلى السلة'}
    </button>
  )
}
