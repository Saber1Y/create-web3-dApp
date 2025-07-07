import type { ChainNamespace } from '@reown/appkit-common';
import type { ChainAdapter } from './TypeUtil.js';
/**
 * Returns the array of chains to disconnect from the connector with the given namespace.
 * If no namespace is provided, it returns all chains.
 * @param namespace - The namespace of the connector to disconnect from.
 * @returns An array of chains to disconnect.
 */
export declare function getChainsToDisconnect(namespace?: ChainNamespace): [ChainNamespace, ChainAdapter][];
/**
 * Get the active network token address
 * @returns The active network token address
 */
export declare function getActiveNetworkTokenAddress(): string;
/**
 * Get the preferred account type for a given namespace
 * @param namespace - The namespace of the account
 * @returns The preferred account type
 */
export declare function getPreferredAccountType(namespace: ChainNamespace | undefined): "payment" | "ordinal" | "stx" | "smartAccount" | "eoa" | undefined;
