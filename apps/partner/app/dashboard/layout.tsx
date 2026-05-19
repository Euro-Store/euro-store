"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { QrCode, History, LayoutDashboard, LogOut } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "الرئيسية" },
    { href: "/dashboard/scan", icon: QrCode, label: "مسح QR" },
    { href: "/dashboard/history", icon: History, label: "السجل" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between fixed top-0 inset-x-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-sm">E</span>
          </div>
          <span className="font-semibold text-sm">بوابة الشريك</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm">
          <LogOut size={16} />
          <span>خروج</span>
        </button>
      </header>

      {/* Content */}
      <main className="pt-14 pb-20">{children}</main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex z-50">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs transition-colors ${active ? "text-yellow-500" : "text-gray-500 hover:text-gray-700"}`}>
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}