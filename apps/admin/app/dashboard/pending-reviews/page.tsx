import AdminHeader from "@/components/layout/AdminHeader"
import SubmissionsTable from "@/components/helpers/SubmissionsTable"
export default function PendingReviewsPage() {
  return (
    <div>
      <AdminHeader title="اقتراحات الهيلبرز" subtitle="مراجعة طلبات الإضافة والتعديل من الهيلبرز" />
      <div className="p-6"><SubmissionsTable /></div>
    </div>
  )
}
