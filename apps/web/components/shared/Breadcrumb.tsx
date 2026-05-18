import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
interface Crumb { label: string; href?: string }
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav>
      <ol className="flex items-center gap-1 flex-wrap">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronLeft size={12} className="text-light-muted dark:text-dark-muted rotate-180" />}
            {item.href && i < items.length - 1
              ? <Link href={item.href} className="text-xs text-light-muted dark:text-dark-muted hover:text-gold transition-colors">{item.label}</Link>
              : <span className="text-xs text-light-text dark:text-dark-text font-medium">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}