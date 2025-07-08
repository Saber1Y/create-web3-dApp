import type { SessionTypes } from '@walletconnect/types';
import type { Namespace, NamespaceConfig } from '@walletconnect/universal-provider';
import type UniversalProvider from '@walletconnect/universal-provider';
import { type CaipNetwork, type CaipNetworkId, type ChainNamespace, type ParsedCaipAddress } from '@reown/appkit-common';
import { type OptionsControllerState } from '@reown/appkit-controllers';
interface ListenWcProviderParams {
    universalProvider: UniversalProvider;
    namespace: ChainNamespace;
    onConnect?: (parsedData: ParsedCaipAddress[]) => void;
    onDisconnect?: () => void;
    onAccountsChanged?: (parsedData: ParsedCaipAddress[]) => void;
    onChainChanged?: (chainId: number | string) => void;
    onDisplayUri?: (uri: string) => void;
}
export declare const DEFAULT_METHODS: {
    solana: string[];
    eip155: string[];
    bip122: string[];
};
export declare const WcHelpersUtil: {
    getMethodsByChainNamespace(chainNamespace: ChainNamespace): string[];
    createDefaultNamespace(chainNamespace: ChainNamespace): Namespace;
    applyNamespaceOverrides(baseNamespaces: NamespaceConfig, overrides?: OptionsControllerState["universalProviderConfigOverride"]): NamespaceConfig;
    createNamespaces(caipNetworks: CaipNetwork[], configOverride?: OptionsControllerState["universalProviderConfigOverride"]): NamespaceConfig;
    resolveReownName: (name: string) => Promise<string | false>;
    getChainsFromNamespaces(namespaces?: SessionTypes.Namespaces): CaipNetworkId[];
    isSessionEventData(data: unknown): data is WcHelpersUtil.SessionEventData;
    isOriginAllowed(currentOrigin: string, allowedPatterns: string[], defaultAllowedOrigins: string[]): boolean;
    listenWcProvider({ universalProvider, namespace, onConnect, onDisconnect, onAccountsChanged, onChainChanged, onDisplayUri }: ListenWcProviderParams): void;
    getWalletConnectAccounts(universalProvider: UniversalProvider, namespace: ChainNamespace): ParsedCaipAddress[];
};
export declare namespace WcHelpersUtil {
    type SessionEventData = {
        id: string;
        topic: string;
        params: {
            chainId: string;
            event: {
                data: unknown;
                name: string;
            };
        };
    };
}
export {};
