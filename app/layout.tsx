import "./globals.css";
import classNames from "classnames";
import { Jost, Oswald, Nunito_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Viewport } from "next";
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-oswald",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"], // Define los subconjuntos necesarios
  weight: ["400", "700", "900"], // Opcional: especifica los pesos que usarás (normal, bold, etc.)
  variable: "--font-nunito-sans", // Variable CSS opcional para usar en tu CSS global
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  metadataBase: new URL("https://ecnuteam.com"),
  title: "Exprimí tu potencial físico-mental con calistenia | ECNU Team",
  description:
    "Entrenamiento con peso corporal diseñado para mejorar el rendimiento físico y mental, fomentar hábitos saludables y sostenibles que promuevan bienestar y longevidad.",
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/",
      "es-ES": "/",
    },
  },
  openGraph: {
    authors: ["Lucas Pallotta"],
    description:
      "Entrenamiento con peso corporal diseñado para mejorar el rendimiento físico y mental, fomentar hábitos saludables y sostenibles que promuevan bienestar y longevidad.",
    images: [
      {
        url: "https://ecnuteam.com/images/opengraph-image.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "es_AR",
    siteName: "ECNU Team",
    title: "Exprimí tu potencial físico-mental con calistenia | ECNU Team",
    type: "website",
    url: "https://ecnuteam.com",
  },
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
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={classNames([
          jost.variable,
          oswald.variable,
          nunitoSans.variable,
        ])}
      >
        {children}
        <GoogleTagManager gtmId="GTM-KFWW9DTG" />
      </body>
    </html>
  );
}
