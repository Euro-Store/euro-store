import { clsx } from 'clsx'

interface Props { className?: string; rounded?: 'sm'|'md'|'full' }

export function Skeleton({ className, rounded = 'md' }: Props) {
  const r = { sm:'rounded', md:'rounded-card', full:'rounded-full' }[rounded]
  return <div className={clsx('skeleton-base', r, className)} />
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-light-surface dark:bg-dark-surface rounded-card overflow-hidden border border-light-border dark:border-dark-border">
      <Skeleton className="aspect-[3/4] w-full" rounded="sm" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-24 mt-3" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  )
}
