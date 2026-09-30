import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plutonium PropTech | O elo entre o sonho e a chave na mão',
  description: 'Transformando o imobiliário com tecnologia. Explore imóveis e oportunidades de investimento em Angola.',
  generator: 'Plutonium PropTech',
  metadataBase: new URL('https://plutonium.ao'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PLUTONIUM PropTech | O Elo Entre O Sonho e Chave Na Mão',
    description: 'Transformando o imobiliário com tecnologia em Angola.',
    url: 'https://plutonium.ao',
    siteName: 'PLUTONIUM PropTech',
    locale: 'pt_AO',
    type: 'website',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
