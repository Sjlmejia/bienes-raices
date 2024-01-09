import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import LayoutProvider from '@/providers/layout-provider'

export const metadata: Metadata = {
  title: 'Bienes Raices',
  description: 'Encuenra la casa de tus sueños',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>

  )
}
