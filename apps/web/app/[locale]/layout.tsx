import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Euro Store',
  description: 'منصة أزياء رقمية',
}

const locales = ['ar', 'en']

// سكريبت صغير يُشغَّل قبل الـ render لتطبيق الثيم فوراً (يمنع الوميض)
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('euro-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (t === 'dark' || (!t && prefersDark)) {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })();
`

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(params.locale)) notFound()

  const isRTL = params.locale === 'ar'

  return (
    <html lang={params.locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* يمنع وميض الثيم عند التحميل */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-[#f7f5ef] dark:bg-[#0a0a0a] text-[#111111] dark:text-[#f5f5f5] font-sans antialiased min-h-screen">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}