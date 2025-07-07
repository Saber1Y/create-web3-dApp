import type UniversalProvider from '@walletconnect/universal-provider';
import type { CaipNetwork, ChainNamespace, Connection as ConnectionType } from '@reown/appkit-common';
import { type CombinedProvider, type Provider } from '@reown/appkit-controllers';
import { type BitcoinConnector } from '@reown/appkit-utils/bitcoin';
import type { Provider as SolanaProvider } from '@reown/appkit-utils/solana';
import type { ChainAdapterConnector } from '../adapters/ChainAdapterConnector.js';
interface BaseSyncConnectionsParams<Connector = unknown, P = unknown> {
    connectors: Connector[];
    caipNetwork?: CaipNetwork;
    caipNetworks: CaipNetwork[];
    universalProvider: UniversalProvider;
    onConnection: (connection: ConnectionType) => void;
    onListenProvider: (connectorId: string, provider: P) => void;
    getConnectionStatusInfo: (connectorId: string) => {
        hasDisconnected: boolean;
        hasConnected: boolean;
    };
}
type SyncEvmConnections = BaseSyncConnectionsParams<ChainAdapterConnector, Provider | CombinedProvider>;
type SyncBitcoinConnections = BaseSyncConnectionsParams<BitcoinConnector, BitcoinConnector>;
type SyncSolanaConnections = BaseSyncConnectionsParams<SolanaProvider, SolanaProvider>;
interface GetConnectionParams<C extends ChainAdapterConnector = ChainAdapterConnector> {
    connectorId?: string;
    address?: string;
    connectors: C[];
    connections: ConnectionType[];
}
export declare class ConnectionManager {
    namespace: ChainNamespace;
    constructor(params: {
        namespace: ChainNamespace;
    });
    syncConnections(params: SyncEvmConnections | SyncSolanaConnections | SyncBitcoinConnections): Promise<void>;
    private syncEVMConnections;
    private syncSolanaConnections;
    private syncBitcoinConnections;
    /**
     * Gets a connection based on provided parameters.
     * If connectorId is provided, returns connection for that specific connector.
     * Otherwise, returns the first available valid connection.
     *
     * @param params - Connection parameters
     * @param params.address - Optional address to filter by
     * @param params.connectorId - Optional connector ID to filter by
     * @param params.connections - List of available connections
     * @param params.connectors - List of available connectors
     * @returns Connection or null if none found
     */
    getConnection({ address, connectorId, connections, connectors }: GetConnectionParams): {
        account: {
            type?: string;
            address: string;
        } | undefined;
        connector: ChainAdapterConnector | undefined;
        name?: string;
        icon?: string;
        networkIcon?: string;
        accounts: {
            type?: string;
            address: string;
        }[];
        caipNetwork?: CaipNetwork;
        connectorId: string;
        auth?: {
            name: string | undefined;
            username: string | undefined;
        };
    } | null;
}
export {};
