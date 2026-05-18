import AdminSidebar from "@/components/layout/AdminSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <AdminSidebar />
      <main className="flex-1 mr-60 min-h-screen overflow-auto">
        {children}
      </main>
    </div>
  )
}
