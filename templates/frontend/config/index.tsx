import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum, sepolia } from "@reown/appkit/networks";
import { Chain } from "viem";

// 👷 Anvil manual definition
const anvil: Chain = {
  id: 31337,
  name: "Anvil",
  network: "anvil",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
    public: {
      http: ["http://127.0.0.1:8545"],
    },
  },
};

export const projectId = "8e67a983dade6ab3c075fe3c0d72e914";

if (!projectId) {
  throw new Error(
    "Environment variable NEXT_PUBLIC_REOWN_PROJECT_ID is missing."
  );
}

// 🌐 All supported networks
export const networks = [mainnet, arbitrum, sepolia, anvil];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
