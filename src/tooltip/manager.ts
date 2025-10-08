import { TOOLTIP_CONSTANTS } from "./constants";
import { Tooltip } from "./tooltip";
import { TooltipValidator } from "./validator";

export class TooltipManager {
  private static instance: TooltipManager;
  private tooltips: Map<HTMLElement, Tooltip> = new Map();

  constructor() {}

  init(): TooltipManager {
    const tooltipElements = document.querySelectorAll<HTMLElement>(
      `[${TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP}]`
    );

    if (!TooltipValidator.isValidTooltipElements(tooltipElements)) {
      return this;
    }

    tooltipElements.forEach((tooltip) => {
      this.initializeTooltip(tooltip);
    });

    return this;
  }

  public static getInstance(): TooltipManager {
    if (!TooltipManager.instance) {
      TooltipManager.instance = new TooltipManager();
    }
    return TooltipManager.instance;
  }

  add(element: HTMLElement, content: string) {
    if (this.tooltips.has(element)) {
      this.remove(element);
    }

    const tooltip = new Tooltip(element, content);

    this.tooltips.set(element, tooltip);

    return tooltip;
  }

  remove(element: HTMLElement) {
    const tooltip = this.tooltips.get(element);

    if (tooltip) {
      tooltip.destroy();
      this.tooltips.delete(element);
    }
  }

  private initializeTooltip(element: HTMLElement) {
    const content = element.getAttribute(TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP);

    if (!content) return;

    this.add(element, content);
  }
}
