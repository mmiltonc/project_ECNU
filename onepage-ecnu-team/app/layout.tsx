import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/header'
import Home from '@/components/home'
import Introduction from '@/components/introduction'
import Programs from '@/components/programs'
import Changes from '@/components/changes'
import Nutrition from '@/components/nutrition'
import About from '@/components/about'
import Motivation from '@/components/motivation'
import Faq from '@/components/faq'

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
        <Home/>
        <Introduction/>
        <Programs/>
        <Changes/>
        <Nutrition/>
        <About/>
        <Motivation/>
        <Faq/>
        {children}
        </body>
    </html>
  )
}
