import { TOOLTIP_CONSTANTS } from "./constants";
import { TooltipManager } from "./manager";
import type { TooltipOptions } from "./types";

/**
 * InlineHint
 * ----------
 * Utility class for adding small "?" inline icons that display hints using the existing Tooltip system.
 *
 * Supports both programmatic and declarative (HTML data attributes) usage.
 *
 * @example
 * new InlineHint(labelEl, "Explain the field", { position: "right" });
 *
 * // or declarative
 * <span data-hint="Explain" data-hint-position="bottom"></span>
 */

export class InlineHint {
  private manager: TooltipManager;
  private icon: HTMLElement;

  constructor(parent: HTMLElement, content: string, options?: TooltipOptions) {
    this.manager = TooltipManager.getInstance();
    this.icon = this.createHintIcon();
    parent.appendChild(this.icon);

    const finalOptions =
      options ?? InlineHint.extractOptionsFromElement(parent, this.manager);
    this.manager.add(this.icon, content, finalOptions);
  }

  /**
   * Initializes all inline hints in the DOM with [data-hintorium-hint].
   */

  static initFromDOM(): void {
    const manager = TooltipManager.getInstance();

    const hintElements = document.querySelectorAll<HTMLElement>(
      `[${TOOLTIP_CONSTANTS.ATTRIBUTES.HINT_TOOLTIP}]`
    );

    hintElements.forEach((hintElement) => {
      if (hintElement.querySelector(`.${TOOLTIP_CONSTANTS.CSS_CLASSES.HINT}`))
        return;

      const content = hintElement.getAttribute(
        TOOLTIP_CONSTANTS.ATTRIBUTES.HINT_TOOLTIP
      );

      if (!content) return;

      const options = InlineHint.extractOptionsFromElement(
        hintElement,
        manager
      );

      new InlineHint(hintElement, content, options);
    });
  }

  /**
   * Remove hint from DOM and TooltipManager
   */
  destroy(): void {
    this.manager.remove(this.icon);
    this.icon.remove();
  }

  /**
   * Reuseable hintorium options on hint tooltip.
   */

  private static extractOptionsFromElement(
    element: HTMLElement,
    manager: TooltipManager
  ): TooltipOptions {
    if (typeof manager["extractOptions"] === "function") {
      return manager["extractOptions"](element);
    }

    return {};
  }

  /**
   * Create Hint Icon with custom css class and a11y.
   */

  private createHintIcon(): HTMLElement {
    const icon = document.createElement("span");
    icon.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.HINT);
    icon.setAttribute("tabindex", "0");
    icon.setAttribute("aria-label", "Show hint");
    icon.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4"/>
      <line x1="12" y1="17" x2="12" y2="17"/>
    </svg>
  `;
    return icon;
  }
}
