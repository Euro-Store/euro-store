'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useWishlistStore } from '@/store/wishlistStore'

interface WishlistButtonProps {
  productId: string
  className?: string
}

export function WishlistButton({ productId, className = '' }: WishlistButtonProps) {
  const { requireAuth } = useAuthGuard()
  const { items, toggle } = useWishlistStore()
  const isLiked = items.includes(productId)

  function handleToggle() {
    requireAuth(() => toggle(productId))
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isLiked ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
      className={`
        p-2 rounded-full transition-colors
        ${isLiked
          ? 'text-red-500 bg-red-50 dark:bg-red-950/30'
          : 'text-dark-text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30'
        }
        ${className}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={isLiked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
}
