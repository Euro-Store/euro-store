'use client'
import { useState, useEffect } from 'react'
import { LogoutButton } from '@/components/shared/LogoutButton'
import Link from 'next/link'
import { Heart, ShoppingBag, User } from 'lucide-react'
import TopBanner from './TopBanner'
import SearchBar  from './SearchBar'
import MegaMenu   from './MegaMenu'
import ThemeToggle from './ThemeToggle'
import { navLinks } from '@/lib/design-tokens'
import { useAuthStore } from '@/store/authStore'

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [activeMenu,  setActiveMenu]  = useState<string | null>(null)
  const [cartCount,   setCartCount]   = useState(0)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const { user } = useAuthStore()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <TopBanner />
      <div className={`bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border
                       transition-all duration-300 ${scrolled ? 'shadow-card backdrop-blur-md bg-light-surface/95 dark:bg-dark-surface/95' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center h-16 gap-4">

            {/* Logo */}
            <Link href="/ar" className="flex-shrink-0 flex items-center gap-1">
              <span className="text-xl md:text-2xl font-black text-gold tracking-widest leading-none">EURO</span>
              <span className="text-xl md:text-2xl font-black text-light-text dark:text-dark-text tracking-widest leading-none">STORE</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
              {navLinks.map((item) => {
                const key = item.href.split('/').pop() ?? ''
                return (
                  <div key={key} className="relative"
                    onMouseEnter={() => setActiveMenu(key)}
                    onMouseLeave={() => setActiveMenu(null)}>
                    <Link href={item.href}
                      className={`px-3 py-2 text-sm font-semibold rounded-btn transition-all duration-150
                        ${activeMenu === key
                          ? 'text-gold'
                          : 'text-light-text dark:text-dark-text hover:text-gold'}`}>
                      {item.label}
                    </Link>
                    {activeMenu === key && (
                      <div onMouseEnter={() => setActiveMenu(key)} onMouseLeave={() => setActiveMenu(null)}>
                        <MegaMenu category={key} />
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-0.5 mr-auto">
              <SearchBar />
              <ThemeToggle />
              <Link href="/ar/account/wishlist" aria-label="المفضلة"
                className="p-2 rounded-btn text-light-muted dark:text-dark-muted hover:text-gold hover:bg-light-elevated dark:hover:bg-dark-elevated transition-all">
                <Heart size={18} />
              </Link>
              <Link href="/ar/cart" aria-label="السلة"
                className="relative p-2 rounded-btn text-light-muted dark:text-dark-muted hover:text-gold hover:bg-light-elevated dark:hover:bg-dark-elevated transition-all">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -left-0.5 min-w-4 h-4 px-0.5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <Link href="/ar/account" aria-label="حسابي"
                    className="p-2 rounded-btn text-light-muted dark:text-dark-muted hover:text-gold hover:bg-light-elevated dark:hover:bg-dark-elevated transition-all">
                    <User size={18} />
                  </Link>
                  <LogoutButton />
                </>
              ) : (
                <Link href="/ar/auth/login" aria-label="تسجيل الدخول"
                  className="p-2 rounded-btn text-light-muted dark:text-dark-muted hover:text-gold hover:bg-light-elevated dark:hover:bg-dark-elevated transition-all">
                  <User size={18} />
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-light-text dark:text-dark-text">
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-5 bg-current transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-5 bg-current transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-5 bg-current transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface animate-slideDown">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-2 text-base font-semibold text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border hover:text-gold transition-colors">
                  {item.label}
                </Link>
              ))}
              {user && <div className="pt-2"><LogoutButton /></div>}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}