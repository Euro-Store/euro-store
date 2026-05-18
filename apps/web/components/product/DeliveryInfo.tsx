import { Truck, RotateCcw, ShieldCheck } from 'lucide-react'
export default function DeliveryInfo() {
  return (
    <div className="rounded-card border border-light-border dark:border-dark-border p-4 space-y-3">
      {[
        { Icon: Truck,        title:'شحن سريع',          desc:'التوصيل خلال 2–4 أيام عمل' },
        { Icon: RotateCcw,    title:'إرجاع مجاني',       desc:'إرجاع سهل خلال 14 يوم من الاستلام' },
        { Icon: ShieldCheck,  title:'كاش عند الاستلام',  desc:'ادفع عند وصول طلبك — لا مخاطرة' },
      ].map(({ Icon, title, desc }) => (
        <div key={title} className="flex items-start gap-3">
          <Icon size={18} className="text-gold flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-light-text dark:text-dark-text">{title}</p>
            <p className="text-xs text-light-muted dark:text-dark-muted">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}