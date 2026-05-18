"use client"
import { useState, useEffect } from "react"
import { Star, ShoppingBag, Zap, Smartphone } from "lucide-react"
import LoyaltyQRCard from "@/components/account/loyalty/LoyaltyQRCard"
import PointsHistory from "@/components/account/loyalty/PointsHistory"

interface LoyaltyData { points:number; qrCode:string; totalEarned:number; totalRedeemed:number }

const MOCK: LoyaltyData = { points:340, qrCode:"EUR-USR-7A3F9B2C", totalEarned:760, totalRedeemed:420 }

export default function LoyaltyPage() {
  const [data,    setData]    = useState<LoyaltyData>(MOCK)
  const [loading, setLoading] = useState(true)

  function load() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL??"http://localhost:5000/api"}/loyalty/me`,{credentials:"include"})
      .then(r=>r.json()).then(d=>setData(d??MOCK)).catch(()=>setData(MOCK)).finally(()=>setLoading(false))
  }
  useEffect(()=>{ load() },[])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#f5f5f5] flex items-center gap-2">
          <Star size={20} className="text-[#d4a017]" fill="#d4a017"/> نقاط الولاء
        </h1>
        <p className="text-sm text-[#666] mt-0.5">اكسب نقاطاً واستبدلها بخصومات حصرية</p>
      </div>

      {loading
        ? <div className="h-80 bg-[#121212] border border-[#2a2a2a] rounded-2xl animate-pulse"/>
        : <LoyaltyQRCard qrCode={data.qrCode} points={data.points} onRefresh={load}/>}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label:"إجمالي المكتسب",   value:data.totalEarned,    color:"#16a34a" },
          { label:"إجمالي المُستخدم", value:data.totalRedeemed,  color:"#d4a017" },
        ].map(s=>(
          <div key={s.label} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold tabular-nums" style={{color:s.color}}>{s.value.toLocaleString("ar")}</p>
            <p className="text-xs text-[#666] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* How to earn */}
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-[#d4a017] mb-3 flex items-center gap-2"><Zap size={14}/> كيف تكسب نقاطاً؟</h3>
        <div className="space-y-3">
          {[
            { icon:ShoppingBag, color:"#16a34a", t:"الشراء من المتاجر الشريكة", d:"كل 2,000 ل.س = نقطة واحدة — أرِ رمز QR للمحاسب" },
            { icon:Star,        color:"#d4a017",  t:"استخدام نقاطك",              d:"كل نقطة = 100 ل.س خصم عند الشراء أونلاين" },
            { icon:Smartphone,  color:"#0284c7",  t:"للاستخدام في المتجر أيضاً",  d:"أرِ رمز QR آخر للمحاسب لخصم النقاط مباشرةً من الفاتورة" },
          ].map(r=>(
            <div key={r.t} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:r.color+"20"}}>
                <r.icon size={15} style={{color:r.color}}/>
              </div>
              <div>
                <p className="text-sm font-medium text-[#f5f5f5]">{r.t}</p>
                <p className="text-xs text-[#666] leading-relaxed">{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-[#f5f5f5] mb-3">سجل النقاط</h3>
        <PointsHistory/>
      </div>
    </div>
  )
}