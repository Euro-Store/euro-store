import AdminHeader from "@/components/layout/AdminHeader"
import PartnerShopForm from "@/components/partner-shops/PartnerShopForm"
export default function NewPartnerShopPage() {
  return (
    <div>
      <AdminHeader title="إضافة محل شريك" />
      <div className="p-6"><PartnerShopForm /></div>
    </div>
  )
}
