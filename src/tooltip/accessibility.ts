import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipOptions } from "./types";

export class AccessibilityManager {
  private static readonly FOCUS_VISIBLE_CLASS = "focus-visible";
  private static isKeyboardUser = false;

  static init() {
    this.setupKeyboardDetection();
    this.addGlobalStyles();
  }

  private static setupKeyboardDetection(): void {
    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          this.isKeyboardUser = true;
        }
      },
      true
    );

    document.addEventListener(
      "mousedown",
      () => {
        this.isKeyboardUser = false;
      },
      true
    );
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

  static setupTooltipAccessibility(
    tooltip: HTMLDivElement,
    target: HTMLElement,
    options: TooltipOptions
  ): void {
    tooltip.setAttribute("role", TOOLTIP_CONSTANTS.ARIA.ROLE_TOOLTIP);

    const existingDescribedBy = target.getAttribute("aria-describedby") || "";
    const ids = existingDescribedBy.split(/\s+/).filter(Boolean);

    if (!ids.includes(tooltip.id)) {
      ids.push(tooltip.id);
      target.setAttribute("aria-describedby", ids.join(" "));
    }

    if (options.a11y?.keyboard !== false) {
      this.addKeyboardSupport(tooltip, target);
    }
  }

  private static addKeyboardSupport(
    _: HTMLDivElement,
    target: HTMLElement
  ): void {
    if (target.getAttribute("data-has-keyboard-support") === "true") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case TOOLTIP_CONSTANTS.KEYS.ESCAPE:
          target.dispatchEvent(
            new CustomEvent("tooltip:hide", { bubbles: true })
          );
          event.preventDefault();
          break;

        case TOOLTIP_CONSTANTS.KEYS.ENTER:
        case TOOLTIP_CONSTANTS.KEYS.SPACE:
          target.dispatchEvent(
            new CustomEvent("tooltip:toggle", { bubbles: true })
          );
          event.preventDefault();
          break;
      }
    };

    target.addEventListener("keydown", handleKeyDown);
    target.setAttribute("data-has-keyboard-support", "true");
  }

  static ensureFocusable(target: HTMLElement, options: TooltipOptions): void {
    if (!this.isFocusable(target) && options.a11y?.focusable !== false) {
      target.setAttribute("tabindex", "0");
    }
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
}
