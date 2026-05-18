"use client"
import { useState, useEffect } from "react"
import AdminHeader from "@/components/layout/AdminHeader"
import RevenueChart from "@/components/dashboard/RevenueChart"
import OrdersChart from "@/components/dashboard/OrdersChart"
import { api } from "@/lib/api"

const MOCK_REVENUE = [
  { month:"يناير",revenue:800000},{ month:"فبراير",revenue:950000},{ month:"مارس",revenue:1100000},
  { month:"أبريل",revenue:1050000},{ month:"مايو",revenue:1300000},{ month:"يونيو",revenue:1200000},{ month:"يوليو",revenue:1500000},
]
const MOCK_ORDERS = [
  { day:"الأحد",orders:45},{ day:"الاثنين",orders:62},{ day:"الثلاثاء",orders:38},
  { day:"الأربعاء",orders:71},{ day:"الخميس",orders:55},{ day:"الجمعة",orders:83},{ day:"السبت",orders:49},
]
const METRICS = [
  { label:"معدل التحويل",        value:"3.2%",      sub:"من الزيارة للشراء" },
  { label:"متوسط قيمة الطلب",   value:"127,000 ل.س",sub:"هذا الشهر" },
  { label:"معدل التخلي عن السلة",value:"68%",       sub:"تحتاج تحسين" },
  { label:"العملاء العائدون",    value:"42%",        sub:"من إجمالي المشترين" },
]

export default function AnalyticsPage() {
  const [revenue, setRevenue] = useState(MOCK_REVENUE)
  const [orders,  setOrders]  = useState(MOCK_ORDERS)
  useEffect(()=>{ api.get<any>("/admin/analytics").then(d=>{ if(d.revenue)setRevenue(d.revenue); if(d.orders)setOrders(d.orders) }).catch(()=>{}) },[])
  return (
    <div>
      <AdminHeader title="التحليلات" subtitle="تقارير الأداء والمبيعات" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map(m=>(
            <div key={m.label} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-4">
              <p className="text-xs text-[#a0a0a0] mb-1">{m.label}</p>
              <p className="text-2xl font-bold text-[#d4a017]">{m.value}</p>
              <p className="text-xs text-[#666] mt-1">{m.sub}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <RevenueChart data={revenue}/>
          <OrdersChart  data={orders}/>
        </div>
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#d4a017] mb-3">أكثر المنتجات مبيعاً</h3>
          {[{ name:"بنطلون كلاسيكي أزرق",sales:84,revenue:7140000},{ name:"فستان صيفي منقوش",sales:62,revenue:5890000},{ name:"حذاء رياضي أبيض",sales:51,revenue:7650000}].map((p,i)=>(
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#1a1a1a] last:border-0">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center text-xs text-[#666]">{i+1}</span>
                <span className="text-sm text-[#f5f5f5]">{p.name}</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-[#d4a017]">{p.revenue.toLocaleString("ar")} ل.س</div>
                <div className="text-xs text-[#666]">{p.sales} مبيع</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
