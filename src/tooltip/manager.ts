import { TOOLTIP_CONSTANTS } from "./constants";
import { Tooltip } from "./tooltip";
import type { TooltipOptions, TooltipPosition } from "./types";
import { TooltipValidator } from "./validator";

export class TooltipManager {
  private static instance: TooltipManager;
  private readonly options: TooltipOptions = {};
  private tooltips: Map<HTMLElement, Tooltip> = new Map();

  constructor(options?: TooltipOptions) {
    this.options = {
      ...this.options,
      ...options,
    };
  }

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

  add(
    element: HTMLElement,
    content: string,
    options?: TooltipOptions
  ): Tooltip {
    if (this.tooltips.has(element)) {
      this.remove(element);
    }

    const tooltip = new Tooltip(element, content, options);

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

  private extractOptions(element: HTMLElement): TooltipOptions {
    const rawPosition = element.getAttribute(
      TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP_POSITION
    );

    const validatedPosition = TooltipValidator.validatePosition(rawPosition)
      ? (rawPosition as TooltipPosition)
      : TOOLTIP_CONSTANTS.DEFAULT.POSITION;

    return {
      ...this.options,
      position: validatedPosition,
    };
  }

  private initializeTooltip(element: HTMLElement) {
    const content = element.getAttribute(TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP);

    if (!content) return;

    const options = this.extractOptions(element);

    this.add(element, content, options);
  }
}
