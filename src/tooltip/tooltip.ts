import { AccessibilityManager } from "./accessibility";
import { AnimationManager } from "./animation";
import { TOOLTIP_CONSTANTS } from "./constants";
import { SmartPositioning } from "./positoning";
import type { TooltipOptions } from "./types";

export class Tooltip {
  private element: HTMLElement;
  private content: string;
  private tooltipEl: HTMLDivElement | null = null;
  private options: TooltipOptions = {};
  private readonly id: string;

  constructor(element: HTMLElement, content: string, options?: TooltipOptions) {
    this.element = element;
    this.content = content;
    this.id = this.generateId();

    if (options) {
      this.options = options;
    }

    AccessibilityManager.ensureFocusable(this.element, this.options);

    this.setupListeners();
  }

  private handleTooltipShow = () => this.show();
  private handleTooltipHide = () => this.hide();
  private handleTooltipToggle = () => {
    if (this.tooltipEl) {
      this.hide();
    } else {
      this.show();
    }
  };
  private handleMouseEnter = () => this.show();
  private handleMouseLeave = () => this.hide();

  private createElement(): HTMLDivElement {
    const tooltip = document.createElement("div");

    tooltip.id = this.id;
    tooltip.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.BASE);
    tooltip.classList.add(
      this.options.theme || TOOLTIP_CONSTANTS.DEFAULT.THEME
    );

    tooltip.textContent = `${this.content}`;

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
    this.element.addEventListener("mouseenter", this.handleMouseEnter);
    this.element.addEventListener("mouseleave", this.handleMouseLeave);

    this.element.addEventListener("tooltip:show", () => {
      console.log("show!");
    });
    this.element.addEventListener("tooltip:hide", this.handleTooltipHide);
    this.element.addEventListener("tooltip:toggle", this.handleTooltipToggle);
  }

  private async show() {
    if (this.tooltipEl) return;

    this.tooltipEl = this.createElement();

    this.setupAccessibility();

    document.body.appendChild(this.tooltipEl);

    SmartPositioning.position(
      this.element,
      this.tooltipEl,
      this.options.position
    );

    await AnimationManager.show(this.tooltipEl, this.options.animation);
  }

  private async hide() {
    if (!this.tooltipEl) return;

    await AnimationManager.hide(this.tooltipEl);

    document.body.removeChild(this.tooltipEl);
    this.tooltipEl = null;
  }

  destroy(): void {
    this.hide();

    this.element.removeEventListener("tooltip:show", this.handleTooltipShow);
    this.element.removeEventListener("tooltip:hide", this.handleTooltipHide);
    this.element.removeEventListener(
      "tooltip:toggle",
      this.handleTooltipToggle
    );
    this.element.removeEventListener("mouseenter", this.handleMouseEnter);
    this.element.removeEventListener("mouseleave", this.handleMouseLeave);
  }
}
