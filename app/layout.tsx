import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'RentPairs - Smart Rental Matching Platform',
  description: 'Find your perfect rental match! AI-powered platform connecting tenants with ideal properties and hosts through intelligent compatibility scoring, lifestyle matching, and streamlined communication.',
  keywords: ['rental', 'apartment', 'housing', 'real estate', 'roommate', 'property', 'Romania', 'Bucharest', 'matching'],
  authors: [{ name: 'RentPairs Team' }],
  creator: 'RentPairs',
  publisher: 'RentPairs',
  applicationName: 'RentPairs',
  
  // Open Graph tags for social sharing
  openGraph: {
    title: 'RentPairs - Smart Rental Matching',
    description: 'AI-powered rental platform connecting tenants with perfect properties. Smart matching, real-time chat, and verified listings.',
    url: 'https://www.rentpairs.com',
    siteName: 'RentPairs',
    type: 'website',
    locale: 'ro_RO',
    alternateLocale: 'en_US',
  },
  
  // Twitter Card tags
  twitter: {
    card: 'summary_large_image',
    title: 'RentPairs - Smart Rental Matching',
    description: 'Find your perfect rental match with AI-powered compatibility scoring and streamlined property discovery.',
    site: '@rentpairs',
    creator: '@rentpairs',
  },
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'your-google-verification-code', // Add actual verification code when available
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
