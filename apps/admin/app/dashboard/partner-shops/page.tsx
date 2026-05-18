import AdminHeader from "@/components/layout/AdminHeader"
import PartnerShopsTable from "@/components/partner-shops/PartnerShopsTable"
export default function PartnerShopsPage() {
  return (
    <div>
      <AdminHeader title="المحلات الشريكة" subtitle="شبكة المحلات المعتمدة للاستبدال والنقاط" />
      <div className="p-6"><PartnerShopsTable /></div>
    </div>
  )
}
