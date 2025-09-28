import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipInstance, TooltipOptions } from "./types";
import { TooltipValidator } from "./validator";

export class TooltipInstanceImpl implements TooltipInstance {
  public readonly id: string;
  public readonly element: HTMLDivElement;
  public readonly target: HTMLElement;
  public readonly options: Required<TooltipOptions>;

  private isVisible = false;

  constructor(
    target: HTMLElement,
    content: string,
    options: TooltipOptions = {}
  ) {
    this.id = "";
    this.options = this.normalizeOptions(options);
    this.target = target;
    this.element = this.createElement();

    this.initializeContent(content);
    this.setupEventListeners();
  }

  private createElement(): HTMLDivElement {
    const tooltip = document.createElement("div");
    tooltip.id = this.id;
    tooltip.className = `${TOOLTIP_CONSTANTS.CSS_CLASSES.BASE}`;
    return tooltip;
  }

  private setupEventListeners(): void {
    const triggers = Array.isArray(this.options.trigger)
      ? this.options.trigger
      : [this.options.trigger];

    triggers.forEach((trigger) => {
      switch (trigger) {
        case "hover":
          this.target.addEventListener("mouseenter", () => this.show());
          this.target.addEventListener("mouseleave", () => this.hide());
          break;
      }
    });
  }

  show(): void {
    console.log("hi");

    if (this.isVisible) return;

    document.body.appendChild(this.element);

    this.isVisible = true;
  }

  hide(): void {
    if (!this.isVisible) return;
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.isVisible = false;
  }

  private async initializeContent(content: string) {
    this.element.innerHTML = content;
  }

  private normalizeOptions(options: TooltipOptions): Required<TooltipOptions> {
    return {
      position: TooltipValidator.validatePosition(
        options.position,
        "constructor options.position"
      ),
      theme: TooltipValidator.validateTheme(
        options.theme,
        "constructor options.theme"
      ),
      trigger: Array.isArray(options.trigger)
        ? options.trigger
        : [options.trigger || "hover"],
    };
  }
}
