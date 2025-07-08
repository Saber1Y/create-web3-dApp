import { LitElement } from 'lit';
import type { ConnectorWithProviders } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
export declare class W3mConnectInjectedWidget extends LitElement {
    private unsubscribe;
    tabIdx?: number;
    connectors: ConnectorWithProviders[];
    private connections;
    constructor();
    render(): import("lit").TemplateResult<1> | null;
    private onConnector;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-injected-widget': W3mConnectInjectedWidget;
    }
}
