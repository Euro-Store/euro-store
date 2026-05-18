"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, Search } from "lucide-react"
import OrderStatusBadge from "./OrderStatusBadge"
import type { Order, OrderStatus } from "@/types"
import { api } from "@/lib/api"
import { formatCurrency, formatDateTime } from "@/lib/utils"

const MOCK: Order[] = [
  { id:"1", orderNumber:"1042", status:"PENDING",   total:205000, customer:{ name:"أحمد محمد", email:"a@a.com", phone:"09001" }, items:[], address:"دمشق", createdAt: new Date().toISOString() },
  { id:"2", orderNumber:"1041", status:"DELIVERED", total:95000,  customer:{ name:"سارة خالد", email:"s@s.com", phone:"09002" }, items:[], address:"حلب",  createdAt: new Date(Date.now()-86400000).toISOString() },
  { id:"3", orderNumber:"1040", status:"SHIPPED",   total:150000, customer:{ name:"محمود علي", email:"m@m.com", phone:"09003" }, items:[], address:"حمص",  createdAt: new Date(Date.now()-2*86400000).toISOString() },
]
const STATUSES: { value: string; label: string }[] = [
  { value:"ALL", label:"الكل" }, { value:"PENDING", label:"معلّقة" }, { value:"CONFIRMED", label:"مؤكدة" },
  { value:"SHIPPED", label:"مشحونة" }, { value:"DELIVERED", label:"مسلّمة" }, { value:"CANCELLED", label:"ملغاة" },
]

export default function OrdersTable() {
  const [orders, setOrders]   = useState<Order[]>(MOCK)
  const [q, setQ]             = useState("")
  const [filter, setFilter]   = useState("ALL")

  useEffect(() => {
    api.get<{ orders: Order[] }>("/admin/orders").then(d => setOrders(d.orders)).catch(()=>{})
  }, [])

  async function updateStatus(id: string, status: OrderStatus) {
    await api.patch(`/admin/orders/${id}/status`, { status }).catch(()=>{})
    setOrders(prev => prev.map(o => o.id===id ? { ...o, status } : o))
  }

  const filtered = orders.filter(o => {
    const matchQ = !q || o.orderNumber.includes(q) || o.customer.name.includes(q)
    const matchF = filter === "ALL" || o.status === filter
    return matchQ && matchF
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="رقم الطلب أو اسم العميل..."
            className="pl-4 pr-9 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] placeholder-[#666] outline-none focus:border-[#d4a017] w-60" />
        </div>
        <div className="flex gap-1">
          {STATUSES.map(s => (
            <button key={s.value} onClick={()=>setFilter(s.value)}
              className={`px-3 py-1.5 text-xs rounded-lg transition ${filter===s.value ? "bg-[#d4a017] text-[#0a0a0a] font-semibold" : "bg-[#1a1a1a] text-[#a0a0a0] hover:bg-[#2a2a2a]"}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#2a2a2a]">
            {["رقم الطلب","العميل","الإجمالي","الحالة","تاريخ الطلب","إجراءات"].map(h=>(
              <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition">
                <td className="px-4 py-3 font-mono text-[#d4a017]">#{o.orderNumber}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-[#f5f5f5]">{o.customer.name}</div>
                  <div className="text-xs text-[#666]">{o.customer.phone}</div>
                </td>
                <td className="px-4 py-3 text-[#f5f5f5]">{formatCurrency(o.total)}</td>
                <td className="px-4 py-3"><OrderStatusBadge status={o.status} /></td>
                <td className="px-4 py-3 text-[#666] text-xs">{formatDateTime(o.createdAt)}</td>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/orders/${o.id}`} className="p-1.5 rounded hover:bg-[#2a2a2a] text-[#a0a0a0] hover:text-[#d4a017] transition inline-flex">
                    <Eye size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
