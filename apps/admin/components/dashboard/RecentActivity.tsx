"use client"
import { formatDateTime } from "@/lib/utils"

interface Activity { id: string; type: string; message: string; createdAt: string }

const MOCK: Activity[] = [
  { id:"1", type:"order",    message:"طلب جديد #1042 من أحمد محمد",            createdAt: new Date(Date.now()-3*60000).toISOString() },
  { id:"2", type:"exchange", message:"طلب استبدال #EX-88 تم تأكيده",             createdAt: new Date(Date.now()-15*60000).toISOString() },
  { id:"3", type:"customer", message:"عميل جديد: سارة خالد",                     createdAt: new Date(Date.now()-32*60000).toISOString() },
  { id:"4", type:"review",   message:"اقتراح منتج جديد من هيلبر: حذاء رياضي",   createdAt: new Date(Date.now()-60*60000).toISOString() },
  { id:"5", type:"discount", message:"كود WELCOME20 استُخدم 5 مرات اليوم",       createdAt: new Date(Date.now()-90*60000).toISOString() },
]
const DOT: Record<string,string> = { order:"#d4a017", exchange:"#0284c7", customer:"#16a34a", review:"#f59e0b", discount:"#a87400" }

export default function RecentActivity({ activities = MOCK }: { activities?: Activity[] }) {
  return (
    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4">آخر الأنشطة</h3>
      <div className="space-y-3">
        {activities.map(a => (
          <div key={a.id} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: DOT[a.type]||"#666" }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#f5f5f5] leading-snug">{a.message}</p>
              <p className="text-xs text-[#666] mt-0.5">{formatDateTime(a.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
