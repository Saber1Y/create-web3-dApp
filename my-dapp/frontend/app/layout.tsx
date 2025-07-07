import './globals.css'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { ReownProvider } from '@reown/appkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'

const queryClient = new QueryClient()

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet],
    walletConnectProjectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
    appName: 'My Web3 Dapp',
  })
)

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ReownProvider>{children}</ReownProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
