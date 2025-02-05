import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/shared/header'
import Home from '@/components/home'
import Introduction from '@/components/introduction'
import Programs from '@/components/programs'
import Changes from '@/components/changes'
import About from '@/components/about'
import Motivation from '@/components/motivation'
import Products from '@/components/products'
import Faq from '@/components/faq'
import Contact from '../components/contact'
import { Jost } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script';
const jost = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ECNU Team',
  description: 'El cambio nace en uno',
}

const PIXEL_ID = 'TU_PIXEL_ID'; // Reemplaza con tu Pixel ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className='scroll-smooth'>
      <head>
        {/* Script del Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
        </noscript>
        {/* <!-- Google Tag Manager --> */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-XXXXXX');
              `,
            }}
          />
          <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </head>
      <GoogleTagManager gtmId="GTM-KS5H2HMS" />
      <body className={jost.className}>
        <Header/>
        <Home/>
        <Introduction/>
        <Programs/>
        <Products/>
        <Changes/>
        <About/>
        <Motivation/>
        <Faq/>
        <Contact/>
        {children}
        </body>
    </html>
  )
}
