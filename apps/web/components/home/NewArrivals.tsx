import { mockProducts } from '@/lib/design-tokens'
import ProductCard from '@/components/product/Card'
import Link from 'next/link'

export default function NewArrivals() {
  const fresh = mockProducts.filter(p => p.isNew).slice(0, 4)
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-bold uppercase tracking-widest">جديد</span>
          </div>
          <h2 className="text-2xl font-black text-light-text dark:text-dark-text">وصل حديثاً</h2>
        </div>
        <Link href="/ar/new-arrivals" className="text-sm font-semibold text-gold hover:text-gold-deep transition-colors hidden md:block">
          عرض الكل ←
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {fresh.map((p) => <ProductCard key={p.id} product={p as any} />)}
      </div>
    </section>
  )
}
