"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [m, setM] = useState(false)
  useEffect(() => setM(true), [])
  if (!m) return <div style={{ width:36,height:36 }} />
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="تبديل الثيم"
      style={{
        background:"var(--surface)",border:"1px solid var(--border)",
        borderRadius:"8px",width:"36px",height:"36px",
        display:"flex",alignItems:"center",justifyContent:"center",
        cursor:"pointer",color:"var(--text-2)",transition:"all var(--t)",flexShrink:0,
      }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)"}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-2)"}}
    >
      {resolvedTheme==="dark"?<Sun size={16}/>:<Moon size={16}/>}
    </button>
  )
}