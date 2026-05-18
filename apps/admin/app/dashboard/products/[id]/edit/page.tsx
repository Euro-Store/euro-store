import AdminHeader from "@/components/layout/AdminHeader"
import ProductForm from "@/components/products/ProductForm"
export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <AdminHeader title="تعديل المنتج" />
      <div className="p-6"><ProductForm mode="edit" productId={params.id} /></div>
    </div>
  )
}
