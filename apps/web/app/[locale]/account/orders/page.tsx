'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ordersApi, type Order } from '@/lib/api-client'
import { AccountSidebar } from '@/components/account/AccountSidebar'

const STATUS: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'قيد المراجعة', cls: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  confirmed: { label: 'تم التأكيد',   cls: 'bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400'   },
  shipped:   { label: 'في الشحن',     cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  delivered: { label: 'تم التسليم',   cls: 'bg-green-100  text-green-700  dark:bg-green-900/30  dark:text-green-400'  },
  cancelled: { label: 'ملغي',         cls: 'bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400'    },
}

export default function OrdersPage() {
  const [orders,  setOrders]  = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    ordersApi.list()
      .then(r => setOrders(r.orders))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#f7f5ef] dark:bg-[#0a0a0a] py-8 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#111111] dark:text-[#f5f5f5] mb-6">طلباتي</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar />
          <main className="flex-1">
            {loading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 rounded-[12px] bg-[#e5e7eb] dark:bg-[#2a2a2a] animate-pulse" />)}</div>
            ) : error ? (
              <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-red-200 dark:border-red-800 p-8 text-center text-red-500 text-sm">{error}</div>
            ) : orders.length === 0 ? (
              <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] p-12 text-center">
                <div className="text-5xl mb-4">📦</div>
                <h3 className="font-semibold text-[#111111] dark:text-[#f5f5f5] mb-2">لا توجد طلبات بعد</h3>
                <p className="text-[#6b7280] dark:text-[#a0a0a0] text-sm mb-6">ابدأ التسوق الآن</p>
                <Link href="/ar" className="inline-flex px-6 py-3 rounded-[8px] bg-[#d4a017] text-white font-medium text-sm hover:bg-[#a87400] transition-colors">تصفح المنتجات</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => {
                  const s = STATUS[order.status] ?? { label: order.status, cls: 'bg-gray-100 text-gray-600' }
                  return (
                    <div key={order.id} className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] p-5 hover:border-[#d4a017] transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[#111111] dark:text-[#f5f5f5] text-sm">طلب #{order.id.slice(-8).toUpperCase()}</p>
                          <p className="text-xs text-[#6b7280] dark:text-[#a0a0a0] mt-1">
                            {new Date(order.createdAt).toLocaleDateString('ar-SY', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.cls}`}>{s.label}</span>
                          <span className="font-bold text-[#d4a017] text-sm">{order.total.toLocaleString('ar-SY')} ل.س</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}