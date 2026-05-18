"use client"
import { useState } from "react"
import { Star, RefreshCw, Download } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

interface Props { qrCode: string; points: number; onRefresh?: () => void }

export default function LoyaltyQRCard({ qrCode, points, onRefresh }: Props) {
  const [spinning, setSpinning] = useState(false)

  async function refresh() {
    setSpinning(true)
    await new Promise(r => setTimeout(r, 700))
    onRefresh?.()
    setSpinning(false)
  }

  return (
    <div className="bg-gradient-to-br from-[#1a1400] via-[#121212] to-[#0a0a0a] border border-[#d4a01730] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#d4a01715] border-b border-[#d4a01725] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star size={15} className="text-[#d4a017]" fill="#d4a017"/>
          <span className="text-sm font-bold text-[#d4a017]">بطاقة الولاء</span>
        </div>
        <button onClick={refresh} disabled={spinning}
          className="p-1.5 rounded-lg text-[#666] hover:text-[#d4a017] transition disabled:opacity-40">
          <RefreshCw size={14} className={spinning ? "animate-spin" : ""}/>
        </button>
      </div>

      {/* Points */}
      <div className="px-5 pt-5 pb-3 text-center">
        <p className="text-5xl font-bold text-[#f2c94c] tabular-nums">{points.toLocaleString("ar")}</p>
        <p className="text-xs text-[#a0a0a0] mt-1">نقطة متاحة</p>
        <p className="text-xs text-[#555] mt-0.5">≈ {(points * 100).toLocaleString("ar")} ل.س خصم</p>
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center pb-5 px-5 gap-3">
        <div className="p-4 bg-white rounded-2xl shadow-lg">
          <QRCodeSVG
            value={qrCode}
            size={160}
            bgColor="#ffffff"
            fgColor="#0a0a0a"
            level="H"
            imageSettings={{
              src: "/logo-qr.png",
              x: undefined,
              y: undefined,
              height: 32,
              width: 32,
              excavate: true,
            }}
          />
        </div>
        <p className="text-xs font-mono text-[#a0a0a0] tracking-wider">{qrCode}</p>
        <p className="text-[11px] text-[#555]">أرِ هذا الرمز للمحاسب عند الشراء من المتجر</p>
      </div>
    </div>
  )
}