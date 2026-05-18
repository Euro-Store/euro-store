"use client"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import type { Customer } from "@/types"
import { api } from "@/lib/api"
import { formatCurrency, formatDate } from "@/lib/utils"

const MOCK: Customer[] = [
  { id:"1", name:"أحمد محمد",  email:"a@a.com", phone:"0901234567", totalOrders:8,  totalSpent:680000, loyaltyPoints:340, createdAt: new Date().toISOString() },
  { id:"2", name:"سارة خالد", email:"s@s.com", phone:"0907654321", totalOrders:14, totalSpent:1250000,loyaltyPoints:625, createdAt: new Date().toISOString() },
]
export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>(MOCK)
  const [q, setQ] = useState("")
  useEffect(()=>{ api.get<{ customers:Customer[] }>("/admin/customers").then(d=>setCustomers(d.customers)).catch(()=>{}) },[])
  const filtered = customers.filter(c => c.name.includes(q)||c.email.includes(q)||c.phone.includes(q))
  return (
    <div className="space-y-4">
      <div className="relative max-w-xs">
        <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666]" />
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="بحث عن عميل..."
          className="w-full pl-4 pr-9 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] placeholder-[#666] outline-none focus:border-[#d4a017]" />
      </div>
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#2a2a2a]">
            {["العميل","الهاتف","الطلبات","الإنفاق الكلي","نقاط الولاء","تاريخ التسجيل"].map(h=>(
              <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(c=>(
              <tr key={c.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition">
                <td className="px-4 py-3">
                  <div className="font-medium text-[#f5f5f5]">{c.name}</div>
                  <div className="text-xs text-[#666]">{c.email}</div>
                </td>
                <td className="px-4 py-3 text-[#a0a0a0]">{c.phone}</td>
                <td className="px-4 py-3 text-[#f5f5f5]">{c.totalOrders}</td>
                <td className="px-4 py-3 text-[#f5f5f5]">{formatCurrency(c.totalSpent)}</td>
                <td className="px-4 py-3"><span className="text-[#f2c94c] font-semibold">{c.loyaltyPoints}</span></td>
                <td className="px-4 py-3 text-xs text-[#666]">{formatDate(c.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
