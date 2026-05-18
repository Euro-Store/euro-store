import Hero            from '@/components/home/Hero'
import CategoryStrip   from '@/components/home/CategoryStrip'
import TrustBar        from '@/components/home/TrustBar'
import TrendingSection from '@/components/home/TrendingSection'
import PromoBlock      from '@/components/home/PromoBlock'
import NewArrivals     from '@/components/home/NewArrivals'
import BrandHighlights from '@/components/home/BrandHighlights'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <TrustBar />
      <TrendingSection />
      <PromoBlock />
      <NewArrivals />
      <BrandHighlights />
    </>
  )
}
