/**
 * TODO: Automate transports based on configured chains
 *
 * Developers using this causes loss of granular control over a dapps transports,
 * but for simple use cases, it's nice to have and saves a lot of boilerplate.
 *
 */
import { type CreateConfigParameters } from '@wagmi/core';
type GetDefaultTransportsProps = {
    chains?: CreateConfigParameters['chains'];
    alchemyId?: string;
    infuraId?: string;
};
export declare const getDefaultTransports: ({ chains, alchemyId, infuraId, }: GetDefaultTransportsProps) => CreateConfigParameters['transports'];
export {};
