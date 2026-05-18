import type { ExchangeStatus } from "@/types"
const MAP: Record<ExchangeStatus,{ label:string; color:string }> = {
  REQUESTED:            { label:"بانتظار المحل",  color:"#f59e0b" },
  CONFIRMED_BY_SHOP:    { label:"استلمه المحل",   color:"#0284c7" },
  PROCESSING:           { label:"جارٍ المعالجة",  color:"#d4a017" },
  COMPLETED:            { label:"مكتمل",          color:"#16a34a" },
  REJECTED:             { label:"مرفوض",          color:"#dc2626" },
}
export default function ExchangeStatusBadge({ status }: { status: ExchangeStatus }) {
  const { label, color } = MAP[status]
  return <span className="px-2 py-0.5 text-xs rounded-full" style={{ background:color+"20", color }}>{label}</span>
}
