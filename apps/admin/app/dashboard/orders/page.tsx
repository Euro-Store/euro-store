import AdminHeader from "@/components/layout/AdminHeader"
import OrdersTable from "@/components/orders/OrdersTable"
export default function OrdersPage() {
  return (
    <div>
      <AdminHeader title="الطلبات" subtitle="إدارة جميع طلبات المتجر" />
      <div className="p-6"><OrdersTable /></div>
    </div>
  )
}
