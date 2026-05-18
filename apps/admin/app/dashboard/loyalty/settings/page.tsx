import AdminHeader from "@/components/layout/AdminHeader"
import LoyaltySettingsForm from "@/components/loyalty/LoyaltySettingsForm"
export default function LoyaltySettingsPage() {
  return (
    <div>
      <AdminHeader title="إعدادات نظام النقاط" subtitle="ضبط معدلات الكسب والاسترداد" />
      <div className="p-6"><LoyaltySettingsForm /></div>
    </div>
  )
}
