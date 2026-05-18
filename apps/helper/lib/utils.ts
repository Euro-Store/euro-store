import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("ar-SY", { style: "currency", currency: "SYP", maximumFractionDigits: 0 }).format(amount)
}
export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-SY", { year:"numeric", month:"long", day:"numeric" })
}
export function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("ar-SY", { year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" })
}
