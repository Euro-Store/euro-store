import HelperHeader from "@/components/layout/HelperHeader"
import ExchangeScanner from "@/components/exchanges/ExchangeScanner"
export default function ExchangesPage() {
  return (
    <div>
      <HelperHeader title="طلبات الاستبدال" subtitle="استلام المنتجات وتأكيد الاستبدال" />
      <div className="p-6"><ExchangeScanner /></div>
    </div>
  )
}
