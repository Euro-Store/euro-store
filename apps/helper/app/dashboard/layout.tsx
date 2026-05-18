import HelperSidebar from "@/components/layout/HelperSidebar"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <HelperSidebar />
      <main className="flex-1 mr-56 min-h-screen overflow-auto">{children}</main>
    </div>
  )
}
