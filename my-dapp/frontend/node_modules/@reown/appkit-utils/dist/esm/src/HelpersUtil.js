import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { ChainController, ConnectorController } from '@reown/appkit-controllers';
import { ConstantsUtil } from './ConstantsUtil.js';
export const HelpersUtil = {
    getCaipTokens(tokens) {
        if (!tokens) {
            return undefined;
        }
        const caipTokens = {};
        Object.entries(tokens).forEach(([id, token]) => {
            caipTokens[`${ConstantsUtil.EIP155}:${id}`] = token;
        });
        return caipTokens;
    },
    isLowerCaseMatch(str1, str2) {
        return str1?.toLowerCase() === str2?.toLowerCase();
    },
    getActiveNamespaceConnectedToAuth() {
        const activeChain = ChainController.state.activeChain;
        return CommonConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(chain => ConnectorController.getConnectorId(chain) === CommonConstantsUtil.CONNECTOR_ID.AUTH &&
            chain === activeChain);
    },
    withRetry({ conditionFn, intervalMs, maxRetries }) {
        let attempts = 0;
        return new Promise(resolve => {
            async function tryCheck() {
                attempts += 1;
                const result = await conditionFn();
                if (result) {
                    return resolve(true);
                }
                if (attempts >= maxRetries) {
                    return resolve(false);
                }
                setTimeout(tryCheck, intervalMs);
                return null;
            }
            tryCheck();
        });
    }
};
//# sourceMappingURL=HelpersUtil.js.map