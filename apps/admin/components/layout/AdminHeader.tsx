"use client"
import { Bell, Search } from "lucide-react"

interface Props { title: string; subtitle?: string }

export default function AdminHeader({ title, subtitle }: Props) {
  return (
    <header className="h-14 bg-[#121212] border-b border-[#2a2a2a] flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        <h1 className="text-base font-bold text-[#f5f5f5]">{title}</h1>
        {subtitle && <p className="text-xs text-[#666]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#a0a0a0] hover:text-[#f5f5f5] transition">
          <Search size={16} />
        </button>
        <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#a0a0a0] hover:text-[#f5f5f5] transition relative">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#d4a017] rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-[#d4a017] flex items-center justify-center text-[#0a0a0a] font-bold text-sm">
          A
        </div>
      </div>
    </header>
  )
}
