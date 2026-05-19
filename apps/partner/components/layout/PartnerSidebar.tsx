"use client"
import { useState } from "react"
import Link         from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, QrCode, History, LayoutDashboard, LogOut } from "lucide-react"

const NAV = [
  { href: "/dashboard",         label: "الرئيسية", Icon: LayoutDashboard },
  { href: "/dashboard/scan",    label: "مسح QR",   Icon: QrCode          },
  { href: "/dashboard/history", label: "السجل",    Icon: History         }
]

function SidebarInner({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router   = useRouter()

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <div className="flex flex-col h-full bg-dark-base">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-dark-border">
        <p className="text-xl font-black text-gold tracking-tight">Euro Store</p>
        <p className="text-xs text-gray-500 mt-0.5 font-medium">بوابة الشريك</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-[rgba(201,150,26,0.15)] text-gold"
                  : "text-gray-400 hover:bg-dark-elevated hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
              {active && <span className="mr-auto w-1.5 h-1.5 bg-gold rounded-full" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-dark-border">
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full text-sm text-gray-500 hover:text-red-400 transition-colors px-2 py-2 rounded-lg hover:bg-dark-elevated"
        >
          <LogOut size={16} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  )
}

export default function PartnerSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile topbar */}
      <header className="fixed top-0 right-0 left-0 z-50 h-14 flex items-center bg-dark-base border-b border-dark-border shadow-md md:hidden px-4">
        <button onClick={() => setOpen(true)} className="text-gray-300 hover:text-white transition-colors p-1">
          <Menu size={22} />
        </button>
        <span className="mr-3 text-gold font-black text-lg tracking-tight">Euro Store</span>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer — RTL: slides from right */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-60 transform transition-transform duration-200 ease-out md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <SidebarInner onClose={() => setOpen(false)} />
      </aside>

      {/* Desktop sidebar — fixed to the right (RTL) */}
      <aside className="hidden md:block fixed right-0 top-0 h-full w-56 z-30 border-l border-dark-border shadow-xl">
        <SidebarInner />
      </aside>
    </>
  )
}