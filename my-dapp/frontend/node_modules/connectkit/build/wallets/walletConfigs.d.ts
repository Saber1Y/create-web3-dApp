/// <reference types="react" />
/**
 * EIP-6963: Multi Injected Provider Discovery
 * https://eips.ethereum.org/EIPS/eip-6963
 *
 */
export type WalletConfigProps = {
    name?: string;
    shortName?: string;
    icon?: string | React.ReactNode;
    iconConnector?: React.ReactNode;
    iconShape?: 'squircle' | 'circle' | 'square';
    iconShouldShrink?: boolean;
    downloadUrls?: {
        download?: string;
        website?: string;
        desktop?: string;
        android?: string;
        ios?: string;
        chrome?: string;
        firefox?: string;
        brave?: string;
        edge?: string;
        safari?: string;
    };
    getWalletConnectDeeplink?: (uri: string) => string;
    shouldDeeplinkDesktop?: boolean;
};
export declare const walletConfigs: {
    [rdns: string]: WalletConfigProps;
};
