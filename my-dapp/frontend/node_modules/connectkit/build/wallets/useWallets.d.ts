import { Connector } from 'wagmi';
import { WalletConfigProps } from './walletConfigs';
export type WalletProps = {
    id: string;
    connector: Connector;
    isInstalled?: boolean;
} & WalletConfigProps;
export declare const useWallet: (id: string) => WalletProps | null;
export declare const useWallets: () => WalletProps[];
