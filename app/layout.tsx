import "./globals.css";
import { Jost } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import type { Viewport } from "next";
const jost = Jost({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  metadataBase: new URL("https://ecnuteam.com"),
  title: "Entrenamiento funcional en casa para bienestar | ECNU Team",
  description:
    "Entrenamiento en casa con peso corporal diseñado para mejorar el rendimiento físico y mental, y fomentar hábitos sostenibles que promueven bienestar y longevidad.",
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/",
      "es-ES": "/",
    },
  },
  // openGraph: {
  // authors: ['Seb', 'Josh'],
  // description: 'The React Framework for the Web',
  // images: [ { url: 'https://nextjs.org/og.png', width: 800, height: 600, } ],
  // locale: 'en_US',
  // siteName: 'Next.js',
  // title: 'Next.js',
  // type: 'website',
  // url: 'https://nextjs.org',
  // },
  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
      "max-video-preview": 0,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    // icons: {
    //   icon: '/icon.png',
    //   shortcut: '/shortcut-icon.png',
    //   apple: '/apple-icon.png',
    //   other: {
    //     rel: 'apple-touch-icon-precomposed',
    //     url: '/apple-touch-icon-precomposed.png',
    //   },
    // },
  },
};

const PIXEL_ID = "TU_PIXEL_ID"; // Reemplaza con tu Pixel ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={jost.className}>
        {children}
        <GoogleTagManager gtmId="GTM-KS5H2HMS" />
      </body>
    </html>
  );
}
