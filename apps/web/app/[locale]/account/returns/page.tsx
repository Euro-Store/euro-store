import { Package, Clock, ArrowLeftRight } from "lucide-react"
import Link from "next/link"

export default function ReturnsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center py-16 px-4">
      <div className="w-20 h-20 rounded-2xl bg-[#2a2a2a] flex items-center justify-center mb-5">
        <Package size={36} className="text-[#444]" />
      </div>
      <h2 className="text-xl font-bold text-[#f5f5f5] mb-2">خدمة الاسترجاع</h2>
      <div className="flex items-center gap-2 text-[#f59e0b] bg-[#f59e0b10] border border-[#f59e0b30] px-4 py-2 rounded-full text-sm mb-4">
        <Clock size={14} /> تتوفر قريباً
      </div>
      <p className="text-[#666] text-sm max-w-xs leading-relaxed mb-6">
        نعمل على تفعيل خدمة الاسترجاع. في الوقت الحالي يمكنك الاستفادة من خدمة الاستبدال المتاحة.
      </p>
      <Link href="/account/exchange"
        className="flex items-center gap-2 px-5 py-2.5 bg-[#d4a01720] hover:bg-[#d4a01740] border border-[#d4a01740] text-[#d4a017] rounded-xl text-sm font-semibold transition">
        <ArrowLeftRight size={15}/> اذهب إلى الاستبدال
      </Link>
    </div>
  )
}