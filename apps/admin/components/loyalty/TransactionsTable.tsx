"use client"
import { useEffect, useState } from "react"
import type { LoyaltyTransaction } from "@/types"
import { api } from "@/lib/api"
import { formatDateTime } from "@/lib/utils"

const MOCK: LoyaltyTransaction[] = [
  { id:"1", type:"EARN",   points:250, description:"شراء من المحل — فاتورة 500,000 ل.س", customer:{ name:"أحمد محمد", email:"a@a.com" }, createdAt: new Date().toISOString() },
  { id:"2", type:"REDEEM", points:100, description:"استخدام نقاط في طلب #1040",           customer:{ name:"سارة خالد", email:"s@s.com" }, createdAt: new Date(Date.now()-3600000).toISOString() },
  { id:"3", type:"EARN",   points:80,  description:"شراء من المتجر الإلكتروني",            customer:{ name:"محمود علي", email:"m@m.com" }, createdAt: new Date(Date.now()-7200000).toISOString() },
]

export default function TransactionsTable() {
  const [txs, setTxs] = useState<LoyaltyTransaction[]>(MOCK)
  useEffect(()=>{ api.get<{ transactions:LoyaltyTransaction[] }>("/admin/loyalty/transactions").then(d=>setTxs(d.transactions)).catch(()=>{}) },[])
  return (
    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-[#2a2a2a]">
          {["العميل","النوع","النقاط","الوصف","التاريخ"].map(h=>(
            <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {txs.map(t=>(
            <tr key={t.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">
              <td className="px-4 py-3">
                <div className="font-medium text-[#f5f5f5]">{t.customer.name}</div>
                <div className="text-xs text-[#666]">{t.customer.email}</div>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 text-xs rounded-full ${t.type==="EARN" ? "bg-[#16a34a20] text-[#16a34a]" : "bg-[#d4a01720] text-[#d4a017]"}`}>
                  {t.type==="EARN" ? "إضافة" : "استرداد"}
                </span>
              </td>
              <td className="px-4 py-3 font-bold" style={{ color: t.type==="EARN"?"#16a34a":"#d4a017" }}>
                {t.type==="EARN"?"+":"-"}{t.points}
              </td>
              <td className="px-4 py-3 text-[#a0a0a0] text-xs max-w-xs">{t.description}</td>
              <td className="px-4 py-3 text-[#666] text-xs">{formatDateTime(t.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
