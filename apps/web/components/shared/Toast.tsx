'use client'
import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface ToastMsg { id: string; type: ToastType; message: string }

let addToastFn: ((msg: Omit<ToastMsg, 'id'>) => void) | null = null
export const toast = {
  success: (m: string) => addToastFn?.({ type:'success', message:m }),
  error:   (m: string) => addToastFn?.({ type:'error',   message:m }),
  info:    (m: string) => addToastFn?.({ type:'info',    message:m }),
}

const icons = { success: CheckCircle, error: AlertCircle, info: Info }
const colors = {
  success: 'border-green-600 bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200',
  error:   'border-red-600   bg-red-50   dark:bg-red-950   text-red-800   dark:text-red-200',
  info:    'border-gold      bg-gold/10  text-light-text   dark:text-dark-text',
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<ToastMsg[]>([])

  useEffect(() => {
    addToastFn = (msg) => {
      const id = Math.random().toString(36).slice(2)
      setToasts(p => [...p, { ...msg, id }])
      setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
    }
    return () => { addToastFn = null }
  }, [])

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-[100] flex flex-col gap-2 w-80">
      {toasts.map((t) => {
        const Icon = icons[t.type]
        return (
          <div key={t.id}
            className={`flex items-start gap-3 p-3.5 rounded-card border shadow-card-hover animate-fadeUp ${colors[t.type]}`}>
            <Icon size={18} className="flex-shrink-0 mt-0.5" />
            <p className="flex-1 text-sm font-medium">{t.message}</p>
            <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}>
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
