import Header from '@/components/header'
import { NextUIProvider } from '@nextui-org/react'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Discuss App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-slate-400">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="container mx-auto max-w-6xl bg-white min-h-screen shadow-lg rounded p-8">
          <SessionProvider>
            <NextUIProvider>
              <Header />
              <div className="p-14">{children}</div>
            </NextUIProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}
