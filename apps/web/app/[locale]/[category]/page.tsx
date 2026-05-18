import { mockProducts, categories } from '@/lib/design-tokens'
import ProductGrid from '@/components/product/Grid'
import Filters     from '@/components/product/Filters'
import SortBar     from '@/components/product/SortBar'
import FilterSheet from '@/components/product/FilterSheet'
import Breadcrumb  from '@/components/shared/Breadcrumb'
import { notFound } from 'next/navigation'

const validCategories = ['men','women','kids','shoes','bags','accessories']
interface Props { params: { locale: string; category: string } }

export default function CategoryPage({ params }: Props) {
  const { locale, category } = params
  if (!validCategories.includes(category)) notFound()
  const catInfo  = categories.find(c => c.key === category)
  const products = (mockProducts as any[]).filter(p => p.category === category)
  const display  = products.length ? products : (mockProducts as any[]).slice(0, 6)
  const crumbs   = [{ label:'الرئيسية', href:`/${locale}` }, { label: catInfo?.label ?? category }]
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <Breadcrumb items={crumbs} />
      <div className="flex items-end justify-between mt-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-light-text dark:text-dark-text">
            {catInfo?.icon} {catInfo?.label ?? category}
          </h1>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">{display.length} منتج متوفر</p>
        </div>
        <FilterSheet />
      </div>
      <div className="flex gap-8">
        <div className="hidden md:block flex-shrink-0"><Filters /></div>
        <div className="flex-1 min-w-0">
          <SortBar total={display.length} />
          <div className="mt-6"><ProductGrid products={display} cols={3} /></div>
        </div>
      </div>
    </div>
  )
}
export function generateStaticParams() {
  return validCategories.flatMap(category => ['ar','en'].map(locale => ({ locale, category })))
}