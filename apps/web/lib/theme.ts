'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'euro-theme'

interface ThemeCtx { theme: Theme; toggle: () => void; set: (t: Theme) => void }
const Ctx = createContext<ThemeCtx>({ theme: 'light', toggle: () => {}, set: () => {} })

function applyTheme(t: Theme) {
  if (t === 'dark') document.documentElement.classList.add('dark')
  else              document.documentElement.classList.remove('dark')
  try { localStorage.setItem(KEY, t) } catch {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    let saved: Theme | null = null
    try { saved = localStorage.getItem(KEY) as Theme | null } catch {}
    const t: Theme = (saved === 'dark' || saved === 'light')
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(t)
    applyTheme(t)
  }, [])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      return next
    })
  }, [])

  const set = useCallback((t: Theme) => {
    setTheme(t)
    applyTheme(t)
  }, [])

  return <Ctx.Provider value={{ theme, toggle, set }}>{children}</Ctx.Provider>
}

export function useTheme() {
  return useContext(Ctx)
}