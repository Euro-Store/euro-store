import type { DiscountType } from "@/types"
export default function DiscountTypeBadge({ type, value }: { type: DiscountType; value: number }) {
  return type === "PERCENTAGE"
    ? <span className="px-2 py-0.5 text-xs rounded-full bg-[#0284c720] text-[#0284c7]">{value}%</span>
    : <span className="px-2 py-0.5 text-xs rounded-full bg-[#16a34a20] text-[#16a34a]">{value.toLocaleString("ar")} ل.س</span>
}
