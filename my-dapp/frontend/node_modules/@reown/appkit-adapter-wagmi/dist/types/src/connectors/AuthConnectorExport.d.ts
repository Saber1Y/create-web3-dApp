import type { CreateConfigParameters } from '@wagmi/core';
interface W3mFrameProviderOptions {
    projectId: string;
}
export type AuthParameters = {
    chains?: CreateConfigParameters['chains'];
    options: W3mFrameProviderOptions;
};
export declare function authConnector(parameters: AuthParameters): import("@wagmi/core").CreateConnectorFn<import("@reown/appkit-wallet").W3mFrameProvider, {
    provider?: import("@reown/appkit-wallet").W3mFrameProvider;
}, Record<string, unknown>>;
export {};
