import { mockProducts } from '@/lib/design-tokens'
import ProductCard from '@/components/product/Card'
import Link from 'next/link'

export default function TrendingSection() {
  const trending = mockProducts.slice(0, 4)
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-light-text dark:text-dark-text">الأكثر طلباً</h2>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">المنتجات التي يحبها الجميع</p>
        </div>
        <Link href="/ar/trending"
          className="text-sm font-semibold text-gold hover:text-gold-deep transition-colors hidden md:block">
          عرض الكل ←
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {trending.map((p) => <ProductCard key={p.id} product={p as any} />)}
      </div>
    </section>
  )
}
