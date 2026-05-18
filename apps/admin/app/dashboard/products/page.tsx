import AdminHeader from "@/components/layout/AdminHeader"
import ProductsTable from "@/components/products/ProductsTable"
export default function ProductsPage() {
  return (
    <div>
      <AdminHeader title="المنتجات" subtitle="إدارة كامل المنتجات والمخزون" />
      <div className="p-6"><ProductsTable /></div>
    </div>
  )
}
