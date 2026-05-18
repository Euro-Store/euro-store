import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Euro Store',
  description: 'منصة أزياء رقمية',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}