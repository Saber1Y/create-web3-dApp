var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import { colorStyles, elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiIconLink = class WuiIconLink extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.disabled = false;
        this.icon = 'copy';
        this.iconColor = 'inherit';
    }
    render() {
        this.dataset['size'] = this.size;
        let borderRadius = '';
        let padding = '';
        switch (this.size) {
            case 'lg':
                borderRadius = '--wui-border-radius-xs';
                padding = '--wui-spacing-1xs';
                break;
            case 'sm':
                borderRadius = '--wui-border-radius-3xs';
                padding = '--wui-spacing-xxs';
                break;
            default:
                borderRadius = '--wui-border-radius-xxs';
                padding = '--wui-spacing-2xs';
                break;
        }
        this.style.cssText = `
    --local-border-radius: var(${borderRadius});
    --local-padding: var(${padding});
    `;
        return html `
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `;
    }
};
WuiIconLink.styles = [resetStyles, elementStyles, colorStyles, styles];
__decorate([
    property()
], WuiIconLink.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], WuiIconLink.prototype, "disabled", void 0);
__decorate([
    property()
], WuiIconLink.prototype, "icon", void 0);
__decorate([
    property()
], WuiIconLink.prototype, "iconColor", void 0);
WuiIconLink = __decorate([
    customElement('wui-icon-link')
], WuiIconLink);
export { WuiIconLink };
//# sourceMappingURL=index.js.map