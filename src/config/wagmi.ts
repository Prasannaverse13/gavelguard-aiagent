import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';

// Doma Testnet - Real configuration
const domaTestnet = {
  id: 97476,
  name: 'Doma Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc-testnet.doma.xyz'] },
    public: { http: ['https://rpc-testnet.doma.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Doma Explorer', url: 'https://explorer-testnet.doma.xyz' },
  },
  testnet: true,
} as const satisfies Chain;

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        coinbaseWallet,
        walletConnectWallet,
        trustWallet,
        ledgerWallet,
      ],
    },
  ],
  {
    appName: 'GavelGuard AI',
    projectId: '91f167f5889a649b993ea6fddb741d88',
  }
);

export const config = createConfig({
  connectors,
  chains: [mainnet, polygon, optimism, arbitrum, base, domaTestnet],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [domaTestnet.id]: http(),
  },
});
