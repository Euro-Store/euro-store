import AdminHeader from "@/components/layout/AdminHeader"
import TransactionsTable from "@/components/loyalty/TransactionsTable"
export default function LoyaltyTransactionsPage() {
  return (
    <div>
      <AdminHeader title="سجل معاملات النقاط" subtitle="كل عمليات الإضافة والاسترداد" />
      <div className="p-6"><TransactionsTable /></div>
    </div>
  )
}
