import AdminHeader from "@/components/layout/AdminHeader"
import ExchangeTable from "@/components/exchanges/ExchangeTable"
export default function ExchangesPage() {
  return (
    <div>
      <AdminHeader title="طلبات الاستبدال" subtitle="متابعة عمليات الاستبدال عبر المحلات الشريكة" />
      <div className="p-6"><ExchangeTable /></div>
    </div>
  )
}
