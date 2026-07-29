import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://healthychoices.vercel.app'),
  title: 'Healthy Choices - Premium Greek Yogurt',
  description:
    'Premium Greek yogurt and healthy snacks. Fresh, homemade quality for a healthier lifestyle.',
  keywords: 'Greek yogurt, healthy snacks, wellness, premium food',
  openGraph: {
    title: 'Healthy Choices - Premium Greek Yogurt',
    description: 'Premium Greek yogurt and healthy snacks for a better life.',
    type: 'website',
    url: 'https://healthychoices.vercel.app',
    images: ['/images/hero-yogurt-bowl.jpg'],
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
