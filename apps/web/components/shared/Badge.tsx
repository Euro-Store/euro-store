import { clsx } from 'clsx'

type Variant = 'gold' | 'dark' | 'new' | 'sale' | 'success' | 'error' | 'muted'

interface Props { label: string; variant?: Variant; className?: string }

const styles: Record<Variant, string> = {
  gold:    'bg-gold text-white',
  dark:    'bg-dark-base text-dark-text',
  new:     'bg-dark-base text-white border border-dark-border',
  sale:    'bg-red-600 text-white',
  success: 'bg-green-600 text-white',
  error:   'bg-red-600 text-white',
  muted:   'bg-light-elevated dark:bg-dark-elevated text-light-muted dark:text-dark-muted',
}

export default function Badge({ label, variant = 'muted', className }: Props) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-pill text-[11px] font-bold',
      styles[variant], className
    )}>
      {label}
    </span>
  )
}
