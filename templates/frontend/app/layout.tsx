// frontend/app/layout.tsx

import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import ContextProvider from '@/context'

export const metadata: Metadata = {
  title: 'AppKit Example App',
  description: 'Powered by WalletConnect & Reown',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookies = headers().get('cookie') || ''

  return (
    <html lang="en">
      <body>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  )
}
