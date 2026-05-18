"use client"
import { Star } from "lucide-react"

interface Props {
  points: number
  pointValue?: number
  orderTotal: number
  enabled: boolean
  onToggle: (enabled: boolean, discount: number) => void
}

export default function LoyaltyPointsToggle({
  points, pointValue = 100, orderTotal, enabled, onToggle,
}: Props) {
  if (points === 0) return null

  const maxAffordable = Math.floor((orderTotal * 0.5) / pointValue)
  const pointsToUse   = Math.min(points, maxAffordable)
  const discount       = pointsToUse * pointValue

  return (
    <div className={`rounded-xl border p-4 transition-colors ${enabled ? "bg-[#d4a01710] border-[#d4a01740]" : "bg-[#1a1a1a] border-[#2a2a2a]"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${enabled ? "bg-[#d4a01725]" : "bg-[#2a2a2a]"}`}>
            <Star size={17} className={enabled ? "text-[#d4a017]" : "text-[#555]"} fill={enabled ? "#d4a017" : "none"} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#f5f5f5]">نقاط الولاء</p>
            <p className="text-xs text-[#a0a0a0]">
              رصيدك:{" "}
              <span className={enabled ? "text-[#f2c94c] font-bold" : ""}>{points.toLocaleString("ar")}</span> نقطة
            </p>
          </div>
        </div>
        <button
          onClick={() => onToggle(!enabled, enabled ? 0 : discount)}
          className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-[#d4a017]" : "bg-[#2a2a2a]"}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${enabled ? "right-0.5" : "left-0.5"}`} />
        </button>
      </div>
      {enabled && discount > 0 && (
        <div className="mt-3 pt-3 border-t border-[#d4a01730] space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-[#a0a0a0]">نقاط تُستخدم</span>
            <span className="text-[#d4a017]">{pointsToUse.toLocaleString("ar")} نقطة</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#a0a0a0]">خصم النقاط</span>
            <span className="text-[#16a34a] font-semibold">-{discount.toLocaleString("ar")} ل.س</span>
          </div>
          {pointsToUse < points && (
            <p className="text-[10px] text-[#555]">* الحد الأقصى للخصم 50% من قيمة الطلب</p>
          )}
        </div>
      )}
    </div>
  )
}