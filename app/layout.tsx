import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AI Powered Trip Advisor',
    description: 'AI-Powered Travel & Tourism Platform - Discover premium destinations, AI-curated itineraries, and real-time trip monitoring.',
}

import AuthProvider from '@/components/providers/AuthProvider'
import SupportChat from '@/components/chat/SupportChat'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} antialiased`} style={{ background: '#0a0e1a', color: '#f1f5f9' }}>
                <AuthProvider>
                    <Navbar />
                    <main className="pt-20 min-h-screen">
                        {children}
                    </main>
                    <SupportChat />
                </AuthProvider>
            </body>
        </html>
    )
}
