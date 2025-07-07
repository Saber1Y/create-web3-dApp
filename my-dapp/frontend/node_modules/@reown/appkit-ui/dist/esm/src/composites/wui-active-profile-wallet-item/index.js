var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import '../../composites/wui-icon-link/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { UiHelperUtil } from '../../utils/UiHelperUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-button/index.js';
import '../wui-tag/index.js';
import '../wui-wallet-image/index.js';
import styles from './styles.js';
let WuiActiveProfileWalletItem = class WuiActiveProfileWalletItem extends LitElement {
    constructor() {
        super(...arguments);
        this.address = '';
        this.profileName = '';
        this.content = [];
        this.alt = '';
        this.imageSrc = '';
        this.icon = undefined;
        this.iconSize = 'md';
        this.iconBadge = undefined;
        this.iconBadgeSize = 'md';
        this.buttonVariant = 'neutral';
        this.enableMoreButton = false;
        this.charsStart = 4;
        this.charsEnd = 6;
    }
    render() {
        return html `
      <wui-flex flexDirection="column" rowGap="xs">
        ${this.topTemplate()} ${this.bottomTemplate()}
      </wui-flex>
    `;
    }
    topTemplate() {
        return html `
      <wui-flex alignItems="flex-start" justifyContent="space-between">
        ${this.imageOrIconTemplate()}
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="copy"
          @click=${this.dispatchCopyEvent}
        ></wui-icon-link>
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="externalLink"
          @click=${this.dispatchExternalLinkEvent}
        ></wui-icon-link>
        ${this.enableMoreButton
            ? html `<wui-icon-link
              iconColor="fg-200"
              size="sm"
              icon="threeDots"
              @click=${this.dispatchMoreButtonEvent}
              data-testid="wui-active-profile-wallet-item-more-button"
            ></wui-icon-link>`
            : null}
      </wui-flex>
    `;
    }
    bottomTemplate() {
        return html ` <wui-flex flexDirection="column">${this.contentTemplate()}</wui-flex> `;
    }
    imageOrIconTemplate() {
        if (this.icon) {
            return html `
        <wui-flex flexGrow="1" alignItems="center">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>

            ${this.iconBadge
                ? html `<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`
                : null}
          </wui-flex>
        </wui-flex>
      `;
        }
        return html `
      <wui-flex flexGrow="1" alignItems="center">
        <wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>
      </wui-flex>
    `;
    }
    contentTemplate() {
        if (this.content.length === 0) {
            return null;
        }
        return html `
      <wui-flex flexDirection="column" rowGap="s">
        ${this.content.map(item => this.labelAndTagTemplate(item))}
      </wui-flex>
    `;
    }
    labelAndTagTemplate({ address, profileName, label, description, enableButton, buttonType, buttonLabel, buttonVariant, tagVariant, tagLabel, alignItems = 'flex-end' }) {
        return html `
      <wui-flex justifyContent="space-between" alignItems=${alignItems} columnGap="3xs">
        <wui-flex flexDirection="column" rowGap="4xs">
          ${label ? html `<wui-text variant="micro-600" color="fg-200">${label}</wui-text>` : null}

          <wui-flex alignItems="center" columnGap="3xs">
            <wui-text variant="small-500" color="fg-100">
              ${UiHelperUtil.getTruncateString({
            string: profileName || address,
            charsStart: profileName ? 16 : this.charsStart,
            charsEnd: profileName ? 0 : this.charsEnd,
            truncate: profileName ? 'end' : 'middle'
        })}
            </wui-text>

            ${tagVariant && tagLabel
            ? html `<wui-tag variant=${tagVariant} size="xs">${tagLabel}</wui-tag>`
            : null}
          </wui-flex>

          ${description
            ? html `<wui-text variant="tiny-500" color="fg-200">${description}</wui-text>`
            : null}
        </wui-flex>

        ${enableButton ? this.buttonTemplate({ buttonType, buttonLabel, buttonVariant }) : null}
      </wui-flex>
    `;
    }
    buttonTemplate({ buttonType, buttonLabel, buttonVariant }) {
        return html `
      <wui-button
        size="xs"
        variant=${buttonVariant}
        @click=${buttonType === 'disconnect'
            ? this.dispatchDisconnectEvent.bind(this)
            : this.dispatchSwitchEvent.bind(this)}
        data-testid=${buttonType === 'disconnect'
            ? 'wui-active-profile-wallet-item-disconnect-button'
            : 'wui-active-profile-wallet-item-switch-button'}
      >
        ${buttonLabel}
      </wui-button>
    `;
    }
    dispatchDisconnectEvent() {
        this.dispatchEvent(new CustomEvent('disconnect', { bubbles: true, composed: true }));
    }
    dispatchSwitchEvent() {
        this.dispatchEvent(new CustomEvent('switch', { bubbles: true, composed: true }));
    }
    dispatchExternalLinkEvent() {
        this.dispatchEvent(new CustomEvent('externalLink', { bubbles: true, composed: true }));
    }
    dispatchMoreButtonEvent() {
        this.dispatchEvent(new CustomEvent('more', { bubbles: true, composed: true }));
    }
    dispatchCopyEvent() {
        this.dispatchEvent(new CustomEvent('copy', { bubbles: true, composed: true }));
    }
};
WuiActiveProfileWalletItem.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiActiveProfileWalletItem.prototype, "address", void 0);
__decorate([
    property()
], WuiActiveProfileWalletItem.prototype, "profileName", void 0);
__decorate([
    property({ type: Array })
], WuiActiveProfileWalletItem.prototype, "content", void 0);
__decorate([
    property()
], WuiActiveProfileWalletItem.prototype, "alt", void 0);
__decorate([
    property()
], WuiActiveProfileWalletItem.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiActiveProfileWalletItem.prototype, "icon", void 0);
__decorate([
    property()
], WuiActiveProfileWalletItem.prototype, "iconSize", void 0);
__decorate([
    property()
], WuiActiveProfileWalletItem.prototype, "iconBadge", void 0);
__decorate([
    property()
], WuiActiveProfileWalletItem.prototype, "iconBadgeSize", void 0);
__decorate([
    property()
], WuiActiveProfileWalletItem.prototype, "buttonVariant", void 0);
__decorate([
    property({ type: Boolean })
], WuiActiveProfileWalletItem.prototype, "enableMoreButton", void 0);
__decorate([
    property({ type: Number })
], WuiActiveProfileWalletItem.prototype, "charsStart", void 0);
__decorate([
    property({ type: Number })
], WuiActiveProfileWalletItem.prototype, "charsEnd", void 0);
WuiActiveProfileWalletItem = __decorate([
    customElement('wui-active-profile-wallet-item')
], WuiActiveProfileWalletItem);
export { WuiActiveProfileWalletItem };
//# sourceMappingURL=index.js.map