import ProductCard from './Card'
import type { Product } from '@/lib/design-tokens'

interface Props {
  products: Product[]
  cols?: 2 | 3 | 4
}

export default function ProductGrid({ products, cols = 4 }: Props) {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[cols]

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">🔍</span>
        <p className="text-light-text dark:text-dark-text font-semibold text-lg">لا توجد منتجات</p>
        <p className="text-light-muted dark:text-dark-muted text-sm mt-2">جرب تغيير الفلاتر أو البحث بكلمة أخرى</p>
      </div>
    )
  }

  return (
    <div className={`grid ${colClass} gap-4 md:gap-6`}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
