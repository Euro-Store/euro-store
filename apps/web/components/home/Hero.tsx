'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-bl from-dark-base via-[#0f0d08] to-[#1a1208]" />

      {/* Gold Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-10 blur-[120px]"
           style={{ background: 'radial-gradient(circle, #d4a017, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-[100px]"
           style={{ background: 'radial-gradient(circle, #f2c94c, transparent)' }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{ backgroundImage:'linear-gradient(#d4a017 1px,transparent 1px),linear-gradient(90deg,#d4a017 1px,transparent 1px)', backgroundSize:'60px 60px' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 w-full">
        <div className="max-w-2xl animate-fadeUp">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-gold/30 bg-gold/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-sm font-semibold">مجموعة ربيع 2026</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
              style={{ textShadow: '0 0 60px rgba(212,160,23,0.15)' }}>
            اكتشف<br />
            <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage:'linear-gradient(135deg,#d4a017,#f2c94c,#a87400)' }}>
              أناقتك
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            آلاف المنتجات من أفضل الماركات العالمية — بأسعار مناسبة وشحن سريع لباب منزلك.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/ar/women"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-btn font-bold text-white text-base
                         transition-all duration-200 hover:opacity-90 hover:shadow-gold active:scale-[0.98]"
              style={{ background:'linear-gradient(135deg,#d4a017,#a87400)' }}>
              تسوقي الآن
              <ArrowLeft size={18} className="rtl:rotate-180" />
            </Link>
            <Link href="/ar/men"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-btn font-bold text-white text-base
                         border border-white/20 hover:border-gold/50 hover:bg-white/5 transition-all duration-200">
              قسم الرجال
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-14">
            {[['٢٠٠+','براند عالمي'],['١٠٠٪','ضمان الجودة'],['٢–٤','أيام توصيل']].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-black text-gold">{n}</p>
                <p className="text-white/40 text-xs">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-white/30 text-[10px]">اسحب للأسفل</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}
