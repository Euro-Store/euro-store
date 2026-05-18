'use client'
import { useTheme } from '@/lib/theme'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="تبديل الثيم"
      className="p-2 rounded-btn text-light-muted dark:text-dark-muted
                 hover:text-gold hover:bg-light-elevated dark:hover:bg-dark-elevated
                 transition-all duration-200"
    >
      {theme === 'dark'
        ? <Sun  size={18} className="text-gold" />
        : <Moon size={18} />}
    </button>
  )
}
