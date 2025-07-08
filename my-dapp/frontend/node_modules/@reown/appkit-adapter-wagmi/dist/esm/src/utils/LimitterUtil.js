import { proxy } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
const state = proxy({
    pendingTransactions: 0
});
export const LimitterUtil = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    increase(value) {
        state[value] += 1;
    },
    decrease(value) {
        state[value] -= 1;
    },
    reset(value) {
        state[value] = 0;
    }
};
//# sourceMappingURL=LimitterUtil.js.map