import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Madhu Jayanti International Pvt Ltd | Company Profile',
  description: 'Madhu Jayanti International Pvt Ltd employer brand, people, sustainability, careers and company information.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
