'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import type { Product } from '@/lib/design-tokens'

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const [wishlisted, setWishlisted] = useState(false)
  const [imgError,   setImgError]   = useState(false)

  const hasDiscount = product.discount > 0
  const formatted   = (n: number) => n.toLocaleString('ar-SY') + ' ل.س'

  return (
    <article className="group relative bg-light-surface dark:bg-dark-surface rounded-card overflow-hidden
                        border border-light-border dark:border-dark-border
                        hover:shadow-card-hover hover:border-gold/30 transition-all duration-300">
      {/* Image */}
      <Link href={`/ar/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-light-elevated dark:bg-dark-elevated">
          <Image
            src={imgError ? 'https://placehold.co/400x533/f0ede4/111111?text=Euro+Store' : product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            sizes="(max-width:768px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2 py-0.5 rounded-pill bg-dark-base text-white text-[10px] font-bold">جديد</span>
            )}
            {hasDiscount && (
              <span className="px-2 py-0.5 rounded-pill bg-gold text-white text-[10px] font-bold">
                -{product.discount}٪
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted) }}
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 dark:bg-dark-surface/90
                       flex items-center justify-center shadow-card opacity-0 group-hover:opacity-100
                       transition-all duration-200 hover:scale-110"
            aria-label={wishlisted ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}>
            <Heart size={15} className={wishlisted ? 'fill-gold text-gold' : 'text-light-muted'} />
          </button>

          {/* Quick Add */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={e => e.preventDefault()}
              className="w-full py-2.5 rounded-btn font-bold text-sm text-white transition-all
                         hover:opacity-90 active:scale-[0.98]"
              style={{ background:'linear-gradient(135deg,#d4a017,#a87400)' }}>
              أضف للسلة
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 md:p-4">
        <p className="text-[11px] font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <Link href={`/ar/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-light-text dark:text-dark-text leading-snug hover:text-gold transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-black text-light-text dark:text-dark-text">
            {formatted(product.price)}
          </span>
          {hasDiscount && product.originalPrice > 0 && (
            <span className="text-xs text-light-muted dark:text-dark-muted line-through">
              {formatted(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
