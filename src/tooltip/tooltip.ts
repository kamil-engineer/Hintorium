import { AccessibilityManager } from "./accessibility";
import { AnimationManager } from "./animation";
import { TOOLTIP_CONSTANTS } from "./constants";
import { MobileManager } from "./mobile";
import { SmartPositioning } from "./positioning";
import type { TooltipOptions } from "./types";

export class Tooltip {
  public element: HTMLElement;
  private content: string;
  private tooltipEl: HTMLDivElement | null = null;
  private options: TooltipOptions = {};
  private readonly id: string;
  private listeners: Map<string, EventListener> = new Map();

  private showTimeout: number | null = null;

  constructor(element: HTMLElement, content: string, options?: TooltipOptions) {
    this.element = element;
    this.content = content;
    this.id = this.generateId();

    if (options) {
      this.options = options;
    }

    AccessibilityManager.ensureFocusable(this.element, this.options);
    MobileManager.setupMobileSupport(this, this.element, this.options);

    this.setupListeners();
  }

  private handleTooltipShow = () => this.show();
  private handleTooltipHide = () => this.hide();
  private handleTooltipToggle = () =>
    this.tooltipEl ? this.hide() : this.show();
  private handleMouseEnter = () => this.show();
  private handleMouseLeave = () => this.hide();

  private createElement(): HTMLDivElement {
    const tooltip = document.createElement("div");
    tooltip.id = this.id;
    tooltip.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.BASE);
    tooltip.classList.add(
      this.options.theme || TOOLTIP_CONSTANTS.DEFAULT.THEME
    );
    tooltip.textContent = this.content;

    tooltip.setAttribute("data-position", this.options.position || "top");

    return tooltip;
  }

  private generateId(): string {
    return `${TOOLTIP_CONSTANTS.DEFAULT.ID_PREFIX}${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
  }

  private setupAccessibility(): void {
    if (!this.tooltipEl) return;

    AccessibilityManager.setupTooltipAccessibility(
      this.tooltipEl,
      this.element,
      this.options
    );
  }

  private setupListeners(): void {
    const eventsMap: Record<string, EventListener> = {
      mouseenter: this.handleMouseEnter,
      mouseleave: this.handleMouseLeave,
      focus: this.handleMouseEnter,
      blur: this.handleMouseLeave,
      "tooltip:show": this.handleTooltipShow,
      "tooltip:hide": this.handleTooltipHide,
      "tooltip:toggle": this.handleTooltipToggle,
    };

    Object.entries(eventsMap).forEach(([event, handler]) => {
      this.element.addEventListener(event, handler);
      this.listeners.set(event, handler);
    });
  }

  private removeListeners(): void {
    this.listeners.forEach((handler, event) => {
      this.element.removeEventListener(event, handler);
    });
    this.listeners.clear();
  }

  async show() {
    if (this.tooltipEl) return;

    const delay = this.options.delay ?? 0;

    if (delay > 0) {
      this.showTimeout = window.setTimeout(() => {
        this.showTimeout = null;
        this.showTooltip();
      }, delay);
    } else {
      this.showTooltip();
    }
  }

  private async showTooltip() {
    this.tooltipEl = this.createElement();
    this.setupAccessibility();
    document.body.appendChild(this.tooltipEl);

    SmartPositioning.position(
      this.element,
      this.tooltipEl,
      this.options.position
    );

    if (this.options.a11y?.announceOnShow) {
      AccessibilityManager.announceToScreenReader(
        `Tooltip shown: ${this.element.textContent}`
      );
    }

    await AnimationManager.show(this.tooltipEl, this.options.animation);
  }

  async hide() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
      return;
    }

    if (!this.tooltipEl) return;

    await AnimationManager.hide(this.tooltipEl);
    document.body.removeChild(this.tooltipEl);
    this.tooltipEl = null;
  }

  destroy(): void {
    this.hide();
    if (this.tooltipEl) {
      AccessibilityManager.removeTooltipAccessibility(
        this.tooltipEl,
        this.element
      );
    }
    this.removeListeners();
  }
}
