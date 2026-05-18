"use client"
import { useState, useEffect } from "react"
import AdminHeader from "@/components/layout/AdminHeader"
import StatsCards from "@/components/dashboard/StatsCards"
import RevenueChart from "@/components/dashboard/RevenueChart"
import OrdersChart from "@/components/dashboard/OrdersChart"
import RecentActivity from "@/components/dashboard/RecentActivity"
import type { DashboardStats } from "@/types"
import { api } from "@/lib/api"

const MOCK_STATS: DashboardStats = {
  totalRevenue: 12500000, totalOrders: 384, totalCustomers: 1240, totalProducts: 520,
  revenueChange: 12, ordersChange: 8, customersChange: 5, pendingOrders: 23,
  revenueChart: [
    { month:"يناير", revenue:800000 },{ month:"فبراير", revenue:950000 },
    { month:"مارس",  revenue:1100000 },{ month:"أبريل",  revenue:1050000 },
    { month:"مايو",  revenue:1300000 },{ month:"يونيو",  revenue:1200000 },
    { month:"يوليو", revenue:1500000 },
  ],
  ordersChart: [
    { day:"الأحد", orders:45 },{ day:"الاثنين", orders:62 },{ day:"الثلاثاء", orders:38 },
    { day:"الأربعاء", orders:71 },{ day:"الخميس", orders:55 },{ day:"الجمعة", orders:83 },{ day:"السبت", orders:49 },
  ],
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(MOCK_STATS)
  useEffect(() => {
    api.get<DashboardStats>("/admin/dashboard/stats").then(setStats).catch(() => {})
  }, [])

  return (
    <div>
      <AdminHeader title="لوحة التحكم" subtitle="مرحباً بك في إدارة Euro Store" />
      <div className="p-6 space-y-6">
        {stats.pendingOrders > 0 && (
          <div className="bg-[#d4a01715] border border-[#d4a01740] rounded-xl px-4 py-3 text-sm text-[#d4a017]">
            يوجد {stats.pendingOrders} طلب معلّق بانتظار التأكيد
          </div>
        )}
        <StatsCards stats={stats} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <RevenueChart data={stats.revenueChart} />
          <OrdersChart  data={stats.ordersChart}  />
        </div>
        <RecentActivity />
      </div>
    </div>
  )
}
