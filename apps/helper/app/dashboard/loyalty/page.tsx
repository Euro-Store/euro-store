import HelperHeader from "@/components/layout/HelperHeader"
import LoyaltyEarnForm from "@/components/loyalty/LoyaltyEarnForm"
export default function LoyaltyPage() {
  return (
    <div>
      <HelperHeader title="نقاط الولاء" subtitle="تسجيل مشتريات الزبائن وإضافة النقاط" />
      <div className="p-6"><LoyaltyEarnForm /></div>
    </div>
  )
}
