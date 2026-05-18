import AdminHeader from "@/components/layout/AdminHeader"
import ReturnsTable from "@/components/returns/ReturnsTable"
export default function ReturnsPage() {
  return (
    <div>
      <AdminHeader title="طلبات الاسترجاع" subtitle="ستُتاح هذه الخدمة قريباً" />
      <div className="p-6"><ReturnsTable /></div>
    </div>
  )
}
