import type { CaipNetwork } from '@reown/appkit-common';
import type { Connector, Provider } from '@reown/appkit-controllers';
interface ChainAdapterConnector extends Connector {
    chains: CaipNetwork[];
}
export interface BitcoinConnector extends ChainAdapterConnector, Provider {
    getAccountAddresses(): Promise<BitcoinConnector.AccountAddress[]>;
    signMessage(params: BitcoinConnector.SignMessageParams): Promise<string>;
    sendTransfer(params: BitcoinConnector.SendTransferParams): Promise<string>;
    signPSBT(params: BitcoinConnector.SignPSBTParams): Promise<BitcoinConnector.SignPSBTResponse>;
    switchNetwork(caipNetworkId: string): Promise<void>;
}
export declare enum AddressPurpose {
    Ordinal = "ordinal",
    Payment = "payment",
    Stacks = "stx"
}
export declare namespace BitcoinConnector {
    type AccountAddress = {
        address: string;
        publicKey?: string;
        path?: string;
        purpose: AddressPurpose;
    };
    type SignMessageParams = {
        message: string;
        address: string;
        protocol?: 'ecdsa' | 'bip322';
    };
    type SendTransferParams = {
        amount: string;
        recipient: string;
    };
    type SignPSBTParams = {
        psbt: string;
        signInputs: {
            address: string;
            index: number;
            sighashTypes: number[];
        }[];
        broadcast?: boolean;
    };
    type SignPSBTResponse = {
        psbt: string;
        txid?: string;
    };
}
export {};
