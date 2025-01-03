'use client';

import { PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { flowMainnet } from 'viem/chains';
import { http } from 'wagmi';
import { useEffect } from 'react';

const wagmiConfig = createConfig({
  chains: [flowMainnet],
  ssr: true,
  transports: {
    [flowMainnet.id]: http(),
  }
});

const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: 'light',
    accentColor: '#676FFF',
    logo: 'https://cryptologos.cc/logos/flow-flow-logo.png', // Replace with your logo
  },
  embeddedWallets: {
    createOnLogin: 'all-users',
  },
  loginMethodsAndOrder: {
    primary: ['telegram', 'sms', 'email'],
  },
  defaultChain: flowMainnet,
  supportedChains: [flowMainnet],
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
      console.error(
        'Privy app ID is missing. Ensure NEXT_PUBLIC_PRIVY_APP_ID is set in your environment variables.'
      );
    } else {
      console.log('Privy app ID:', process.env.NEXT_PUBLIC_PRIVY_APP_ID);
    }
  }, []);

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={privyConfig}
    >
      <SmartWalletsProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            {children}
          </WagmiProvider>
        </QueryClientProvider>
      </SmartWalletsProvider>
    </PrivyProvider>
  );
}