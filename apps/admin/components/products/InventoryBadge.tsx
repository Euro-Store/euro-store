export default function InventoryBadge({ stock }: { stock: number }) {
  if (stock === 0) return <span className="px-2 py-0.5 text-xs rounded-full bg-[#dc262620] text-[#dc2626]">نفذ المخزون</span>
  if (stock <= 5)  return <span className="px-2 py-0.5 text-xs rounded-full bg-[#f59e0b20] text-[#f59e0b]">كمية محدودة ({stock})</span>
  return <span className="px-2 py-0.5 text-xs rounded-full bg-[#16a34a20] text-[#16a34a]">متوفر ({stock})</span>
}
