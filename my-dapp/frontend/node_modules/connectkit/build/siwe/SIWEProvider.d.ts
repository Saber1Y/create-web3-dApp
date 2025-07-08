import { ReactNode } from 'react';
import { SIWEConfig, SIWESession } from './SIWEContext';
type Props = SIWEConfig & {
    children: ReactNode;
    onSignIn?: (data?: SIWESession) => void;
    onSignOut?: () => void;
};
export declare const SIWE_NONCE_QUERY_KEY = "ckSiweNonce";
export declare const SIWE_SESSION_QUERY_KEY = "ckSiweSession";
export declare const SIWEProvider: ({ children, enabled, nonceRefetchInterval, sessionRefetchInterval, signOutOnDisconnect, signOutOnAccountChange, signOutOnNetworkChange, onSignIn, onSignOut, ...siweConfig }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
