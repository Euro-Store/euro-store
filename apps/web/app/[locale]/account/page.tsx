'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { AccountSidebar } from '@/components/account/AccountSidebar'

const QUICK = [
  { href: '/ar/account/orders',    label: 'طلباتي',    desc: 'تتبع وإدارة طلباتك',  icon: '📦' },
  { href: '/ar/account/wishlist',  label: 'المفضلة',   desc: 'المنتجات المحفوظة',    icon: '❤️' },
  { href: '/ar/account/addresses', label: 'العناوين',  desc: 'عناوين التوصيل',        icon: '📍' },
  { href: '/ar/account/settings',  label: 'الإعدادات', desc: 'بيانات وكلمة المرور',  icon: '⚙️' },
]

export default function AccountPage() {
  const { user } = useAuthStore()
  

  return (
    <div className="min-h-screen bg-[#f7f5ef] dark:bg-[#0a0a0a] py-8 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#111111] dark:text-[#f5f5f5] mb-6">حسابي</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar />
          <main className="flex-1">
            <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] p-6 mb-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4a017] to-[#a87400] flex items-center justify-center text-white font-bold text-2xl shrink-0">
                  {user?.name?.charAt(0) ?? 'م'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#111111] dark:text-[#f5f5f5]">أهلاً، {user?.name ?? '...'}</h2>
                  <p className="text-[#6b7280] dark:text-[#a0a0a0] text-sm mt-1" dir="ltr">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {QUICK.map(q => (
                <Link key={q.href} href={q.href}
                  className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] p-5 hover:border-[#d4a017] hover:shadow-sm transition-all group">
                  <div className="text-3xl mb-3">{q.icon}</div>
                  <h3 className="font-semibold text-[#111111] dark:text-[#f5f5f5] group-hover:text-[#d4a017] transition-colors text-sm">{q.label}</h3>
                  <p className="text-xs text-[#6b7280] dark:text-[#a0a0a0] mt-1">{q.desc}</p>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
