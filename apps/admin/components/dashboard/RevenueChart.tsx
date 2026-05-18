"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Props { data: { month: string; revenue: number }[] }

export default function RevenueChart({ data }: Props) {
  return (
    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4">الإيرادات الشهرية</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="month" tick={{ fill: "#a0a0a0", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#a0a0a0", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f5f5f5" }}
            formatter={(v: number) => [v.toLocaleString("ar") + " ل.س", "الإيرادات"]}
          />
          <Line type="monotone" dataKey="revenue" stroke="#d4a017" strokeWidth={2} dot={{ fill: "#d4a017", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
