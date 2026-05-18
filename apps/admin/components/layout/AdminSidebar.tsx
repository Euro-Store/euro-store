"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tag, Bookmark,
  ArrowLeftRight, RotateCcw, Star, Ticket, UserCog, Store,
  ClipboardList, BarChart3, LogOut, ChevronLeft
} from "lucide-react"
import { clearAdminToken } from "@/lib/auth"
import { useRouter } from "next/navigation"

const NAV = [
  { href: "/dashboard",                label: "لوحة التحكم",       icon: LayoutDashboard },
  { href: "/dashboard/products",       label: "المنتجات",          icon: Package },
  { href: "/dashboard/orders",         label: "الطلبات",           icon: ShoppingBag },
  { href: "/dashboard/customers",      label: "العملاء",           icon: Users },
  { href: "/dashboard/categories",     label: "الفئات",            icon: Tag },
  { href: "/dashboard/brands",         label: "البراندات",         icon: Bookmark },
  { href: "/dashboard/exchanges",      label: "الاستبدال",         icon: ArrowLeftRight },
  { href: "/dashboard/returns",        label: "الاسترجاع",         icon: RotateCcw },
  { href: "/dashboard/loyalty",        label: "نقاط الولاء",       icon: Star },
  { href: "/dashboard/discounts",      label: "أكواد الخصم",       icon: Ticket },
  { href: "/dashboard/helpers",        label: "الهيلبرز",          icon: UserCog },
  { href: "/dashboard/partner-shops",  label: "المحلات الشريكة",   icon: Store },
  { href: "/dashboard/pending-reviews",label: "اقتراحات الهيلبر",  icon: ClipboardList },
  { href: "/dashboard/analytics",      label: "التحليلات",         icon: BarChart3 },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  function handleLogout() {
    clearAdminToken()
    router.push("/login")
  }

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-60 min-h-screen bg-[#121212] border-l border-[#2a2a2a] flex flex-col fixed right-0 top-0 z-40">
      <div className="p-5 border-b border-[#2a2a2a]">
        <h2 className="text-xl font-bold text-[#d4a017]">Euro Store</h2>
        <p className="text-xs text-[#666] mt-0.5">لوحة الإدارة</p>
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
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-[#dc2626] hover:bg-[#dc262615] rounded-lg transition">
          <LogOut size={16} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  )
}
