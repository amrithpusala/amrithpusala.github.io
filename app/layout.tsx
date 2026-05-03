import type { Metadata } from 'next'
import { Fraunces, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Amrith Pusala — ML Engineer',
  description: 'CS @ Purdue · ML Engineer · Building AI systems that ship',
  openGraph: {
    title: 'Amrith Pusala',
    description: 'CS @ Purdue with a minor in AI. Building full-stack ML systems.',
    type: 'website',
    url: 'https://amrithpusala.github.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amrith Pusala',
    description: 'CS @ Purdue with a minor in AI. Building full-stack ML systems.',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>&#x1F338;</text></svg>",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
