"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Props { data: { day: string; orders: number }[] }

export default function OrdersChart({ data }: Props) {
  return (
    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4">الطلبات اليومية (آخر 7 أيام)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="day" tick={{ fill: "#a0a0a0", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#a0a0a0", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f5f5f5" }}
            formatter={(v: number) => [v, "طلب"]}
          />
          <Bar dataKey="orders" fill="#d4a017" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
