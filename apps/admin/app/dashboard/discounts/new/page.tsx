import AdminHeader from "@/components/layout/AdminHeader"
import DiscountForm from "@/components/discounts/DiscountForm"
export default function NewDiscountPage() {
  return (
    <div>
      <AdminHeader title="كود خصم جديد" subtitle="إنشاء كوبون خصم جديد" />
      <div className="p-6"><DiscountForm /></div>
    </div>
  )
}
