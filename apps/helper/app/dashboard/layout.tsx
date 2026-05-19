import HelperSidebar from "@/components/layout/HelperSidebar"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <HelperSidebar />
      <main className="flex-1 min-h-screen overflow-auto pt-14 md:pt-0 md:mr-56">
        {children}
      </main>
    </div>
  )
}