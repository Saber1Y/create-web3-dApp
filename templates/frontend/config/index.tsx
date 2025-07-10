import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  mainnet,
  arbitrum,
  sepolia,
  defineChain,
} from "@reown/appkit/networks"; // or from 'wagmi'
import { Chain } from "viem";

export const anvil: Chain = {
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
  blockExplorers: {
    default: { name: "Local", url: "http://127.0.0.1:8545" },
  },
  testnet: true,
};

export const projectId =
  process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ??
  (() => {
    throw new Error("NEXT_PUBLIC_REOWN_PROJECT_ID is missing");
  })();

export const networks = [mainnet, arbitrum, sepolia, anvil]; // or anvil2

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
