import type { Metadata } from 'next'
import './globals.css'

const description =
  'Computer science at Purdue. Research, experience, and projects.'

export const metadata: Metadata = {
  title: 'Amrith Pusala',
  description,
  openGraph: {
    title: 'Amrith Pusala',
    description,
    type: 'website',
    url: 'https://amrithpusala.github.io',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230c0c0c'/><text x='50' y='72' font-family='monospace' font-size='70' font-weight='700' text-anchor='middle' fill='%23e8b04a'>$</text></svg>",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
