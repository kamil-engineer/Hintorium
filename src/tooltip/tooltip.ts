export class Tooltip {
  private element: HTMLElement;
  private content: string;
  private tooltipEl: HTMLDivElement | null = null;
  constructor(element: HTMLElement, content: string) {
    this.element = element;
    this.content = content;

    this.setupListeners();
  }

  private createElement(): HTMLDivElement {
    const tooltip = document.createElement("div");

    tooltip.textContent = `${this.content}`;

    return tooltip;
  }

  private setupListeners(): void {
    this.element.addEventListener("mouseenter", () => this.show());
    this.element.addEventListener("mouseleave", () => this.hide());
  }

  private show(): void {
    if (this.tooltipEl) return;

    this.tooltipEl = this.createElement();

    document.body.appendChild(this.tooltipEl);
  }

  private hide(): void {
    if (!this.tooltipEl) return;

    document.body.removeChild(this.tooltipEl);
    this.tooltipEl = null;
  }

  destroy(): void {
    this.hide();
    this.element.removeEventListener("mouseenter", () => this.show());
    this.element.removeEventListener("mouseleave", () => this.hide());
  }
}
