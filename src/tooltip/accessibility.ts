import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipOptions } from "./types";

export class AccessibilityManager {
  private static readonly FOCUS_VISIBLE_CLASS = "focus-visible";
  private static isKeyboardUser = false;

  static init(): void {
    this.setupKeyboardDetection();
    this.addGlobalStyles();
  }

  private static setupKeyboardDetection(): void {
    let hadKeyboardEvent = false;

    const handleKeyDown = () => {
      hadKeyboardEvent = true;
      this.isKeyboardUser = true;
    };

    const handleMouseDown = () => {
      if (hadKeyboardEvent) {
        hadKeyboardEvent = false;
        this.isKeyboardUser = false;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("mousedown", handleMouseDown, true);
  }

  static setupTooltipAccessibility(
    tooltip: HTMLDivElement,
    target: HTMLElement,
    options: TooltipOptions
  ): void {
    tooltip.setAttribute("role", TOOLTIP_CONSTANTS.ARIA.ROLE_TOOLTIP);
    tooltip.id = tooltip.id || this.generateAccessibleId();

    const existingDescribedBy = target.getAttribute("aria-describedby");
    const newDescribedBy = existingDescribedBy
      ? `${existingDescribedBy} ${tooltip.id}`
      : tooltip.id;
    target.setAttribute("aria-describedby", newDescribedBy);

    if (!this.isFocusable(target) && options.a11y?.focusable !== false) {
      target.setAttribute("tabindex", "0");
      console.info(
        `ℹ️ Tooltip: Made element focusable for accessibility: ${this.getElementInfo(
          target
        )}`
      );
    }

    if (options.a11y?.keyboard !== false) {
      this.addKeyboardSupport(tooltip, target);
    }
  }

  static removeTooltipAccessibility(
    tooltip: HTMLDivElement,
    target: HTMLElement
  ): void {
    const describedBy = target.getAttribute("aria-describedby");
    if (describedBy) {
      const ids = describedBy.split(" ").filter((id) => id !== tooltip.id);
      if (ids.length > 0) {
        target.setAttribute("aria-describedby", ids.join(" "));
      } else {
        target.removeAttribute("aria-describedby");
      }
    }
  }

  private static addKeyboardSupport(
    tooltip: HTMLDivElement,
    target: HTMLElement
  ): void {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case TOOLTIP_CONSTANTS.KEYS.ESCAPE:
          tooltip.dispatchEvent(new CustomEvent("tooltip:hide"));
          event.preventDefault();
          break;
        case TOOLTIP_CONSTANTS.KEYS.ENTER:
        case TOOLTIP_CONSTANTS.KEYS.SPACE:
          if (!tooltip.classList.contains(TOOLTIP_CONSTANTS.CSS_CLASSES.SHOW)) {
            tooltip.dispatchEvent(new CustomEvent("tooltip:show"));
            event.preventDefault();
          }
          break;
      }
    };

    target.addEventListener("keydown", handleKeyDown);
    target.setAttribute("data-has-keyboard-support", "true");
  }

  static announceToScreenReader(message: string): void {
    const announcer = document.createElement("div");
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";
    announcer.style.cssText = `
      position: absolute !important;
      left: -10000px !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
    `;

    document.body.appendChild(announcer);
    announcer.textContent = message;

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  private static isFocusable(element: HTMLElement): boolean {
    const focusableSelectors = [
      "a[href]",
      "button",
      "input",
      "textarea",
      "select",
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ];

    return (
      focusableSelectors.some((selector) => element.matches(selector)) ||
      (element.hasAttribute("tabindex") &&
        element.getAttribute("tabindex") !== "-1")
    );
  }

  private static generateAccessibleId(): string {
    return `${
      TOOLTIP_CONSTANTS.DEFAULTS.ID_PREFIX
    }a11y-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private static addGlobalStyles(): void {
    if (document.getElementById("hintorium-a11y-styles")) return;

    const style = document.createElement("style");
    style.id = "hintorium-a11y-styles";
    style.textContent = `
      .sr-only {
        position: absolute !important;
        left: -10000px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        white-space: nowrap !important;
      }
      
      .hintorium-tooltip.keyboard-focus {
        outline: 2px solid #4A90E2;
        outline-offset: 2px;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .hintorium-tooltip {
          transition: none !important;
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private static getElementInfo(element: HTMLElement): string {
    const tagName = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : "";
    const classes = element.className
      ? `.${element.className.split(" ").join(".")}`
      : "";
    return `<${tagName}${id}${classes}>`;
  }
}
