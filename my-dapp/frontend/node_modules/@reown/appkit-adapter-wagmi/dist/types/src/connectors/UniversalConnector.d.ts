import { type Address, type ProviderConnectInfo } from 'viem';
import type { AppKitOptions } from '@reown/appkit';
import type { AppKit } from '@reown/appkit';
export type AppKitOptionsParams = AppKitOptions & {
    isNewChainsStale?: boolean;
};
export declare function walletConnect(parameters: AppKitOptionsParams, appKit: AppKit): import("@wagmi/core").CreateConnectorFn<import("@walletconnect/universal-provider").default, {
    connect(parameters?: {
        chainId?: number;
        pairingTopic?: string;
    }): Promise<{
        accounts: readonly Address[];
        chainId: number;
    }>;
    getNamespaceChainsIds(): number[];
    getRequestedChainsIds(): Promise<number[]>;
    isChainsStale(): Promise<boolean>;
    onConnect(connectInfo: ProviderConnectInfo): void;
    onDisplayUri(uri: string): void;
    onSessionDelete(data: {
        topic: string;
    }): void;
    setRequestedChainsIds(chains: number[]): void;
    requestedChainsStorageKey: `${string}.requestedChains`;
}, {
    [x: `${string}.requestedChains`]: number[];
}>;
export declare namespace walletConnect {
    var type: "walletConnect";
}
