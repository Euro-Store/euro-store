import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Euro Store — Admin",
  description: "لوحة إدارة Euro Store",
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#0a0a0a] text-[#f5f5f5] font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
