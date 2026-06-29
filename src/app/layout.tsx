import type { Metadata } from 'next'
import { Space_Grotesk, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NEGR0CALDERON — Experiencias Digitales Premium',
  description:
    'No construyo páginas. Construyo experiencias digitales. Branding, Landing Pages, Sitios Web, Automatización IA.',
  keywords: ['branding', 'landing page', 'diseño web', 'automatización', 'experiencia digital'],
  openGraph: {
    title: 'NEGR0CALDERON — Experiencias Digitales Premium',
    description: 'No construyo páginas. Construyo experiencias digitales.',
    type: 'website',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${cormorant.variable}`}>
      <body className={`font-grotesk bg-void text-light`}>
        {children}
      </body>
    </html>
  )
}
