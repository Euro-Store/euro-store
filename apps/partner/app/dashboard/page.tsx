"use client"
import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Clock, QrCode } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [stats, setStats] = useState({ confirmed: 0, rejected: 0, pending: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/partner/history")
      .then(r => r.json())
      .then(data => {
        const exchanges = data.exchanges ?? []
        setStats({
          confirmed: exchanges.filter((e: any) => e.status === "CONFIRMED_BY_PARTNER").length,
          rejected: exchanges.filter((e: any) => e.status === "REJECTED").length,
          pending: 0
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
        <p className="text-gray-500 text-sm mt-1">إحصائيات اليوم</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-28 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 col-span-1">
            <CheckCircle className="text-green-500 mb-2" size={28} />
            <p className="text-3xl font-bold text-green-700">{stats.confirmed}</p>
            <p className="text-green-600 text-sm mt-1">تم التأكيد</p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <XCircle className="text-red-400 mb-2" size={28} />
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-red-500 text-sm mt-1">مرفوض</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 col-span-2">
            <Clock className="text-yellow-500 mb-2" size={28} />
            <p className="text-sm text-yellow-700 font-medium">جاهز لاستقبال الطلبات</p>
          </div>
        </div>
      )}

      <Link href="/dashboard/scan"
        className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 rounded-2xl transition-colors text-lg w-full">
        <QrCode size={24} />
        مسح QR جديد
      </Link>
    </div>
  )
}