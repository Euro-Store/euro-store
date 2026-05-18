import { Star } from 'lucide-react'

const mockReviews = [
  { id:'1', name:'أحمد م.', rating:5, comment:'جودة ممتازة وشكل أنيق جداً. التوصيل كان سريع والتغليف محترم.', date:'2026-04-12', verified:true },
  { id:'2', name:'سارة ك.', rating:4, comment:'المنتج حلو بس المقاس شوي كبير. اقترح تاخذ مقاس أصغر.', date:'2026-03-28', verified:true },
  { id:'3', name:'محمد ع.', rating:5, comment:'طلبت ثاني مرة وما خذلتني. دايماً كويس.', date:'2026-03-15', verified:false },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} className={i <= rating ? 'fill-gold text-gold' : 'text-light-border dark:text-dark-border'} />
      ))}
    </div>
  )
}

export default function ReviewsSection({ productId }: { productId: string }) {
  const avg = mockReviews.reduce((s, r) => s + r.rating, 0) / mockReviews.length
  return (
    <div className="border-t border-light-border dark:border-dark-border pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-light-text dark:text-dark-text">آراء العملاء ({mockReviews.length})</h3>
        <div className="flex items-center gap-2">
          <Stars rating={Math.round(avg)} />
          <span className="text-sm font-bold text-light-text dark:text-dark-text">{avg.toFixed(1)}</span>
        </div>
      </div>
      <div className="space-y-5">
        {mockReviews.map(r => (
          <div key={r.id} className="pb-5 border-b border-light-border dark:border-dark-border last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">{r.name[0]}</div>
                <div>
                  <p className="text-sm font-semibold text-light-text dark:text-dark-text">{r.name}</p>
                  {r.verified && <span className="text-[10px] text-green-600 font-medium">مشتري موثق</span>}
                </div>
              </div>
              <div className="text-left">
                <Stars rating={r.rating} />
                <p className="text-[10px] text-light-muted dark:text-dark-muted mt-0.5">{new Date(r.date).toLocaleDateString('ar-SY')}</p>
              </div>
            </div>
            <p className="text-sm text-light-text dark:text-dark-text leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}