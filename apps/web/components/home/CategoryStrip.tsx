import Link from 'next/link'
import { categories } from '@/lib/design-tokens'

export default function CategoryStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">تسوق حسب الفئة</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <Link key={cat.key} href={cat.href}
            className="flex-shrink-0 flex flex-col items-center gap-3 group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-pill bg-light-elevated dark:bg-dark-elevated
                            flex items-center justify-center text-3xl
                            border-2 border-transparent group-hover:border-gold
                            transition-all duration-200 group-hover:scale-105 group-hover:shadow-gold">
              {cat.icon}
            </div>
            <span className="text-sm font-semibold text-light-text dark:text-dark-text group-hover:text-gold transition-colors">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
