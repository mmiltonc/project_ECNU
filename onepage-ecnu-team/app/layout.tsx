import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/shared/header'
import Home from '@/components/home'
import Introduction from '@/components/introduction'
import Programs from '@/components/programs'
import Changes from '@/components/changes'
import Nutrition from '@/components/nutrition'
import About from '@/components/about'
import Motivation from '@/components/motivation'
import Faq from '@/components/faq'
import Contact from '../components/contact'
import { Jost } from 'next/font/google'
import { useState } from 'react'


const jost = Jost({ subsets: ['latin'] })

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
    <html lang="en" className='scroll-smooth'>
      <body className={jost.className}>
        <Header/>
        <Home/>
        <Introduction/>
        <Programs/>
        <Changes/>
        <Nutrition/>
        <About/>
        <Motivation/>
        <Faq/>
        <Contact/>
        {children}
        </body>
    </html>
  )
}
