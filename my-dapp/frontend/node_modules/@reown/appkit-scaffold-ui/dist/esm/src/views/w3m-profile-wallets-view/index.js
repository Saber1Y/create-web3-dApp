var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ConstantsUtil as CommonConstantsUtil, ParseUtil } from '@reown/appkit-common';
import { AccountController, AssetUtil, ChainController, ConnectionController, ConnectionControllerUtil, ConnectorController, CoreHelperUtil, OptionsController, RouterController, SnackController, StorageUtil } from '@reown/appkit-controllers';
import { MathUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-active-profile-wallet-item';
import '@reown/appkit-ui/wui-balance';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-inactive-profile-wallet-item';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-separator';
import '@reown/appkit-ui/wui-tabs';
import '@reown/appkit-ui/wui-text';
import { HelpersUtil } from '@reown/appkit-utils';
import { ConnectionUtil } from '../../utils/ConnectionUtil.js';
import styles from './styles.js';
const TABS_PADDING = 16;
const TABS_INNER_PADDING = 4;
const UI_CONFIG = {
    ADDRESS_DISPLAY: { START: 4, END: 6 },
    BADGE: { SIZE: 'md', ICON: 'lightbulb' },
    SCROLL_THRESHOLD: 50,
    OPACITY_RANGE: [0, 1]
};
const NAMESPACE_ICONS = {
    eip155: 'ethereum',
    solana: 'solana',
    bip122: 'bitcoin'
};
const NAMESPACE_TABS = [
    { namespace: 'eip155', icon: NAMESPACE_ICONS.eip155, label: 'EVM' },
    { namespace: 'solana', icon: NAMESPACE_ICONS.solana, label: 'Solana' },
    { namespace: 'bip122', icon: NAMESPACE_ICONS.bip122, label: 'Bitcoin' }
];
const CHAIN_LABELS = {
    eip155: { title: 'Add EVM Wallet', description: 'Add your first EVM wallet' },
    solana: { title: 'Add Solana Wallet', description: 'Add your first Solana wallet' },
    bip122: { title: 'Add Bitcoin Wallet', description: 'Add your first Bitcoin wallet' }
};
let W3mProfileWalletsView = class W3mProfileWalletsView extends LitElement {
    constructor() {
        super();
        this.unsubscribers = [];
        this.currentTab = 0;
        this.namespace = ChainController.state.activeChain;
        this.namespaces = Array.from(ChainController.state.chains.keys());
        this.caipAddress = undefined;
        this.profileName = undefined;
        this.activeConnectorIds = ConnectorController.state.activeConnectorIds;
        this.lastSelectedAddress = '';
        this.lastSelectedConnectorId = '';
        this.isSwitching = false;
        this.caipNetwork = ChainController.state.activeCaipNetwork;
        this.user = AccountController.state.user;
        this.remoteFeatures = OptionsController.state.remoteFeatures;
        this.tabWidth = '';
        this.currentTab = this.namespace ? this.namespaces.indexOf(this.namespace) : 0;
        this.caipAddress = ChainController.getAccountData(this.namespace)?.caipAddress;
        this.profileName = ChainController.getAccountData(this.namespace)?.profileName;
        this.unsubscribers.push(...[
            ConnectionController.subscribeKey('connections', () => this.requestUpdate()),
            ConnectionController.subscribeKey('recentConnections', () => this.requestUpdate()),
            ConnectorController.subscribeKey('activeConnectorIds', ids => {
                this.activeConnectorIds = ids;
            }),
            ChainController.subscribeKey('activeCaipNetwork', val => (this.caipNetwork = val)),
            AccountController.subscribeKey('user', val => (this.user = val)),
            OptionsController.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val))
        ]);
        this.chainListener = ChainController.subscribeChainProp('accountState', accountState => {
            this.caipAddress = accountState?.caipAddress;
            this.profileName = accountState?.profileName;
        }, this.namespace);
    }
    disconnectedCallback() {
        this.unsubscribers.forEach(unsubscribe => unsubscribe());
        this.resizeObserver?.disconnect();
        this.tabsResizeObserver?.disconnect();
        this.removeScrollListener();
        this.chainListener?.();
    }
    firstUpdated() {
        const walletListEl = this.shadowRoot?.querySelector('.wallet-list');
        const tabsEl = this.shadowRoot?.querySelector('wui-tabs');
        if (!walletListEl) {
            return;
        }
        const handleScroll = () => this.updateScrollOpacity(walletListEl);
        requestAnimationFrame(handleScroll);
        walletListEl.addEventListener('scroll', handleScroll);
        this.resizeObserver = new ResizeObserver(handleScroll);
        this.resizeObserver.observe(walletListEl);
        handleScroll();
        if (tabsEl) {
            const handleTabsResize = () => {
                const availableTabs = NAMESPACE_TABS.filter(tab => this.namespaces.includes(tab.namespace));
                const tabCount = availableTabs.length;
                if (tabCount > 1) {
                    const containerWidth = this.getBoundingClientRect()?.width;
                    const totalInnerTabsPadding = TABS_INNER_PADDING * 2;
                    const totalTabsPadding = TABS_PADDING * 2;
                    const availableWidth = containerWidth - totalTabsPadding - totalInnerTabsPadding;
                    const tabWidth = availableWidth / tabCount;
                    this.tabWidth = `${tabWidth}px`;
                    this.requestUpdate();
                }
            };
            this.tabsResizeObserver = new ResizeObserver(handleTabsResize);
            this.tabsResizeObserver.observe(this);
            handleTabsResize();
        }
    }
    render() {
        const namespace = this.namespace;
        if (!namespace) {
            throw new Error('Namespace is not set');
        }
        return html `
      <wui-flex flexDirection="column" .padding=${['0', 'l', 'l', 'l']} gap="l">
        ${this.renderTabs()} ${this.renderHeader(namespace)} ${this.renderConnections(namespace)}
        ${this.renderAddConnectionButton(namespace)}
      </wui-flex>
    `;
    }
    renderTabs() {
        const availableTabs = NAMESPACE_TABS.filter(tab => this.namespaces.includes(tab.namespace));
        const tabCount = availableTabs.length;
        if (tabCount > 1) {
            return html `
        <wui-tabs
          .onTabChange=${(index) => this.handleTabChange(index)}
          .activeTab=${this.currentTab}
          localTabWidth=${this.tabWidth}
          .tabs=${availableTabs}
        ></wui-tabs>
      `;
        }
        return null;
    }
    renderHeader(namespace) {
        const connections = this.getActiveConnections(namespace);
        const totalConnections = connections.flatMap(({ accounts }) => accounts).length + (this.caipAddress ? 1 : 0);
        return html `
      <wui-flex alignItems="center" columnGap="3xs">
        <wui-icon
          name=${NAMESPACE_ICONS[namespace] ??
            NAMESPACE_ICONS.eip155}
          size="lg"
        ></wui-icon>
        <wui-text color="fg-200" variant="small-400"
          >${totalConnections > 1 ? 'Wallets' : 'Wallet'}</wui-text
        >
        <wui-text
          color="fg-100"
          variant="small-400"
          class="balance-amount"
          data-testid="balance-amount"
        >
          ${totalConnections}
        </wui-text>
        <wui-link
          color="fg-200"
          @click=${() => ConnectionController.disconnect({ namespace })}
          ?disabled=${!this.hasAnyConnections(namespace)}
          data-testid="disconnect-all-button"
        >
          Disconnect All
        </wui-link>
      </wui-flex>
    `;
    }
    renderConnections(namespace) {
        const hasConnections = this.hasAnyConnections(namespace);
        const classes = {
            'wallet-list': true,
            'active-wallets-box': hasConnections,
            'empty-wallet-list-box': !hasConnections
        };
        return html `
      <wui-flex flexDirection="column" class=${classMap(classes)} rowGap="s">
        ${hasConnections
            ? this.renderActiveConnections(namespace)
            : this.renderEmptyState(namespace)}
      </wui-flex>
    `;
    }
    renderActiveConnections(namespace) {
        const connections = this.getActiveConnections(namespace);
        const connectorId = this.activeConnectorIds[namespace];
        const plainAddress = this.getPlainAddress();
        return html `
      ${plainAddress || connectorId || connections.length > 0
            ? html `<wui-flex
            flexDirection="column"
            .padding=${['l', '0', 'xs', '0']}
            class="active-wallets"
          >
            ${this.renderActiveProfile(namespace)} ${this.renderActiveConnectionsList(namespace)}
          </wui-flex>`
            : null}
      ${this.renderRecentConnections(namespace)}
    `;
    }
    renderActiveProfile(namespace) {
        const connectorId = this.activeConnectorIds[namespace];
        if (!connectorId) {
            return null;
        }
        const { connections } = ConnectionControllerUtil.getConnectionsData(namespace);
        const connector = ConnectorController.getConnectorById(connectorId);
        const connectorImage = AssetUtil.getConnectorImage(connector);
        const plainAddress = this.getPlainAddress();
        if (!plainAddress) {
            return null;
        }
        const isBitcoin = namespace === CommonConstantsUtil.CHAIN.BITCOIN;
        const authData = ConnectionUtil.getAuthData({ connectorId, accounts: [] });
        const shouldShowSeparator = this.getActiveConnections(namespace).flatMap(connection => connection.accounts).length > 0;
        const connection = connections.find(c => c.connectorId === connectorId);
        const account = connection?.accounts.filter(a => !HelpersUtil.isLowerCaseMatch(a.address, plainAddress));
        return html `
      <wui-flex flexDirection="column" .padding=${['0', 'l', '0', 'l']}>
        <wui-active-profile-wallet-item
          address=${plainAddress}
          alt=${connector?.name}
          .content=${this.getProfileContent({
            address: plainAddress,
            connections,
            connectorId,
            namespace
        })}
          .charsStart=${UI_CONFIG.ADDRESS_DISPLAY.START}
          .charsEnd=${UI_CONFIG.ADDRESS_DISPLAY.END}
          .icon=${authData.icon}
          .iconSize=${authData.iconSize}
          .iconBadge=${this.isSmartAccount(plainAddress) ? UI_CONFIG.BADGE.ICON : undefined}
          .iconBadgeSize=${this.isSmartAccount(plainAddress) ? UI_CONFIG.BADGE.SIZE : undefined}
          imageSrc=${connectorImage}
          ?enableMoreButton=${authData.isAuth}
          @copy=${() => this.handleCopyAddress(plainAddress)}
          @disconnect=${() => this.handleDisconnect(namespace, { id: connectorId })}
          @switch=${() => {
            if (isBitcoin && connection && account?.[0]) {
                this.handleSwitchWallet(connection, account[0].address, namespace);
            }
        }}
          @externalLink=${() => this.handleExternalLink(plainAddress)}
          @more=${() => this.handleMore()}
          data-testid="wui-active-profile-wallet-item"
        ></wui-active-profile-wallet-item>
        ${shouldShowSeparator ? html `<wui-separator></wui-separator>` : null}
      </wui-flex>
    `;
    }
    renderActiveConnectionsList(namespace) {
        const connections = this.getActiveConnections(namespace);
        if (connections.length === 0) {
            return null;
        }
        return html `
      <wui-flex flexDirection="column" .padding=${['0', 'xs', '0', 'xs']}>
        ${this.renderConnectionList(connections, false, namespace)}
      </wui-flex>
    `;
    }
    renderRecentConnections(namespace) {
        const { recentConnections } = ConnectionControllerUtil.getConnectionsData(namespace);
        const allAccounts = recentConnections.flatMap(connection => connection.accounts);
        if (allAccounts.length === 0) {
            return null;
        }
        return html `
      <wui-flex flexDirection="column" .padding=${['0', 'xs', '0', 'xs']} rowGap="xs">
        <wui-text color="fg-200" variant="micro-500" data-testid="recently-connected-text"
          >RECENTLY CONNECTED</wui-text
        >
        <wui-flex flexDirection="column" .padding=${['0', 'xs', '0', 'xs']}>
          ${this.renderConnectionList(recentConnections, true, namespace)}
        </wui-flex>
      </wui-flex>
    `;
    }
    renderConnectionList(connections, isRecentConnections, namespace) {
        return connections
            .filter(connection => connection.accounts.length > 0)
            .map((connection, connectionIdx) => {
            const connector = ConnectorController.getConnectorById(connection.connectorId);
            const connectorImage = AssetUtil.getConnectorImage(connector) ?? '';
            const authData = ConnectionUtil.getAuthData(connection);
            return connection.accounts.map((account, accountIdx) => {
                const shouldShowSeparator = connectionIdx !== 0 || accountIdx !== 0;
                const isLoading = this.isAccountLoading(connection.connectorId, account.address);
                return html `
            <wui-flex flexDirection="column">
              ${shouldShowSeparator ? html `<wui-separator></wui-separator>` : null}
              <wui-inactive-profile-wallet-item
                address=${account.address}
                alt=${connection.connectorId}
                buttonLabel=${isRecentConnections ? 'Connect' : 'Switch'}
                buttonVariant=${isRecentConnections ? 'neutral' : 'accent'}
                rightIcon=${isRecentConnections ? 'bin' : 'off'}
                rightIconSize="sm"
                class=${isRecentConnections ? 'recent-connection' : 'active-connection'}
                data-testid=${isRecentConnections ? 'recent-connection' : 'active-connection'}
                imageSrc=${connectorImage}
                .iconBadge=${this.isSmartAccount(account.address)
                    ? UI_CONFIG.BADGE.ICON
                    : undefined}
                .iconBadgeSize=${this.isSmartAccount(account.address)
                    ? UI_CONFIG.BADGE.SIZE
                    : undefined}
                .icon=${authData.icon}
                .iconSize=${authData.iconSize}
                .loading=${isLoading}
                .showBalance=${false}
                .charsStart=${UI_CONFIG.ADDRESS_DISPLAY.START}
                .charsEnd=${UI_CONFIG.ADDRESS_DISPLAY.END}
                @buttonClick=${() => this.handleSwitchWallet(connection, account.address, namespace)}
                @iconClick=${() => this.handleWalletAction({
                    connection,
                    address: account.address,
                    isRecentConnection: isRecentConnections,
                    namespace
                })}
              ></wui-inactive-profile-wallet-item>
            </wui-flex>
          `;
            });
        });
    }
    renderAddConnectionButton(namespace) {
        if (!this.isMultiWalletEnabled() && this.caipAddress) {
            return null;
        }
        if (!this.hasAnyConnections(namespace)) {
            return null;
        }
        const { title } = this.getChainLabelInfo(namespace);
        return html `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="plus"
        iconSize="sm"
        ?chevron=${true}
        @click=${() => this.handleAddConnection(namespace)}
        data-testid="add-connection-button"
      >
        <wui-text variant="paragraph-500" color="fg-200">${title}</wui-text>
      </wui-list-item>
    `;
    }
    renderEmptyState(namespace) {
        const { title, description } = this.getChainLabelInfo(namespace);
        return html `
      <wui-flex alignItems="flex-start" class="empty-template" data-testid="empty-template">
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="s"
          class="empty-box"
        >
          <wui-icon-box
            size="lg"
            icon="wallet"
            background="gray"
            iconColor="fg-200"
            backgroundColor="glass-002"
          ></wui-icon-box>

          <wui-flex flexDirection="column" alignItems="center" justifyContent="center" gap="3xs">
            <wui-text color="fg-100" variant="paragraph-500" data-testid="empty-state-text"
              >No wallet connected</wui-text
            >
            <wui-text color="fg-200" variant="tiny-500" data-testid="empty-state-description"
              >${description}</wui-text
            >
          </wui-flex>

          <wui-button
            variant="neutral"
            size="md"
            @click=${() => this.handleAddConnection(namespace)}
            data-testid="empty-state-button"
          >
            <wui-icon color="inherit" slot="iconLeft" name="plus"></wui-icon>
            ${title}
          </wui-button>
        </wui-flex>
      </wui-flex>
    `;
    }
    handleTabChange(index) {
        const nextNamespace = this.namespaces[index];
        if (nextNamespace) {
            this.chainListener?.();
            this.currentTab = this.namespaces.indexOf(nextNamespace);
            this.namespace = nextNamespace;
            this.caipAddress = ChainController.getAccountData(nextNamespace)?.caipAddress;
            this.profileName = ChainController.getAccountData(nextNamespace)?.profileName;
            this.chainListener = ChainController.subscribeChainProp('accountState', accountState => {
                this.caipAddress = accountState?.caipAddress;
            }, nextNamespace);
        }
    }
    async handleSwitchWallet(connection, address, namespace) {
        try {
            this.isSwitching = true;
            this.lastSelectedConnectorId = connection.connectorId;
            this.lastSelectedAddress = address;
            await ConnectionController.switchConnection({
                connection,
                address,
                namespace,
                closeModalOnConnect: false,
                onChange({ hasSwitchedAccount, hasSwitchedWallet }) {
                    if (hasSwitchedWallet) {
                        SnackController.showSuccess('Wallet switched');
                    }
                    else if (hasSwitchedAccount) {
                        SnackController.showSuccess('Account switched');
                    }
                }
            });
        }
        catch (error) {
            SnackController.showError('Failed to switch wallet');
        }
        finally {
            this.isSwitching = false;
        }
    }
    handleWalletAction(params) {
        const { connection, address, isRecentConnection, namespace } = params;
        if (isRecentConnection) {
            StorageUtil.deleteAddressFromConnection({
                connectorId: connection.connectorId,
                address,
                namespace
            });
            ConnectionController.syncStorageConnections();
            SnackController.showSuccess('Wallet deleted');
        }
        else {
            this.handleDisconnect(namespace, { id: connection.connectorId });
        }
    }
    async handleDisconnect(namespace, { id }) {
        try {
            await ConnectionController.disconnect({ id, namespace });
            SnackController.showSuccess('Wallet disconnected');
        }
        catch {
            SnackController.showError('Failed to disconnect wallet');
        }
    }
    handleCopyAddress(address) {
        CoreHelperUtil.copyToClopboard(address);
        SnackController.showSuccess('Address copied');
    }
    handleMore() {
        RouterController.push('AccountSettings');
    }
    handleExternalLink(address) {
        const explorerUrl = this.caipNetwork?.blockExplorers?.default.url;
        if (explorerUrl) {
            CoreHelperUtil.openHref(`${explorerUrl}/address/${address}`, '_blank');
        }
    }
    handleAddConnection(namespace) {
        ConnectorController.setFilterByNamespace(namespace);
        RouterController.push('Connect');
    }
    getChainLabelInfo(namespace) {
        return (CHAIN_LABELS[namespace] ?? {
            title: 'Add Wallet',
            description: 'Add your first wallet'
        });
    }
    isSmartAccount(address) {
        if (!this.namespace) {
            return false;
        }
        const smartAccount = this.user?.accounts?.find(account => account.type === 'smartAccount');
        if (smartAccount && address) {
            return HelpersUtil.isLowerCaseMatch(smartAccount.address, address);
        }
        return false;
    }
    getPlainAddress() {
        return this.caipAddress ? CoreHelperUtil.getPlainAddress(this.caipAddress) : undefined;
    }
    getActiveConnections(namespace) {
        const connectorId = this.activeConnectorIds[namespace];
        const { connections } = ConnectionControllerUtil.getConnectionsData(namespace);
        const [connectedConnection] = connections.filter(connection => HelpersUtil.isLowerCaseMatch(connection.connectorId, connectorId));
        if (!connectorId) {
            return connections;
        }
        const isBitcoin = namespace === CommonConstantsUtil.CHAIN.BITCOIN;
        const { address } = this.caipAddress ? ParseUtil.parseCaipAddress(this.caipAddress) : {};
        let addresses = [...(address ? [address] : [])];
        if (isBitcoin && connectedConnection) {
            addresses = connectedConnection.accounts.map(account => account.address) || [];
        }
        return ConnectionControllerUtil.excludeConnectorAddressFromConnections({
            connectorId,
            addresses,
            connections
        });
    }
    hasAnyConnections(namespace) {
        const connections = this.getActiveConnections(namespace);
        const { recentConnections } = ConnectionControllerUtil.getConnectionsData(namespace);
        return Boolean(this.caipAddress) || connections.length > 0 || recentConnections.length > 0;
    }
    isAccountLoading(connectorId, address) {
        return (HelpersUtil.isLowerCaseMatch(this.lastSelectedConnectorId, connectorId) &&
            HelpersUtil.isLowerCaseMatch(this.lastSelectedAddress, address) &&
            this.isSwitching);
    }
    getProfileContent(params) {
        const { address, connections, connectorId, namespace } = params;
        const [connectedConnection] = connections.filter(connection => HelpersUtil.isLowerCaseMatch(connection.connectorId, connectorId));
        if (namespace === CommonConstantsUtil.CHAIN.BITCOIN &&
            connectedConnection?.accounts.every(account => typeof account.type === 'string')) {
            return this.getBitcoinProfileContent(connectedConnection.accounts, address);
        }
        const authData = ConnectionUtil.getAuthData({ connectorId, accounts: [] });
        return [
            {
                address,
                tagLabel: 'Active',
                tagVariant: 'success',
                enableButton: true,
                profileName: this.profileName,
                buttonType: 'disconnect',
                buttonLabel: 'Disconnect',
                buttonVariant: 'neutral',
                ...(authData.isAuth
                    ? { description: this.isSmartAccount(address) ? 'Smart Account' : 'EOA Account' }
                    : {})
            }
        ];
    }
    getBitcoinProfileContent(accounts, address) {
        const hasMultipleAccounts = accounts.length > 1;
        const plainAddress = this.getPlainAddress();
        return accounts.map(account => {
            const isConnected = HelpersUtil.isLowerCaseMatch(account.address, plainAddress);
            let label = 'PAYMENT';
            if (account.type === 'ordinal') {
                label = 'ORDINALS';
            }
            return {
                address: account.address,
                tagLabel: HelpersUtil.isLowerCaseMatch(account.address, address) ? 'Active' : undefined,
                tagVariant: HelpersUtil.isLowerCaseMatch(account.address, address) ? 'success' : undefined,
                enableButton: true,
                ...(hasMultipleAccounts
                    ? {
                        label,
                        alignItems: 'flex-end',
                        buttonType: isConnected ? 'disconnect' : 'switch',
                        buttonLabel: isConnected ? 'Disconnect' : 'Switch',
                        buttonVariant: isConnected ? 'neutral' : 'accent'
                    }
                    : {
                        alignItems: 'center',
                        buttonType: 'disconnect',
                        buttonLabel: 'Disconnect',
                        buttonVariant: 'neutral'
                    })
            };
        });
    }
    removeScrollListener() {
        const connectEl = this.shadowRoot?.querySelector('.wallet-list');
        if (connectEl) {
            connectEl.removeEventListener('scroll', () => this.handleConnectListScroll());
        }
    }
    handleConnectListScroll() {
        const walletListEl = this.shadowRoot?.querySelector('.wallet-list');
        if (walletListEl) {
            this.updateScrollOpacity(walletListEl);
        }
    }
    isMultiWalletEnabled() {
        return Boolean(this.remoteFeatures?.multiWallet);
    }
    updateScrollOpacity(element) {
        element.style.setProperty('--connect-scroll--top-opacity', MathUtil.interpolate([0, UI_CONFIG.SCROLL_THRESHOLD], UI_CONFIG.OPACITY_RANGE, element.scrollTop).toString());
        element.style.setProperty('--connect-scroll--bottom-opacity', MathUtil.interpolate([0, UI_CONFIG.SCROLL_THRESHOLD], UI_CONFIG.OPACITY_RANGE, element.scrollHeight - element.scrollTop - element.offsetHeight).toString());
    }
};
W3mProfileWalletsView.styles = styles;
__decorate([
    state()
], W3mProfileWalletsView.prototype, "currentTab", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "namespace", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "namespaces", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "caipAddress", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "profileName", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "activeConnectorIds", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "lastSelectedAddress", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "lastSelectedConnectorId", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "isSwitching", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "caipNetwork", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "user", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "remoteFeatures", void 0);
__decorate([
    state()
], W3mProfileWalletsView.prototype, "tabWidth", void 0);
W3mProfileWalletsView = __decorate([
    customElement('w3m-profile-wallets-view')
], W3mProfileWalletsView);
export { W3mProfileWalletsView };
//# sourceMappingURL=index.js.map