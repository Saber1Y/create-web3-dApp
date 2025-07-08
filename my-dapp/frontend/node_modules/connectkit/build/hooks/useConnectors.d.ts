import { type Connector } from 'wagmi';
export declare function useConnectors(): readonly Connector<import("wagmi").CreateConnectorFn>[];
export declare function useConnector(id: string, uuid?: string): Connector<import("wagmi").CreateConnectorFn> | undefined;
export declare function useFamilyAccountsConnector(): Connector<import("wagmi").CreateConnectorFn> | undefined;
export declare function useFamilyConnector(): Connector<import("wagmi").CreateConnectorFn> | undefined;
export declare function useInjectedConnector(uuid?: string): Connector<import("wagmi").CreateConnectorFn> | undefined;
export declare function useWalletConnectConnector(): Connector<import("wagmi").CreateConnectorFn> | undefined;
export declare function useCoinbaseWalletConnector(): Connector<import("wagmi").CreateConnectorFn> | undefined;
export declare function useMetaMaskConnector(): Connector<import("wagmi").CreateConnectorFn> | undefined;
