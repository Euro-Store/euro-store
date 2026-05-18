import HelperHeader from "@/components/layout/HelperHeader"
import InventoryTable from "@/components/inventory/InventoryTable"
export default function InventoryPage() {
  return (
    <div>
      <HelperHeader title="المخزون" subtitle="تحديث كميات المنتجات" />
      <div className="p-6"><InventoryTable /></div>
    </div>
  )
}
