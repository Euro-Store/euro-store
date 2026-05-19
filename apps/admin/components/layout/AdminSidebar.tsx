"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tag, Bookmark,
  ArrowLeftRight, RotateCcw, Star, Ticket, UserCog, Store,
  ClipboardList, BarChart3, LogOut, ChevronLeft, Menu, X
} from "lucide-react"
import { clearAdminToken } from "@/lib/auth"

const NAV = [
  { href: "/dashboard",                 label: "لوحة التحكم",       icon: LayoutDashboard },
  { href: "/dashboard/products",        label: "المنتجات",          icon: Package },
  { href: "/dashboard/orders",          label: "الطلبات",           icon: ShoppingBag },
  { href: "/dashboard/customers",       label: "العملاء",           icon: Users },
  { href: "/dashboard/categories",      label: "الفئات",            icon: Tag },
  { href: "/dashboard/brands",          label: "البراندات",         icon: Bookmark },
  { href: "/dashboard/exchanges",       label: "الاستبدال",         icon: ArrowLeftRight },
  { href: "/dashboard/returns",         label: "الاسترجاع",         icon: RotateCcw },
  { href: "/dashboard/loyalty",         label: "نقاط الولاء",       icon: Star },
  { href: "/dashboard/discounts",       label: "أكواد الخصم",       icon: Ticket },
  { href: "/dashboard/helpers",         label: "الهيلبرز",          icon: UserCog },
  { href: "/dashboard/partner-shops",   label: "المحلات الشريكة",   icon: Store },
  { href: "/dashboard/pending-reviews", label: "اقتراحات الهيلبر",  icon: ClipboardList },
  { href: "/dashboard/analytics",       label: "التحليلات",         icon: BarChart3 },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const [open, setOpen] = useState(false)

  function handleLogout() {
    clearAdminToken()
    router.push("/login")
  }
  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }
  function handleNavClick() {
    setOpen(false)
  }

  const sidebarContent = (
    <aside className="w-60 h-full bg-[#121212] border-l border-[#2a2a2a] flex flex-col">
      <div className="p-5 border-b border-[#2a2a2a] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#d4a017]">Euro Store</h2>
          <p className="text-xs text-[#666] mt-0.5">لوحة الإدارة</p>
        </div>
        <button onClick={() => setOpen(false)} className="md:hidden text-[#666] hover:text-[#f5f5f5] transition">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} onClick={handleNavClick}
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

  return (
    <>
      {/* Desktop — fixed sidebar */}
      <div className="hidden md:block fixed right-0 top-0 h-full z-40 w-60">
        {sidebarContent}
      </div>

      {/* Mobile — top bar */}
      <div className="md:hidden fixed top-0 right-0 left-0 z-40 h-14 bg-[#121212] border-b border-[#2a2a2a] flex items-center justify-between px-4">
        <button onClick={() => setOpen(true)} className="text-[#a0a0a0] hover:text-[#f5f5f5] transition">
          <Menu size={22} />
        </button>
        <h2 className="text-base font-bold text-[#d4a017]">Euro Store</h2>
        <div className="w-6" />
      </div>

      {/* Mobile — overlay + drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}