export interface LimitteStoreUtilState {
    pendingTransactions: number;
}
type StateKey = keyof LimitteStoreUtilState;
export declare const LimitterUtil: {
    state: LimitteStoreUtilState;
    subscribeKey<K extends StateKey>(key: K, callback: (value: LimitteStoreUtilState[K]) => void): () => void;
    increase(value: StateKey): void;
    decrease(value: StateKey): void;
    reset(value: StateKey): void;
};
export {};
