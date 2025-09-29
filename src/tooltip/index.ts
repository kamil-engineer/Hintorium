import { TOOLTIP_CONSTANTS, TOOLTIP_MESSAGES } from "./constants";
import { TooltipInstanceImpl } from "./tooltip-instance";
import type { TooltipOptions } from "./types";
import { TooltipValidator } from "./validator";

export class TooltipManager {
  private readonly tooltipMap = new WeakMap<HTMLElement, TooltipInstanceImpl>();
  private readonly options: TooltipOptions;

  constructor(options: TooltipOptions = {}) {
    this.options = options;
  }

  init() {
    const elements = document.querySelectorAll<HTMLElement>(
      `[${TOOLTIP_CONSTANTS.ATTRIBUTES.DATA_TOOLTIP}]`
    );

    if (elements.length === 0) {
      console.info(TOOLTIP_MESSAGES.INFO.EMPTY_TOOLTIP_ELEMENTS);
    }

    elements.forEach((element, index) => {
      try {
        this.initializeElementTooltip(element);
      } catch (error) {
        console.error(
          `❌ Tooltip: Failed to initialize tooltip for element ${index + 1}:`,
          error
        );
      }
    });

    return this;
  }

  private initializeElementTooltip(element: HTMLElement): void {
    const text = element.getAttribute(
      TOOLTIP_CONSTANTS.ATTRIBUTES.DATA_TOOLTIP
    );
    if (!text) return;

    const elementOptions = this.extractElementOptions(element);
    const content = this.extractElementContent(element, text);

    const tooltip = new TooltipInstanceImpl(element, content, elementOptions);
    this.tooltipMap.set(element, tooltip);
  }

  private getElementInfo(element: HTMLElement): string {
    const tagName = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : "";
    const classes = element.className
      ? `.${element.className.split(" ").join(".")}`
      : "";
    return ` for element: <${tagName}${id}${classes}>`;
  }

  private extractElementContent(element: HTMLElement, text: string) {
    const htmlAttr = element.getAttribute(
      TOOLTIP_CONSTANTS.ATTRIBUTES.DATA_TOOLTIP_HTML
    );

    console.log(htmlAttr);

    return text;
  }

  private extractElementOptions(element: HTMLElement) {
    const positionAttr = element.getAttribute(
      TOOLTIP_CONSTANTS.ATTRIBUTES.DATA_TOOLTIP_POS
    );
    const themeAttr = element.getAttribute(
      TOOLTIP_CONSTANTS.ATTRIBUTES.DATA_TOOLTIP_THEME
    );

    const elementInfo = this.getElementInfo(element);

    return {
      ...this.options,
      position: TooltipValidator.validatePosition(
        positionAttr,
        "attribute",
        elementInfo
      ),
      theme: TooltipValidator.validateTheme(
        themeAttr,
        "attribute",
        elementInfo
      ),
    };
  }
}

export function initTooltip(options: TooltipOptions = {}): TooltipManager {
  const manager = new TooltipManager(options);
  return manager.init();
}
