import AdminHeader from "@/components/layout/AdminHeader"
export default function DiscountDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <AdminHeader title={`كود الخصم #${params.id}`} />
      <div className="p-6 text-[#666]">سيتم عرض تفاصيل الكود هنا.</div>
    </div>
  )
}
