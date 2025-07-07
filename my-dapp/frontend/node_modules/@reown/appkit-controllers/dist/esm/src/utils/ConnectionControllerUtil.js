import {} from '@reown/appkit-common';
import { ConnectionController } from '../controllers/ConnectionController.js';
import { ConnectorController } from '../controllers/ConnectorController.js';
import { OptionsController } from '../controllers/OptionsController.js';
// -- Utils ------------------------------------------ //
export const ConnectionControllerUtil = {
    getConnectionStatus(connection, namespace) {
        const connectedConnectorId = ConnectorController.state.activeConnectorIds[namespace];
        const connections = ConnectionController.getConnections(namespace);
        const isConnectorConnected = Boolean(connectedConnectorId) && connection.connectorId === connectedConnectorId;
        if (isConnectorConnected) {
            return 'connected';
        }
        const isConnectionConnected = connections.some(c => c.connectorId.toLowerCase() === connection.connectorId.toLowerCase());
        if (isConnectionConnected) {
            return 'active';
        }
        return 'disconnected';
    },
    excludeConnectorAddressFromConnections({ connections, connectorId, addresses }) {
        return connections.map(connection => {
            const isConnectorMatch = connectorId
                ? connection.connectorId.toLowerCase() === connectorId.toLowerCase()
                : false;
            if (isConnectorMatch && addresses) {
                const filteredAccounts = connection.accounts.filter(account => {
                    const isAddressIncluded = addresses.some(address => address.toLowerCase() === account.address.toLowerCase());
                    return !isAddressIncluded;
                });
                return { ...connection, accounts: filteredAccounts };
            }
            return connection;
        });
    },
    excludeExistingConnections(connectorIds, newConnections) {
        const existingConnectorIds = new Set(connectorIds);
        return newConnections.filter(c => !existingConnectorIds.has(c.connectorId));
    },
    getConnectionsByConnectorId(connections, connectorId) {
        return connections.filter(c => c.connectorId.toLowerCase() === connectorId.toLowerCase());
    },
    getConnectionsData(namespace) {
        const isMultiWalletEnabled = Boolean(OptionsController.state.remoteFeatures?.multiWallet);
        const activeConnectorId = ConnectorController.state.activeConnectorIds[namespace];
        const connections = ConnectionController.getConnections(namespace);
        const recentConnections = ConnectionController.state.recentConnections.get(namespace) ?? [];
        const recentConnectionsWithCurrentActiveConnectors = recentConnections.filter(connection => ConnectorController.getConnectorById(connection.connectorId));
        const dedupedRecentConnections = ConnectionControllerUtil.excludeExistingConnections([...connections.map(c => c.connectorId), ...(activeConnectorId ? [activeConnectorId] : [])], recentConnectionsWithCurrentActiveConnectors);
        if (!isMultiWalletEnabled) {
            return {
                connections: connections.filter(c => c.connectorId.toLowerCase() === activeConnectorId?.toLowerCase()),
                recentConnections: []
            };
        }
        return {
            connections,
            recentConnections: dedupedRecentConnections
        };
    }
};
//# sourceMappingURL=ConnectionControllerUtil.js.map