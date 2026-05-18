"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Package, ArrowLeftRight, Star, ClipboardList, LogOut, ChevronLeft } from "lucide-react"
import { clearHelperToken } from "@/lib/auth"

const NAV = [
  { href: "/dashboard",               label: "الرئيسية",        icon: LayoutDashboard },
  { href: "/dashboard/inventory",     label: "المخزون",         icon: Package },
  { href: "/dashboard/exchanges",     label: "الاستبدال",       icon: ArrowLeftRight },
  { href: "/dashboard/loyalty",       label: "نقاط الولاء",     icon: Star },
  { href: "/dashboard/products",      label: "اقتراحاتي",       icon: ClipboardList },
]

export default function HelperSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-56 min-h-screen bg-[#121212] border-l border-[#2a2a2a] flex flex-col fixed right-0 top-0 z-40">
      <div className="p-5 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#d4a01720] border border-[#d4a01740] flex items-center justify-center text-sm">🏪</div>
          <div>
            <p className="text-sm font-bold text-[#d4a017]">Euro Store</p>
            <p className="text-xs text-[#666]">بوابة الهيلبر</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all ${
              isActive(href)
                ? "bg-[#d4a01715] text-[#d4a017] border-r-2 border-[#d4a017]"
                : "text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-[#f5f5f5]"
            }`}>
            <Icon size={16} />
            <span>{label}</span>
            {isActive(href) && <ChevronLeft size={12} className="mr-auto" />}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-[#2a2a2a]">
        <button onClick={()=>{ clearHelperToken(); router.push("/login") }}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-[#dc2626] hover:bg-[#dc262615] rounded-lg transition">
          <LogOut size={16} /><span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  )
}
