import { CreateConnectorFn } from 'wagmi';
import { walletConfigs } from './walletConfigs';
type WalletIds = Extract<keyof typeof walletConfigs, string>;
export declare const wallets: {
    [key: WalletIds]: CreateConnectorFn;
};
export {};
