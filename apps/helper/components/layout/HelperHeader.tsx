interface Props { title: string; subtitle?: string }
export default function HelperHeader({ title, subtitle }: Props) {
  return (
    <header className="h-14 bg-[#121212] border-b border-[#2a2a2a] flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        <h1 className="text-base font-bold text-[#f5f5f5]">{title}</h1>
        {subtitle && <p className="text-xs text-[#666]">{subtitle}</p>}
      </div>
      <div className="w-8 h-8 rounded-full bg-[#d4a017] flex items-center justify-center text-[#0a0a0a] font-bold text-sm">H</div>
    </header>
  )
}
