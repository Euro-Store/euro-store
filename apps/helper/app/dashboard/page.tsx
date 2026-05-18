"use client"
import { useState, useEffect } from "react"
import HelperHeader from "@/components/layout/HelperHeader"
import { Package, ArrowLeftRight, Star, ClipboardList, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

interface Stats { pendingExchanges:number; lowStockProducts:number; pointsAwardedToday:number; pendingSubmissions:number }
const MOCK: Stats = { pendingExchanges:3, lowStockProducts:7, pointsAwardedToday:1240, pendingSubmissions:2 }

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>(MOCK)
  useEffect(()=>{ api.get<Stats>("/helper/stats").then(setStats).catch(()=>{}) },[])

  const cards = [
    { label:"استبدال معلّق",   value:stats.pendingExchanges,  icon:ArrowLeftRight, color:"#f59e0b", href:"/dashboard/exchanges", urgent:stats.pendingExchanges>0 },
    { label:"مخزون منخفض",    value:stats.lowStockProducts,   icon:AlertTriangle,  color:"#dc2626", href:"/dashboard/inventory", urgent:stats.lowStockProducts>0 },
    { label:"نقاط اليوم",      value:stats.pointsAwardedToday, icon:Star,           color:"#d4a017", href:"/dashboard/loyalty",   urgent:false },
    { label:"اقتراحات معلّقة", value:stats.pendingSubmissions, icon:ClipboardList,  color:"#0284c7", href:"/dashboard/products",  urgent:false },
  ]

  return (
    <div>
      <HelperHeader title="الرئيسية" subtitle="لوحة التحكم الخاصة بك" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {cards.map(c=>(
            <Link key={c.label} href={c.href}
              className={`bg-[#121212] border rounded-xl p-5 block transition hover:border-[#d4a017] ${c.urgent?"border-[#d4a01740]":"border-[#2a2a2a]"}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#a0a0a0]">{c.label}</span>
                <div className="p-2 rounded-lg" style={{ background:c.color+"20" }}>
                  <c.icon size={16} style={{ color:c.color }} />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#f5f5f5]">{c.value.toLocaleString("ar")}</p>
              {c.urgent && c.value>0 && <p className="text-xs mt-1" style={{ color:c.color }}>← اضغط للمعالجة</p>}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[#d4a017] mb-4">الإجراءات السريعة</h3>
            <div className="space-y-2">
              {[
                { href:"/dashboard/loyalty",      icon:Star,           color:"#d4a017", title:"إضافة نقاط لزبون",      sub:"أدخل رمز QR وقيمة الفاتورة" },
                { href:"/dashboard/exchanges",    icon:ArrowLeftRight, color:"#f59e0b", title:"تأكيد استلام استبدال",   sub:"مسح QR وتأكيد حالة المنتج" },
                { href:"/dashboard/inventory",    icon:Package,        color:"#16a34a", title:"تحديث المخزون",          sub:"تعديل كميات المنتجات" },
                { href:"/dashboard/products/new", icon:ClipboardList,  color:"#0284c7", title:"اقتراح منتج جديد",       sub:"سيُرسل للأدمن للمراجعة" },
              ].map(a=>(
                <Link key={a.href} href={a.href}
                  className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg transition">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:a.color+"20" }}>
                    <a.icon size={14} style={{ color:a.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f5f5f5]">{a.title}</p>
                    <p className="text-xs text-[#666]">{a.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[#d4a017] mb-4">تذكير بالمهام</h3>
            <div className="space-y-3">
              {[
                { color:"#f59e0b", title:"راجع طلبات الاستبدال المعلّقة", sub:"الزبائن ينتظرون تأكيدك" },
                { color:"#d4a017", title:"حدّث مخزون المنتجات يومياً",    sub:"دقة المخزون تحسّن تجربة الزبون" },
                { color:"#16a34a", title:"لا تنسَ تسجيل نقاط الزبائن",   sub:"سجّل قيمة الفاتورة بعد كل شراء" },
              ].map((r,i)=>(
                <div key={i} className="flex gap-3 p-3 rounded-lg" style={{ background:r.color+"10", border:`1px solid ${r.color}20` }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background:r.color }} />
                  <div>
                    <p className="text-sm text-[#f5f5f5]">{r.title}</p>
                    <p className="text-xs text-[#666]">{r.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
