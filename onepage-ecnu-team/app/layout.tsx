import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/header'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ECNU Team',
  description: 'El cambio nace en uno',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
        </body>
    </html>
  )
}
