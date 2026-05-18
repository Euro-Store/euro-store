"use client"
import { TrendingUp, TrendingDown, ShoppingBag, Users, Package, DollarSign } from "lucide-react"
import type { DashboardStats } from "@/types"
import { formatCurrency } from "@/lib/utils"

export default function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: "إجمالي الإيرادات", value: formatCurrency(stats.totalRevenue),    icon: DollarSign, change: stats.revenueChange,   color: "#d4a017" },
    { label: "إجمالي الطلبات",   value: stats.totalOrders.toLocaleString("ar"), icon: ShoppingBag, change: stats.ordersChange,  color: "#0284c7" },
    { label: "العملاء",           value: stats.totalCustomers.toLocaleString("ar"), icon: Users, change: stats.customersChange,color: "#16a34a" },
    { label: "المنتجات",          value: stats.totalProducts.toLocaleString("ar"),  icon: Package, change: 0,                  color: "#f59e0b" },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#a0a0a0]">{c.label}</span>
            <div className="p-2 rounded-lg" style={{ background: c.color+"20" }}>
              <c.icon size={18} style={{ color: c.color }} />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#f5f5f5]">{c.value}</p>
          {c.change !== 0 && (
            <div className={`flex items-center gap-1 mt-2 text-xs ${c.change > 0 ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
              {c.change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{Math.abs(c.change)}% من الشهر الماضي</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
