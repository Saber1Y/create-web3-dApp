/**
 * This provider is responsible for handling reusable web3 logic across the app.
 */
import React from 'react';
import { Address, Chain } from 'viem';
type Web3Context = {
    connect: {
        getUri: (id?: string) => string;
    };
    dapp: {
        chains: Chain[];
    };
    account?: {
        chain: Chain;
        chainIsSupported: boolean;
        address: Address;
    };
};
declare const Web3Context: React.Context<Web3Context>;
export declare const Web3ContextProvider: ({ enabled, children, }: {
    enabled?: boolean | undefined;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useWeb3: () => Web3Context;
export {};
