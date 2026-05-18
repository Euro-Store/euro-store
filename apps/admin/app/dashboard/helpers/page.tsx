import AdminHeader from "@/components/layout/AdminHeader"
import HelpersTable from "@/components/helpers/HelpersTable"
export default function HelpersPage() {
  return (
    <div>
      <AdminHeader title="الهيلبرز" subtitle="إدارة موظفي المحلات الشريكة" />
      <div className="p-6"><HelpersTable /></div>
    </div>
  )
}
