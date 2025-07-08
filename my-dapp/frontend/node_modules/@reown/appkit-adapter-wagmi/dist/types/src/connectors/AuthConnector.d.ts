import { type CreateConfigParameters } from '@wagmi/core';
import { W3mFrameProvider } from '@reown/appkit-wallet';
interface W3mFrameProviderOptions {
    projectId: string;
    enableAuthLogger?: boolean;
}
export type AuthParameters = {
    chains?: CreateConfigParameters['chains'];
    options: W3mFrameProviderOptions;
};
export declare function authConnector(parameters: AuthParameters): import("@wagmi/core").CreateConnectorFn<W3mFrameProvider, {
    provider?: W3mFrameProvider;
}, Record<string, unknown>>;
export {};
