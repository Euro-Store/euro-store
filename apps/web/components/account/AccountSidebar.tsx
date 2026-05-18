"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Package, Heart, ArrowLeftRight, Package2, MapPin, Settings, Star, ChevronLeft } from "lucide-react"

const NAV = [
  { href:"/account",           label:"حسابي",        icon:User,           end:true },
  { href:"/account/orders",    label:"طلباتي",       icon:Package },
  { href:"/account/wishlist",  label:"المفضلة",      icon:Heart },
  { href:"/account/loyalty",   label:"نقاط الولاء",  icon:Star },
  { href:"/account/exchange",  label:"الاستبدال",    icon:ArrowLeftRight },
  { href:"/account/returns",   label:"الاسترجاع",    icon:Package2,       soon:true },
  { href:"/account/addresses", label:"العناوين",     icon:MapPin },
  { href:"/account/settings",  label:"الإعدادات",    icon:Settings },
]

export function AccountSidebar() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'ar'

  function active(href: string, end?: boolean) {
    const clean = pathname.replace(/^\/(ar|en)/, "")
    return end ? clean === href : clean.startsWith(href)
  }

  return (
    <aside className="w-56 flex-shrink-0">
      <nav className="bg-white dark:bg-[#121212] border border-[#e5e7eb] dark:border-[#2a2a2a] rounded-2xl overflow-hidden">
        {NAV.map(({ href, label, icon: Icon, end, soon }) => (
          <Link key={href} href={`/${locale}${href}`}
            className={`flex items-center gap-3 px-4 py-3 text-sm border-b border-[#e5e7eb] dark:border-[#1a1a1a] last:border-0 transition-colors ${
              active(href, end)
                ? "bg-[#d4a01710] text-[#d4a017]"
                : "text-[#6b7280] dark:text-[#a0a0a0] hover:bg-[#f7f5ef] dark:hover:bg-[#1a1a1a] hover:text-[#111111] dark:hover:text-[#f5f5f5]"
            }`}>
            <Icon size={16} className="flex-shrink-0"/>
            <span className="flex-1">{label}</span>
            {soon && <span className="text-[9px] bg-[#f59e0b20] text-[#f59e0b] px-1.5 py-0.5 rounded-full">قريباً</span>}
            {active(href, end) && !soon && <ChevronLeft size={12}/>}
          </Link>
        ))}
      </nav>
    </aside>
  )
}