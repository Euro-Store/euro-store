import AdminHeader from "@/components/layout/AdminHeader"
import CustomersTable from "@/components/customers/CustomersTable"
export default function CustomersPage() {
  return (
    <div>
      <AdminHeader title="العملاء" subtitle="إدارة حسابات العملاء ونقاط الولاء" />
      <div className="p-6"><CustomersTable /></div>
    </div>
  )
}
