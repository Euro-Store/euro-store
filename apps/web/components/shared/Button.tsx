'use client'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary:   'bg-gradient-to-l from-gold-deep to-gold text-white hover:opacity-90 shadow-sm hover:shadow-gold',
  secondary: 'bg-light-elevated dark:bg-dark-elevated text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border',
  outline:   'border border-gold text-gold hover:bg-gold/10',
  ghost:     'text-light-text dark:text-dark-text hover:bg-light-elevated dark:hover:bg-dark-elevated',
  danger:    'bg-red-600 text-white hover:bg-red-700',
}
const sizes: Record<Size, string> = {
  sm: 'h-8  px-3 text-xs',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-base font-bold',
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, className, children, disabled, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {loading
        ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        : children}
    </button>
  )
)

Button.displayName = 'Button'
export default Button
