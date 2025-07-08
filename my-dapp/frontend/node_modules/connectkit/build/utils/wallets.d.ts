declare global {
    interface Window {
        trustWallet: any;
        trustwallet: any;
    }
}
export declare const isWalletInstalled: (name: string) => boolean;
export declare const isMetaMask: () => boolean;
export declare const isCoinbaseWallet: () => boolean;
export declare const isFamily: () => boolean;
export declare const isBrave: () => boolean;
export declare const isTokenary: () => boolean;
export declare const isDawn: () => boolean;
export declare const isFrame: () => boolean;
export declare const isPhantom: () => boolean;
export declare const isInfinityWallet: () => boolean;
export declare const isRabby: () => boolean;
export declare const isArgent: () => boolean;
export declare const isFrontier: () => boolean;
export declare const isTrust: () => any;
export declare const isTokenPocket: () => boolean;
export declare const isTalisman: () => boolean;
export declare const isFordefi: () => boolean;
export declare const isRainbow: () => boolean;
export declare const isZerion: () => boolean;
export declare const isSafe: () => boolean;
