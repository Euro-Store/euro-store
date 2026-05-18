"use client"
import { Star, TrendingUp, Users, Gift } from "lucide-react"

interface Props {
  totalPointsIssued:  number
  totalPointsRedeemed:number
  activeCustomers:    number
  avgPointsPerCustomer: number
}
export default function LoyaltyStats({ totalPointsIssued, totalPointsRedeemed, activeCustomers, avgPointsPerCustomer }: Props) {
  const cards = [
    { label:"إجمالي النقاط المُصدرة",  value: totalPointsIssued.toLocaleString("ar"),   icon:Star,      color:"#d4a017" },
    { label:"النقاط المُستردة",          value: totalPointsRedeemed.toLocaleString("ar"), icon:Gift,      color:"#16a34a" },
    { label:"عملاء النقاط النشطون",     value: activeCustomers.toLocaleString("ar"),      icon:Users,     color:"#0284c7" },
    { label:"متوسط النقاط/عميل",        value: avgPointsPerCustomer.toLocaleString("ar"), icon:TrendingUp,color:"#f59e0b" },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(c=>(
        <div key={c.label} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#a0a0a0]">{c.label}</span>
            <div className="p-2 rounded-lg" style={{ background:c.color+"20" }}>
              <c.icon size={16} style={{ color:c.color }} />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#f5f5f5]">{c.value}</p>
        </div>
      ))}
    </div>
  )
}
