import AdminHeader from "@/components/layout/AdminHeader"
import DiscountsTable from "@/components/discounts/DiscountsTable"
export default function DiscountsPage() {
  return (
    <div>
      <AdminHeader title="أكواد الخصم" subtitle="إدارة كوبونات وعروض الخصم" />
      <div className="p-6"><DiscountsTable /></div>
    </div>
  )
}
