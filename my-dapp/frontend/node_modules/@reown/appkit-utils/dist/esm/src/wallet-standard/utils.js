import { SOLANA_CHAINS } from './constants.js';
export function isSolanaChain(chain) {
    return SOLANA_CHAINS.includes(chain);
}
export function isVersionedTransaction(transaction) {
    return 'version' in transaction;
}
//# sourceMappingURL=utils.js.map