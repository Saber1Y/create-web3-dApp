import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { CoreHelperUtil } from '@reown/appkit-controllers';
import { ConnectorUtil } from '@reown/appkit-scaffold-ui/utils';
import { HelpersUtil } from '@reown/appkit-utils';
import { BitcoinConstantsUtil } from '@reown/appkit-utils/bitcoin';
import { WcHelpersUtil } from '../utils/HelpersUtil.js';
// -- Class ------------------------------------------------------------------
export class ConnectionManager {
    constructor(params) {
        this.namespace = params.namespace;
    }
    async syncConnections(params) {
        switch (this.namespace) {
            case CommonConstantsUtil.CHAIN.EVM:
                await this.syncEVMConnections(params);
                break;
            case CommonConstantsUtil.CHAIN.SOLANA:
                await this.syncSolanaConnections(params);
                break;
            case CommonConstantsUtil.CHAIN.BITCOIN:
                await this.syncBitcoinConnections(params);
                break;
            default:
                throw new Error(`Unsupported chain namespace: ${this.namespace}`);
        }
    }
    async syncEVMConnections({ connectors, caipNetworks, universalProvider, getConnectionStatusInfo, onConnection, onListenProvider }) {
        await Promise.all(connectors
            .filter(c => {
            const { hasDisconnected, hasConnected } = getConnectionStatusInfo(c.id);
            return !hasDisconnected && hasConnected;
        })
            .map(async (connector) => {
            if (connector.id === CommonConstantsUtil.CONNECTOR_ID.WALLET_CONNECT) {
                const accounts = WcHelpersUtil.getWalletConnectAccounts(universalProvider, this.namespace);
                const caipNetwork = caipNetworks.find(n => n.chainNamespace === this.namespace &&
                    n.id.toString() === accounts[0]?.chainId?.toString());
                if (accounts.length > 0) {
                    onConnection({
                        connectorId: connector.id,
                        accounts: accounts.map(account => ({ address: account.address })),
                        caipNetwork
                    });
                }
            }
            else {
                const { accounts, chainId } = await ConnectorUtil.fetchProviderData(connector);
                if (accounts.length > 0 && chainId) {
                    const caipNetwork = caipNetworks.find(n => n.chainNamespace === this.namespace && n.id.toString() === chainId.toString());
                    onConnection({
                        connectorId: connector.id,
                        accounts: accounts.map(address => ({ address })),
                        caipNetwork
                    });
                    if (connector.provider &&
                        connector.id !== CommonConstantsUtil.CONNECTOR_ID.AUTH &&
                        connector.id !== CommonConstantsUtil.CONNECTOR_ID.WALLET_CONNECT) {
                        onListenProvider(connector.id, connector.provider);
                    }
                }
            }
        }));
    }
    async syncSolanaConnections({ connectors, caipNetwork, universalProvider, getConnectionStatusInfo, onConnection, onListenProvider }) {
        await Promise.all(connectors
            .filter(c => {
            const { hasDisconnected, hasConnected } = getConnectionStatusInfo(c.id);
            return !hasDisconnected && hasConnected;
        })
            .map(async (connector) => {
            if (connector.id === CommonConstantsUtil.CONNECTOR_ID.WALLET_CONNECT) {
                const accounts = WcHelpersUtil.getWalletConnectAccounts(universalProvider, this.namespace);
                if (accounts.length > 0) {
                    onConnection({
                        connectorId: connector.id,
                        accounts: accounts.map(account => ({ address: account.address })),
                        caipNetwork
                    });
                }
            }
            else {
                const address = await connector.connect({
                    chainId: caipNetwork?.id
                });
                if (address) {
                    onConnection({
                        connectorId: connector.id,
                        accounts: [{ address }],
                        caipNetwork
                    });
                    onListenProvider(connector.id, connector.provider);
                }
            }
        }));
    }
    async syncBitcoinConnections({ connectors, caipNetwork, universalProvider, getConnectionStatusInfo, onConnection, onListenProvider }) {
        await Promise.all(connectors
            .filter(c => {
            const { hasDisconnected, hasConnected } = getConnectionStatusInfo(c.id);
            return !hasDisconnected && hasConnected;
        })
            .map(async (connector) => {
            if (connector.id === CommonConstantsUtil.CONNECTOR_ID.WALLET_CONNECT) {
                const accounts = WcHelpersUtil.getWalletConnectAccounts(universalProvider, this.namespace);
                if (accounts.length > 0) {
                    onConnection({
                        connectorId: connector.id,
                        accounts: accounts.map(account => ({ address: account.address })),
                        caipNetwork
                    });
                }
                return;
            }
            const address = await connector.connect();
            const addresses = await connector.getAccountAddresses();
            let accounts = addresses?.map(a => CoreHelperUtil.createAccount(CommonConstantsUtil.CHAIN.BITCOIN, a.address, a.purpose || 'payment', a.publicKey, a.path));
            if (accounts && accounts.length > 1) {
                accounts = [
                    {
                        namespace: CommonConstantsUtil.CHAIN.BITCOIN,
                        publicKey: accounts[BitcoinConstantsUtil.ACCOUNT_INDEXES.PAYMENT]?.publicKey ?? '',
                        path: accounts[BitcoinConstantsUtil.ACCOUNT_INDEXES.PAYMENT]?.path ?? '',
                        address: accounts[BitcoinConstantsUtil.ACCOUNT_INDEXES.PAYMENT]?.address ?? '',
                        type: 'payment'
                    },
                    {
                        namespace: CommonConstantsUtil.CHAIN.BITCOIN,
                        publicKey: accounts[BitcoinConstantsUtil.ACCOUNT_INDEXES.ORDINAL]?.publicKey ?? '',
                        path: accounts[BitcoinConstantsUtil.ACCOUNT_INDEXES.ORDINAL]?.path ?? '',
                        address: accounts[BitcoinConstantsUtil.ACCOUNT_INDEXES.ORDINAL]?.address ?? '',
                        type: 'ordinal'
                    }
                ];
            }
            const chain = connector.chains.find(c => c.id === caipNetwork?.id) || connector.chains[0];
            if (!chain) {
                throw new Error('The connector does not support any of the requested chains');
            }
            if (address) {
                onListenProvider(connector.id, connector.provider);
                onConnection({
                    connectorId: connector.id,
                    accounts: accounts.map(a => ({ address: a.address, type: a.type })),
                    caipNetwork
                });
            }
        }));
    }
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
    getConnection({ address, connectorId, connections, connectors }) {
        if (connectorId) {
            const connection = connections.find(c => HelpersUtil.isLowerCaseMatch(c.connectorId, connectorId));
            if (!connection) {
                return null;
            }
            const connector = connectors.find(c => HelpersUtil.isLowerCaseMatch(c.id, connection.connectorId));
            const account = address
                ? connection.accounts.find(a => HelpersUtil.isLowerCaseMatch(a.address, address))
                : connection.accounts[0];
            return { ...connection, account, connector };
        }
        const validConnection = connections.find(c => c.accounts.length > 0 &&
            connectors.some(conn => HelpersUtil.isLowerCaseMatch(conn.id, c.connectorId)));
        if (validConnection) {
            const [account] = validConnection.accounts;
            const connector = connectors.find(c => HelpersUtil.isLowerCaseMatch(c.id, validConnection.connectorId));
            return {
                ...validConnection,
                account,
                connector
            };
        }
        return null;
    }
}
//# sourceMappingURL=ConnectionManager.js.map