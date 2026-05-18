"use client"
import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Star } from "lucide-react"

interface Tx { id:string; type:"EARNED"|"REDEEMED"; points:number; description:string; date:string; balance:number }

const MOCK: Tx[] = [
  { id:"t1", type:"EARNED",   points:85,  description:"شراء من المتجر الشريك", date:new Date(Date.now()-86400000).toISOString(),   balance:340 },
  { id:"t2", type:"REDEEMED", points:100, description:"خصم على طلب #1025",      date:new Date(Date.now()-3*86400000).toISOString(), balance:255 },
  { id:"t3", type:"EARNED",   points:120, description:"شراء من المتجر الشريك", date:new Date(Date.now()-7*86400000).toISOString(), balance:355 },
  { id:"t4", type:"EARNED",   points:235, description:"شراء من المتجر الشريك", date:new Date(Date.now()-14*86400000).toISOString(),balance:235 },
]

export default function PointsHistory() {
  const [txns,    setTxns]    = useState<Tx[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL??"http://localhost:5000/api"}/loyalty/history`,{credentials:"include"})
      .then(r=>r.json()).then(d=>setTxns(d.transactions??MOCK)).catch(()=>setTxns(MOCK)).finally(()=>setLoading(false))
  },[])

  if (loading) return <div className="space-y-2">{[1,2,3].map(i=><div key={i} className="h-14 bg-[#1a1a1a] rounded-xl animate-pulse"/>)}</div>

  if (!txns.length) return (
    <div className="text-center py-8 text-[#555] text-sm">
      <Star size={24} className="mx-auto mb-2 opacity-30"/>لا توجد معاملات بعد
    </div>
  )

  return (
    <div className="divide-y divide-[#1a1a1a]">
      {txns.map(tx=>(
        <div key={tx.id} className="flex items-center gap-3 py-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type==="EARNED"?"bg-[#16a34a15]":"bg-[#d4a01715]"}`}>
            {tx.type==="EARNED"
              ? <TrendingUp  size={15} className="text-[#16a34a]"/>
              : <TrendingDown size={15} className="text-[#d4a017]"/>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#f5f5f5] truncate">{tx.description}</p>
            <p className="text-xs text-[#555]">
              {new Date(tx.date).toLocaleDateString("ar-SY",{month:"short",day:"numeric"})}
              {" · "}الرصيد: {tx.balance.toLocaleString("ar")}
            </p>
          </div>
          <span className={`text-sm font-bold flex-shrink-0 ${tx.type==="EARNED"?"text-[#16a34a]":"text-[#f59e0b]"}`}>
            {tx.type==="EARNED"?"+":"-"}{tx.points}
          </span>
        </div>
      ))}
    </div>
  )
}