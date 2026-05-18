import { trustItems } from '@/lib/design-tokens'

export default function TrustBar() {
  return (
    <section className="bg-light-surface dark:bg-dark-surface border-y border-light-border dark:border-dark-border py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-card bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-sm text-light-text dark:text-dark-text">{item.title}</p>
                <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
