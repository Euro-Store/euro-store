"use client"
import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Clock } from "lucide-react"

type Exchange = {
  id: string
  status: string
  updatedAt: string
  rejectionReason?: string
  order: { user: { name: string } }
}

export default function HistoryPage() {
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/partner/history")
      .then(r => r.json())
      .then(d => setExchanges(d.exchanges ?? []))
      .finally(() => setLoading(false))
  }, [])

  const statusConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
    CONFIRMED_BY_PARTNER: { icon: <CheckCircle size={18} />, label: "تم التأكيد", color: "text-green-600 bg-green-50" },
    REJECTED: { icon: <XCircle size={18} />, label: "مرفوض", color: "text-red-500 bg-red-50" },
    REQUESTED: { icon: <Clock size={18} />, label: "قيد الانتظار", color: "text-yellow-600 bg-yellow-50" }
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">سجل اليوم</h1>
        <p className="text-gray-500 text-sm mt-1">{exchanges.length} طلب تمت معالجته</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-gray-100 rounded-xl h-20 animate-pulse" />)}
        </div>
      ) : exchanges.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Clock size={48} className="mx-auto mb-3 opacity-30" />
          <p>لا توجد طلبات اليوم بعد</p>
        </div>
      ) : (
        <div className="space-y-3">
          {exchanges.map(ex => {
            const cfg = statusConfig[ex.status] ?? { icon: null, label: ex.status, color: "text-gray-500 bg-gray-50" }
            const time = new Date(ex.updatedAt).toLocaleTimeString("ar-SY", { hour: "2-digit", minute: "2-digit" })
            return (
              <div key={ex.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{ex.order.user.name?.split(" ")[0] ?? "زبون"}</p>
                    {ex.rejectionReason && <p className="text-xs text-gray-400 mt-0.5">{ex.rejectionReason}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.color}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                    <span className="text-xs text-gray-400">{time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}