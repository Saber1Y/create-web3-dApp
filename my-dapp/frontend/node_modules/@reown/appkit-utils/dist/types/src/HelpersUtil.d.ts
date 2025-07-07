import { type Tokens } from '@reown/appkit-controllers';
export declare const HelpersUtil: {
    getCaipTokens(tokens?: Tokens): Tokens | undefined;
    isLowerCaseMatch(str1?: string, str2?: string): boolean;
    getActiveNamespaceConnectedToAuth(): import("@reown/appkit-common").ChainNamespace | undefined;
    withRetry({ conditionFn, intervalMs, maxRetries }: {
        conditionFn: () => boolean | Promise<boolean>;
        intervalMs: number;
        maxRetries: number;
    }): Promise<boolean>;
};
