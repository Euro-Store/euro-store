"use client"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import type { LoyaltySettings } from "@/types"

const DEFAULTS: LoyaltySettings = { pointsPerUnit:1, unitValue:2000, minRedeemPoints:100, pointsExpireDays:365, maxRedeemPercentage:30 }

export default function LoyaltySettingsForm() {
  const [settings, setSettings] = useState<LoyaltySettings>(DEFAULTS)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)

  useEffect(()=>{ api.get<LoyaltySettings>("/admin/loyalty/settings").then(setSettings).catch(()=>{}) },[])

  const set = (k: keyof LoyaltySettings, v: number) => setSettings(prev=>({ ...prev, [k]:v }))

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    await api.put("/admin/loyalty/settings", settings).catch(()=>{})
    setSaving(false); setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  const row = (label: string, hint: string, key: keyof LoyaltySettings) => (
    <div className="flex items-start justify-between py-4 border-b border-[#1a1a1a]">
      <div>
        <p className="text-sm font-medium text-[#f5f5f5]">{label}</p>
        <p className="text-xs text-[#666] mt-0.5">{hint}</p>
      </div>
      <input type="number" value={settings[key]} onChange={e=>set(key,Number(e.target.value))}
        className="w-28 px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] text-center outline-none focus:border-[#d4a017]" />
    </div>
  )

  return (
    <form onSubmit={handleSave} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 max-w-lg space-y-1">
      {row("نقاط لكل وحدة",   "عدد النقاط مقابل كل وحدة إنفاق",             "pointsPerUnit")}
      {row("قيمة الوحدة (ل.س)","كل X ليرة = 1 وحدة",                         "unitValue")}
      {row("حد الاسترداد الأدنى","أقل عدد نقاط يمكن استخدامها",               "minRedeemPoints")}
      {row("صلاحية النقاط (يوم)","عدد الأيام قبل انتهاء صلاحية النقاط",      "pointsExpireDays")}
      {row("أقصى نسبة خصم (%)","الحد الأقصى لاستخدام النقاط من قيمة الطلب", "maxRedeemPercentage")}
      <div className="pt-4">
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition disabled:opacity-50">
          {saving?"جارٍ الحفظ...":saved?"✓ تم الحفظ":"حفظ الإعدادات"}
        </button>
      </div>
    </form>
  )
}
