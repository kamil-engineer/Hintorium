import { AnimationManager } from "./animation";
import { TOOLTIP_CONSTANTS } from "./constants";

export class Tooltip {
  private element: HTMLElement;
  private content: string;
  private tooltipEl: HTMLDivElement | null = null;
  constructor(element: HTMLElement, content: string) {
    this.element = element;
    this.content = content;

    this.setupListeners();
  }

  private handleMouseEnter = () => this.show();
  private handleMouseLeave = () => this.hide();

  private createElement(): HTMLDivElement {
    const tooltip = document.createElement("div");

    tooltip.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.BASE);

    tooltip.textContent = `${this.content}`;

    return tooltip;
  }

  private setupListeners(): void {
    this.element.addEventListener("mouseenter", this.handleMouseEnter);
    this.element.addEventListener("mouseleave", this.handleMouseLeave);
  }

  private async show() {
    if (this.tooltipEl) return;

    this.tooltipEl = this.createElement();

    document.body.appendChild(this.tooltipEl);

    await AnimationManager.show(this.tooltipEl);
  }

  private async hide() {
    if (!this.tooltipEl) return;

    await AnimationManager.hide(this.tooltipEl);

    document.body.removeChild(this.tooltipEl);
    this.tooltipEl = null;
  }

  destroy(): void {
    this.hide();
    this.element.removeEventListener("mouseenter", this.handleMouseEnter);
    this.element.removeEventListener("mouseleave", this.handleMouseLeave);
  }
}
