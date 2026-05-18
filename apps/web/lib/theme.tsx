'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
interface ThemeCtx { theme: Theme; toggle: () => void; isDark: boolean }

const Ctx = createContext<ThemeCtx>({ theme: 'light', toggle: () => {}, isDark: false })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = (localStorage.getItem('euro-theme') ?? 'light') as Theme
    apply(stored)
    setTheme(stored)
    setMounted(true)
  }, [])

  function apply(t: Theme) {
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    apply(next)
    setTheme(next)
    localStorage.setItem('euro-theme', next)
  }

  if (!mounted) return <>{children}</>

  return (
    <Ctx.Provider value={{ theme, toggle, isDark: theme === 'dark' }}>
      {children}
    </Ctx.Provider>
  )
}

export const useTheme = () => useContext(Ctx)
