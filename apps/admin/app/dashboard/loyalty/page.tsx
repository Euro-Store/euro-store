"use client"
import { useEffect, useState } from "react"
import AdminHeader from "@/components/layout/AdminHeader"
import LoyaltyStats from "@/components/loyalty/LoyaltyStats"
import Link from "next/link"
import { api } from "@/lib/api"

export default function LoyaltyPage() {
  const [stats, setStats] = useState({ totalPointsIssued:84200, totalPointsRedeemed:12400, activeCustomers:340, avgPointsPerCustomer:248 })
  useEffect(()=>{ api.get<typeof stats>("/admin/loyalty/stats").then(setStats).catch(()=>{}) },[])
  return (
    <div>
      <AdminHeader title="نظام نقاط الولاء" subtitle="إدارة نقاط المكافآت وإعدادات البرنامج" />
      <div className="p-6 space-y-6">
        <LoyaltyStats {...stats} />
        <div className="flex gap-3">
          <Link href="/dashboard/loyalty/transactions" className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm transition">
            سجل المعاملات
          </Link>
          <Link href="/dashboard/loyalty/settings" className="px-4 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition">
            إعدادات النقاط
          </Link>
        </div>
      </div>
    </div>
  )
}
