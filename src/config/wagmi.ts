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

// Custom chain for Doma Testnet (example configuration)
const domaTestnet = {
  id: 9999, // Replace with actual Doma testnet chain ID
  name: 'Doma Testnet',
  nativeCurrency: {
    name: 'Doma',
    symbol: 'DOMA',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.doma-testnet.example.com'] }, // Replace with actual RPC
    public: { http: ['https://rpc.doma-testnet.example.com'] },
  },
  blockExplorers: {
    default: { name: 'DomaExplorer', url: 'https://explorer.doma-testnet.example.com' },
  },
  testnet: true,
};

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
