import AdminHeader from "@/components/layout/AdminHeader"
import ProductForm from "@/components/products/ProductForm"
export default function NewProductPage() {
  return (
    <div>
      <AdminHeader title="إضافة منتج جديد" />
      <div className="p-6"><ProductForm mode="create" /></div>
    </div>
  )
}
