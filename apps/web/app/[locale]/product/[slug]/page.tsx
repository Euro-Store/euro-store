'use client'
import { useState } from 'react'
import { Heart, ShoppingBag, Share2 } from 'lucide-react'
import Gallery         from '@/components/product/Gallery'
import VariantPicker   from '@/components/product/VariantPicker'
import DeliveryInfo    from '@/components/product/DeliveryInfo'
import ReviewsSection  from '@/components/product/ReviewsSection'
import RelatedProducts from '@/components/product/RelatedProducts'
import Accordion       from '@/components/shared/Accordion'
import Breadcrumb      from '@/components/shared/Breadcrumb'
import { mockProducts } from '@/lib/design-tokens'
import { useParams }   from 'next/navigation'

const mockImages = [
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
  'https://images.unsplash.com/photo-1598030473778-3b6a547e7e9c?w=600&q=80',
]
const mockSizes  = ['XS','S','M','L','XL','XXL'].map(s => ({ label:s, available: s !== 'XS' }))
const mockColors = [
  { label:'أبيض', hex:'#ffffff', available:true  },
  { label:'أسود', hex:'#000000', available:true  },
  { label:'بيج',  hex:'#d4b896', available:true  },
  { label:'كحلي', hex:'#1e3a5f', available:false },
]

export default function ProductDetailPage() {
  const params  = useParams()
  const slug    = params?.slug as string
  const product = (mockProducts as unknown as any[]).find(p => p.id === slug) ?? (mockProducts as unknown as any[])[0]
  const [wishlisted,  setWishlisted]  = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const f = (n: number) => n.toLocaleString('ar-SY') + ' ل.س'

  function handleAdd() { setAddedToCart(true); setTimeout(() => setAddedToCart(false), 2000) }

  const catLabel = { men:'رجالي', women:'نسائي', kids:'أطفال', shoes:'أحذية', bags:'شنط', accessories:'إكسسوار' }
  const crumbs = [
    { label:'الرئيسية', href:'/ar' },
    { label: (catLabel as any)[product.category] ?? product.category, href:`/ar/${product.category}` },
    { label: product.name },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <Breadcrumb items={crumbs} />
      <div className="mt-6 grid md:grid-cols-2 gap-8 lg:gap-12">
        <Gallery images={mockImages} name={product.name} />
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gold uppercase tracking-widest">{product.brand}</span>
            {product.isNew && <span className="px-2 py-0.5 rounded-pill bg-dark-base text-white text-[10px] font-bold">جديد</span>}
            {product.discount > 0 && <span className="px-2 py-0.5 rounded-pill bg-gold text-white text-[10px] font-bold">-{product.discount}٪</span>}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-light-text dark:text-dark-text leading-tight">{product.name}</h1>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-light-text dark:text-dark-text">{f(product.price)}</span>
            {product.originalPrice > 0 && (
              <>
                <span className="text-base text-light-muted dark:text-dark-muted line-through">{f(product.originalPrice)}</span>
                <span className="text-sm font-bold text-green-600">وفر {f(product.originalPrice - product.price)}</span>
              </>
            )}
          </div>
          <VariantPicker sizes={mockSizes} colors={mockColors} />
          <div className="flex gap-3">
            <button onClick={handleAdd}
              className="flex-1 h-12 rounded-btn font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background:'linear-gradient(135deg,#d4a017,#a87400)' }}>
              <ShoppingBag size={18} />
              {addedToCart ? 'تمت الإضافة ✓' : 'أضف للسلة'}
            </button>
            <button onClick={() => setWishlisted(!wishlisted)}
              className={`w-12 h-12 rounded-btn border flex items-center justify-center transition-all
                ${wishlisted ? 'border-gold bg-gold/10 text-gold' : 'border-light-border dark:border-dark-border text-light-muted hover:border-gold hover:text-gold'}`}>
              <Heart size={18} className={wishlisted ? 'fill-gold' : ''} />
            </button>
            <button className="w-12 h-12 rounded-btn border border-light-border dark:border-dark-border flex items-center justify-center text-light-muted hover:border-gold hover:text-gold transition-all">
              <Share2 size={18} />
            </button>
          </div>
          <DeliveryInfo />
          <div className="border-t border-light-border dark:border-dark-border">
            <Accordion title="تفاصيل المنتج" defaultOpen>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>قطن مصري 100٪ — جودة عالية</li>
                <li>مقاومة للتقلص بعد الغسيل</li>
                <li>مناسب للارتداء اليومي والأنيق</li>
              </ul>
            </Accordion>
            <Accordion title="مواد العناية">
              <p>اغسل بماء بارد — لا تجفف بالمجفف — كوي على حرارة منخفضة</p>
            </Accordion>
            <Accordion title="الشحن والإرجاع">
              <p>التوصيل 2–4 أيام عمل. الإرجاع خلال 14 يوم من الاستلام بدون رسوم.</p>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="mt-16"><ReviewsSection productId={product.id} /></div>
      <div className="mt-8"><RelatedProducts currentId={product.id} category={product.category} /></div>
    </div>
  )
}
