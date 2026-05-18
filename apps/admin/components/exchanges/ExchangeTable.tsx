"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye } from "lucide-react"
import ExchangeStatusBadge from "./ExchangeStatusBadge"
import type { Exchange } from "@/types"
import { api } from "@/lib/api"
import { formatDateTime } from "@/lib/utils"

const MOCK: Exchange[] = [
  { id:"1", orderNumber:"1030", status:"REQUESTED", qrCode:"QR-001", customer:{ name:"أحمد محمد", phone:"09001" }, items:[{ name:"بنطلون أزرق", size:"L" }], createdAt: new Date().toISOString() },
  { id:"2", orderNumber:"1025", status:"COMPLETED", qrCode:"QR-002", customer:{ name:"سارة خالد", phone:"09002" }, items:[{ name:"فستان منقوش", size:"M" }], partnerShop:"محل النور", createdAt: new Date(Date.now()-86400000).toISOString() },
]

export default function ExchangeTable() {
  const [exchanges, setExchanges] = useState<Exchange[]>(MOCK)
  useEffect(()=>{ api.get<{ exchanges:Exchange[] }>("/admin/exchanges").then(d=>setExchanges(d.exchanges)).catch(()=>{}) },[])
  return (
    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-[#2a2a2a]">
          {["رقم الطلب","العميل","المنتجات","الحالة","المحل","التاريخ","تفاصيل"].map(h=>(
            <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {exchanges.map(e=>(
            <tr key={e.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition">
              <td className="px-4 py-3 font-mono text-[#d4a017]">#{e.orderNumber}</td>
              <td className="px-4 py-3">
                <div className="font-medium text-[#f5f5f5]">{e.customer.name}</div>
                <div className="text-xs text-[#666]">{e.customer.phone}</div>
              </td>
              <td className="px-4 py-3 text-[#a0a0a0] text-xs">{e.items.map(i=>i.name).join("، ")}</td>
              <td className="px-4 py-3"><ExchangeStatusBadge status={e.status} /></td>
              <td className="px-4 py-3 text-[#666] text-xs">{e.partnerShop||"—"}</td>
              <td className="px-4 py-3 text-[#666] text-xs">{formatDateTime(e.createdAt)}</td>
              <td className="px-4 py-3">
                <Link href={`/dashboard/exchanges/${e.id}`} className="p-1.5 rounded hover:bg-[#2a2a2a] text-[#a0a0a0] hover:text-[#d4a017] transition inline-flex">
                  <Eye size={14}/>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
