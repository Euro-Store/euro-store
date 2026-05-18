'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react'

const tabs = [
  { label:'الرئيسية', href:'/ar',                 icon: Home        },
  { label:'بحث',      href:'/ar/search',           icon: Search      },
  { label:'سلة',      href:'/ar/cart',             icon: ShoppingBag },
  { label:'مفضلة',    href:'/ar/account/wishlist', icon: Heart       },
  { label:'حسابي',    href:'/ar/account',          icon: User        },
]

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50
                    bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border
                    safe-area-pb">
      <div className="flex">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors
                ${active ? 'text-gold' : 'text-light-muted dark:text-dark-muted hover:text-gold'}`}>
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
