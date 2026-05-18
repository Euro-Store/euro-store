'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { mockProducts } from '@/lib/design-tokens'
import ProductGrid from '@/components/product/Grid'
import SortBar     from '@/components/product/SortBar'
import { ProductGridSkeleton } from '@/components/shared/Skeleton'
import { Search } from 'lucide-react'

function SearchResults() {
  const q = useSearchParams().get('q') ?? ''
  const results = q.trim()
    ? (mockProducts as unknown as any[]).filter(p => p.name.includes(q) || p.brand.toLowerCase().includes(q.toLowerCase()))
    : []
  return (
    <div>
      <div className="mb-6">
        {q
          ? <><h1 className="text-xl font-black text-light-text dark:text-dark-text">نتائج: <span className="text-gold">"{q}"</span></h1>
              <p className="text-sm text-light-muted dark:text-dark-muted mt-1">{results.length} نتيجة</p></>
          : <h1 className="text-xl font-black text-light-text dark:text-dark-text">ابحث عن منتجاتك</h1>}
      </div>
      {q && results.length > 0 && <><SortBar total={results.length} /><div className="mt-6"><ProductGrid products={results} /></div></>}
      {q && results.length === 0 && (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-5">
            <Search size={32} className="text-gold" />
          </div>
          <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">لا توجد نتائج</h2>
          <p className="text-light-muted dark:text-dark-muted mb-6">جرب كلمات مختلفة أو تصفح الأقسام</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['قمصان','أحذية','فساتين','جاكيتات'].map(s => (
              <a key={s} href={`/ar/search?q=${encodeURIComponent(s)}`}
                className="px-4 py-2 rounded-pill bg-light-elevated dark:bg-dark-elevated text-sm text-light-text dark:text-dark-text hover:bg-gold hover:text-white transition-all">
                {s}
              </a>
            ))}
          </div>
        </div>
      )}
      {!q && (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-5"><Search size={32} className="text-gold" /></div>
          <p className="text-light-muted dark:text-dark-muted">استخدم شريط البحث للعثور على ما تريد</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Suspense fallback={<ProductGridSkeleton count={8} />}><SearchResults /></Suspense>
    </div>
  )
}
