import { ReactNode } from 'react';
type Chain = {
    id: number;
    name: string;
    logo: ReactNode;
    rpcUrls?: {
        alchemy?: {
            http?: string[];
            webSocket?: string[];
        };
        infura?: {
            http?: string[];
            webSocket?: string[];
        };
    };
};
export declare const chainConfigs: Chain[];
export {};
