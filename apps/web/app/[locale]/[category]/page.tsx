import { notFound } from 'next/navigation'
import { categories, mockProducts } from '@/lib/mock-data'

interface Props {
  params: { locale: string; category: string }
}

export default function CategoryPage({ params: { locale, category } }: Props) {
  const validCategories = categories.map(c => c.key) as string[]
  if (!validCategories.includes(category)) notFound()

  const catInfo = categories.find(c => c.key === category)
  const allProducts = mockProducts as unknown as { id: string; name: string; brand: string; price: number; originalPrice?: number; image: string; category: string; isNew?: boolean; discount?: number }[]
  const products = allProducts.filter(p => p.category === category)
  const display  = products.length ? products : allProducts.slice(0, 6)
  const crumbs   = [{ label: 'الرئيسية', href: `/${locale}` }, { label: catInfo?.label ?? category }]

  return (
    <main className="min-h-screen bg-light-base dark:bg-dark-base">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex gap-2 text-sm text-light-text-muted dark:text-dark-text-muted" dir="rtl">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {c.href ? (
                <a href={c.href} className="hover:text-gold transition-colors">{c.label}</a>
              ) : (
                <span className="text-light-text-main dark:text-dark-text-main font-medium">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-6" dir="rtl">
        <h1 className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">{catInfo?.label ?? category}</h1>
        <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">{display.length} منتج</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" dir="rtl">
          {display.map(p => (
            <a key={p.id} href={`/${locale}/product/${p.id}`}
              className="group bg-light-surface dark:bg-dark-surface rounded-card overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] overflow-hidden bg-light-elevated dark:bg-dark-elevated">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <p className="text-xs text-light-text-muted dark:text-dark-text-muted">{p.brand}</p>
                <p className="text-sm font-medium mt-0.5 line-clamp-2 text-light-text-main dark:text-dark-text-main">{p.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gold font-bold text-sm">{p.price.toLocaleString()} ل.س</span>
                  {p.originalPrice && <span className="text-xs text-light-text-muted dark:text-dark-text-muted line-through">{p.originalPrice.toLocaleString()}</span>}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
