import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import { Analytics } from '@vercel/analytics/react'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Shagun Mistry',
    default: 'Shagun Mistry - Software Engineer, ML Enthusiast, Entrepreneur',
  },
  description:
    'Shagun Mistry: Software Engineer and Machine Learning enthusiast exploring entrepreneurship, startups, and biotechnology. Sharing insights on tech, innovation, and personal growth.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: 'Shagun Mistry - Tech Enthusiast and Entrepreneur',
    description:
      'Explore insights on software engineering, machine learning, startups, and biotechnology with Shagun Mistry.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Shagun Mistry',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Shagun Mistry - Software Engineer and Entrepreneur',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shagun Mistry - Tech Enthusiast and Entrepreneur',
    description:
      'Software engineering, ML, startups, and biotech insights from Shagun Mistry.',
    creator: '@shagunmistry',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/twitter-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'software engineering',
    'machine learning',
    'entrepreneurship',
    'startups',
    'biotechnology',
    'tech innovation',
  ],
  authors: [{ name: 'Shagun Mistry' }],
  category: 'Technology',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    // Add other verification codes as needed
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
