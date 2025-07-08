/// <reference types="react" />
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
export declare enum StatusState {
    READY = "ready",
    LOADING = "loading",
    SUCCESS = "success",
    REJECTED = "rejected",
    ERROR = "error"
}
export type SIWESession = {
    address: Address;
    chainId: number;
};
export type SIWEConfig = {
    getNonce: () => Promise<string>;
    createMessage: (args: {
        nonce: string;
        address: Address;
        chainId: number;
    }) => Promise<string> | string;
    verifyMessage: (args: {
        message: string;
        signature: string;
    }) => Promise<boolean>;
    getSession: () => Promise<SIWESession | null>;
    signOut: () => Promise<boolean>;
    enabled?: boolean;
    nonceRefetchInterval?: number;
    sessionRefetchInterval?: number;
    signOutOnDisconnect?: boolean;
    signOutOnAccountChange?: boolean;
    signOutOnNetworkChange?: boolean;
};
export type SIWEContextValue = Required<SIWEConfig> & {
    nonce: ReturnType<typeof useQuery<string | null>>;
    session: ReturnType<typeof useQuery<SIWESession | null>>;
    status: StatusState;
    signIn: () => Promise<SIWESession | false>;
    resetStatus: () => void;
};
export declare const SIWEContext: import("react").Context<SIWEContextValue | null>;
