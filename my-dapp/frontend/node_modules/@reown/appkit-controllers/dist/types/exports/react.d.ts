import { type ChainNamespace, type Connection } from '@reown/appkit-common';
import type { UseAppKitAccountReturn, UseAppKitNetworkReturn } from '../src/utils/TypeUtil.js';
export type { Connection } from '@reown/appkit-common';
interface DisconnectParams {
    id?: string;
    namespace?: ChainNamespace;
}
interface UseAppKitConnectionProps {
    namespace?: ChainNamespace;
    onSuccess?: (params: {
        address: string;
        namespace: ChainNamespace;
        hasSwitchedAccount: boolean;
        hasSwitchedWallet: boolean;
        hasDeletedWallet: boolean;
    }) => void;
    onError?: (error: Error) => void;
}
interface SwitchConnectionParams {
    connection: Connection;
    address?: string;
}
interface DeleteRecentConnectionProps {
    address: string;
    connectorId: string;
}
export declare function useAppKitNetworkCore(): Pick<UseAppKitNetworkReturn, 'caipNetwork' | 'chainId' | 'caipNetworkId'>;
export declare function useAppKitAccount(options?: {
    namespace?: ChainNamespace;
}): UseAppKitAccountReturn;
export declare function useDisconnect(): {
    disconnect: (props?: DisconnectParams) => Promise<void>;
};
export declare function useAppKitConnections(namespace?: ChainNamespace): {
    connections: {
        name: string;
        icon: string;
        networkIcon: string;
        accounts: {
            type?: string;
            address: string;
        }[];
        caipNetwork?: import("@reown/appkit-common").CaipNetwork;
        connectorId: string;
        auth?: {
            name: string | undefined;
            username: string | undefined;
        };
    }[];
    recentConnections: {
        name: string;
        icon: string;
        networkIcon: string;
        accounts: {
            type?: string;
            address: string;
        }[];
        caipNetwork?: import("@reown/appkit-common").CaipNetwork;
        connectorId: string;
        auth?: {
            name: string | undefined;
            username: string | undefined;
        };
    }[];
};
export declare function useAppKitConnection({ namespace, onSuccess, onError }: UseAppKitConnectionProps): {
    connection: Connection | undefined;
    isPending: boolean;
    switchConnection: ({ connection: _connection, address }: SwitchConnectionParams) => Promise<void>;
    deleteConnection: ({ address, connectorId }: DeleteRecentConnectionProps) => void;
};
