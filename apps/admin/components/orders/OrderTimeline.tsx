import type { OrderStatus } from "@/types"
const STEPS: { status: OrderStatus; label: string }[] = [
  { status:"PENDING",   label:"استلام الطلب"   },
  { status:"CONFIRMED", label:"تأكيد الطلب"    },
  { status:"SHIPPED",   label:"جارٍ الشحن"      },
  { status:"DELIVERED", label:"تم التسليم"     },
]
export default function OrderTimeline({ currentStatus }: { currentStatus: OrderStatus }) {
  const idx = STEPS.findIndex(s => s.status === currentStatus)
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done = i <= idx && currentStatus !== "CANCELLED"
        return (
          <div key={step.status} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                done ? "bg-[#d4a017] text-[#0a0a0a]" : "bg-[#2a2a2a] text-[#666]"
              }`}>{i+1}</div>
              <span className="text-xs mt-1 text-[#a0a0a0] whitespace-nowrap">{step.label}</span>
            </div>
            {i < STEPS.length-1 && (
              <div className={`w-16 h-0.5 mb-5 mx-1 ${done && i < idx ? "bg-[#d4a017]" : "bg-[#2a2a2a]"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
