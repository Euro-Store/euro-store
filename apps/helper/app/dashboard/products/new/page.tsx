import HelperHeader from "@/components/layout/HelperHeader"
import SubmissionForm from "@/components/products/SubmissionForm"
export default function NewSubmissionPage() {
  return (
    <div>
      <HelperHeader title="اقتراح جديد" subtitle="سيُرسل للأدمن للمراجعة والموافقة" />
      <div className="p-6"><SubmissionForm /></div>
    </div>
  )
}
