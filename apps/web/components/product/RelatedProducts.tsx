import { mockProducts } from '@/lib/design-tokens'
import ProductCard from './Card'
interface Props { currentId: string; category: string }
export default function RelatedProducts({ currentId, category }: Props) {
  const related = (mockProducts as any[]).filter(p => p.category === category && p.id !== currentId).slice(0, 4)
  if (!related.length) return null
  return (
    <div className="border-t border-light-border dark:border-dark-border pt-12">
      <h3 className="text-xl font-black text-light-text dark:text-dark-text mb-6">قد يعجبك أيضاً</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {related.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}