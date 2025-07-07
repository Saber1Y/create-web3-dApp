import { type Connector, type ConnectorTypeOrder, type ConnectorWithProviders, type CustomWallet, type SocialProvider, type WcWallet } from '@reown/appkit-controllers';
interface GetConnectorTypeOrderParameters {
    recommended: WcWallet[];
    featured: WcWallet[];
    custom: CustomWallet[] | undefined;
    recent: WcWallet[];
    announced: WcWallet[];
    injected: WcWallet[];
    multiChain: WcWallet[];
    external: WcWallet[];
    overriddenConnectors?: ConnectorTypeOrder[];
}
export declare const ConnectorUtil: {
    getConnectorsByType(connectors: ConnectorWithProviders[], recommended: WcWallet[], featured: WcWallet[]): {
        custom: CustomWallet[] | undefined;
        recent: WcWallet[];
        external: ConnectorWithProviders[];
        multiChain: ConnectorWithProviders[];
        announced: ConnectorWithProviders[];
        injected: ConnectorWithProviders[];
        recommended: WcWallet[];
        featured: WcWallet[];
    };
    showConnector(connector: ConnectorWithProviders): boolean;
    getIsConnectedWithWC(): boolean;
    getConnectorTypeOrder({ recommended, featured, custom, recent, announced, injected, multiChain, external, overriddenConnectors }: GetConnectorTypeOrderParameters): string[];
    getAuthName({ email, socialUsername, socialProvider }: {
        email: string;
        socialUsername?: string | null;
        socialProvider?: SocialProvider | null;
    }): string;
    fetchProviderData(connector: Connector): Promise<{
        accounts: string[];
        chainId: number | undefined;
    }>;
};
export {};
