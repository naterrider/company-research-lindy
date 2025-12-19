/**
 * Root Layout Component
 * 
 * Configures:
 * - Metadata for SEO and social sharing
 * - Global styling and theme
 * - Font loading (Inter from Next.js)
 * - Root providers and wrappers
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Load Inter font for consistent typography
const inter = Inter({ subsets: ['latin'] });

/**
 * SEO Metadata Configuration
 * Optimized for search engines and social media sharing
 */
export const metadata: Metadata = {
  title: {
    default: 'Company Research Tool - Healthcare & Enterprise Intelligence',
    template: '%s | Company Research',
  },
  description:
    'Comprehensive company research tool for healthcare organizations and enterprises. Search for detailed information about company financials, leadership, technology, and strategic initiatives.',
  keywords: [
    'company research',
    'healthcare intelligence',
    'enterprise research',
    'company analysis',
    'business intelligence',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://company-research.example.com',
    siteName: 'Company Research Tool',
    title: 'Company Research Tool - Healthcare & Enterprise Intelligence',
    description:
      'Comprehensive company research tool for healthcare organizations and enterprises.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Company Research Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Research Tool',
    description: 'Comprehensive company research for healthcare and enterprise organizations',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Main application content */}
        {children}
      </body>
    </html>
  );
}
