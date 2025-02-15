import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Gita AI - Divine Wisdom from Lord Krishna',
  description: 'Experience spiritual guidance through conversations with Lord Krishna. Receive timeless wisdom from the Bhagavad Gita through AI-powered divine dialogue.',
  keywords: ['Krishna', 'Bhagavad Gita', 'spiritual guidance', 'dharma', 'AI', 'wisdom', 'meditation', 'yoga', 'spirituality'],
  authors: [{ name: 'Gita AI' }],
  openGraph: {
    title: 'Gita AI - Divine Wisdom from Lord Krishna',
    description: 'Experience spiritual guidance through conversations with Lord Krishna. Receive timeless wisdom from the Bhagavad Gita through AI-powered divine dialogue.',
    url: 'https://gitaaii.vercel.app',
    siteName: 'Gita AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gita AI - Divine Wisdom from Lord Krishna',
    description: 'Experience spiritual guidance through conversations with Lord Krishna. Receive timeless wisdom from the Bhagavad Gita through AI-powered divine dialogue.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
