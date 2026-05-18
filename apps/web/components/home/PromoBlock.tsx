import Link from 'next/link'

export default function PromoBlock() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Big Promo */}
        <div className="relative overflow-hidden rounded-card p-8 md:p-10 min-h-[220px] flex flex-col justify-end"
             style={{ background: 'linear-gradient(135deg, #0f0d08 60%, #1a1208 100%)' }}>
          <div className="absolute inset-0 opacity-20"
               style={{ background: 'radial-gradient(circle at 70% 50%, #d4a017, transparent 60%)' }} />
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-pill bg-gold/20 text-gold text-xs font-bold mb-3 border border-gold/30">
              تخفيضات الموسم
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              خصم حتى<br />
              <span className="text-gold">50٪</span> على الملابس
            </h3>
            <Link href="/ar/sale"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn font-bold text-sm text-white
                         border border-white/20 hover:bg-white/10 transition-all">
              تسوق الآن
            </Link>
          </div>
        </div>

        {/* Two mini promos */}
        <div className="flex flex-col gap-5">
          {[
            { label:'وصل حديثاً', title:'مجموعة الأحذية الصيفية', color:'from-[#0a1628] to-[#0f1f3d]', href:'/ar/shoes/summer' },
            { label:'عروض خاصة',  title:'أكسسوار بأسعار مذهلة',  color:'from-[#140a1a] to-[#1f0d28]', href:'/ar/accessories' },
          ].map((card) => (
            <div key={card.title}
              className={`relative overflow-hidden rounded-card p-6 flex-1 min-h-[95px] flex flex-col justify-center bg-gradient-to-l ${card.color}`}>
              <div className="absolute inset-0 opacity-15"
                   style={{ background:'radial-gradient(circle at 80% 50%, #d4a017, transparent 60%)' }} />
              <div className="relative z-10">
                <span className="text-gold text-xs font-bold uppercase tracking-widest">{card.label}</span>
                <p className="text-white font-bold mt-1">{card.title}</p>
                <Link href={card.href} className="text-gold/70 hover:text-gold text-xs font-semibold mt-2 inline-block transition-colors">
                  اكتشف المزيد ←
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
