'use client'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/lib/api-client'
import { AccountSidebar } from '@/components/account/AccountSidebar'

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore()
  const [name,  setName]  = useState(user?.name  ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [profileMsg,  setProfileMsg]  = useState<string | null>(null)
  const [profileSave, setProfileSave] = useState(false)
  const [pwd,      setPwd]      = useState({ current: '', next: '', confirm: '' })
  const [pwdMsg,   setPwdMsg]   = useState<string | null>(null)
  const [pwdError, setPwdError] = useState<string | null>(null)
  const [pwdSave,  setPwdSave]  = useState(false)

  const flash = (fn: (v: string | null) => void, msg: string) => { fn(msg); setTimeout(() => fn(null), 3500) }

  const handleProfile = async (e: React.FormEvent) => {
    e.preventDefault(); setProfileSave(true)
    try { updateUser({ name, phone }); flash(setProfileMsg, '✓ تم حفظ التغييرات') }
    catch (err: unknown) { flash(setProfileMsg, err instanceof Error ? err.message : 'حدث خطأ') }
    finally { setProfileSave(false) }
  }

  const handlePwd = async (e: React.FormEvent) => {
    e.preventDefault(); setPwdError(null); setPwdMsg(null)
    if (pwd.next !== pwd.confirm) { setPwdError('كلمتا المرور غير متطابقتين'); return }
    setPwdSave(true)
    try {
      await authApi.changePassword({ currentPassword: pwd.current, newPassword: pwd.next })
      flash(setPwdMsg, '✓ تم تغيير كلمة المرور')
      setPwd({ current: '', next: '', confirm: '' })
    }
    catch (err: unknown) { setPwdError(err instanceof Error ? err.message : 'حدث خطأ') }
    finally { setPwdSave(false) }
  }

  const inp = 'w-full px-4 py-3 rounded-[8px] bg-[#f7f5ef] dark:bg-[#1a1a1a] border border-[#e5e7eb] dark:border-[#2a2a2a] text-[#111111] dark:text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40 focus:border-[#d4a017] transition-all text-sm'
  const dis = 'w-full px-4 py-3 rounded-[8px] bg-[#f0ede4] dark:bg-[#2a2a2a] border border-[#e5e7eb] dark:border-[#2a2a2a] text-[#9ca3af] text-sm cursor-not-allowed'

  return (
    <div className="min-h-screen bg-[#f7f5ef] dark:bg-[#0a0a0a] py-8 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#111111] dark:text-[#f5f5f5] mb-6">الإعدادات</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar />
          <main className="flex-1 space-y-5">
            <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] p-6">
              <h2 className="font-semibold text-[#111111] dark:text-[#f5f5f5] mb-5 text-sm">البيانات الشخصية</h2>
              <form onSubmit={handleProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#111111] dark:text-[#f5f5f5] mb-2">الاسم الكامل</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className={inp} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] dark:text-[#f5f5f5] mb-2">البريد الإلكتروني</label>
                  <input type="email" value={user?.email ?? ''} disabled dir="ltr" className={dis} />
                  <p className="mt-1 text-xs text-[#9ca3af]">لا يمكن تغيير البريد الإلكتروني</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] dark:text-[#f5f5f5] mb-2">رقم الهاتف</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} dir="ltr" className={inp} />
                </div>
                <div className="flex items-center gap-3">
                  <button type="submit" disabled={profileSave}
                    className="px-6 py-2.5 rounded-[8px] bg-[#d4a017] hover:bg-[#a87400] text-white text-sm font-medium transition-colors disabled:opacity-50">
                    {profileSave ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                  </button>
                  {profileMsg && <span className="text-sm text-green-600 dark:text-green-400">{profileMsg}</span>}
                </div>
              </form>
            </div>
            <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] p-6">
              <h2 className="font-semibold text-[#111111] dark:text-[#f5f5f5] mb-5 text-sm">تغيير كلمة المرور</h2>
              <form onSubmit={handlePwd} className="space-y-4">
                {[
                  { k:'current', label:'كلمة المرور الحالية'          },
                  { k:'next',    label:'كلمة المرور الجديدة'           },
                  { k:'confirm', label:'تأكيد كلمة المرور الجديدة'    },
                ].map(f => (
                  <div key={f.k}>
                    <label className="block text-sm font-medium text-[#111111] dark:text-[#f5f5f5] mb-2">{f.label}</label>
                    <input type="password" dir="ltr"
                      value={(pwd as Record<string,string>)[f.k]}
                      onChange={e => setPwd(p => ({ ...p, [f.k]: e.target.value }))}
                      className={inp} />
                  </div>
                ))}
                {pwdError && <p className="text-sm text-red-500">{pwdError}</p>}
                <div className="flex items-center gap-3">
                  <button type="submit" disabled={pwdSave || !pwd.current || !pwd.next || !pwd.confirm}
                    className="px-6 py-2.5 rounded-[8px] bg-[#d4a017] hover:bg-[#a87400] text-white text-sm font-medium transition-colors disabled:opacity-50">
                    {pwdSave ? 'جارٍ التغيير...' : 'تغيير كلمة المرور'}
                  </button>
                  {pwdMsg && <span className="text-sm text-green-600 dark:text-green-400">{pwdMsg}</span>}
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}