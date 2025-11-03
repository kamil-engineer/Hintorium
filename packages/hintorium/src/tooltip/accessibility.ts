import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipOptions } from "./types";

/**
 * @class AccessibilityManager
 * @description
 * Class responsible for accessibility management (a11y) for Hintorium tooltips.
 *
 * Supports:
 * - assigning ARIA roles and relationships (`aria-describedby`, `role="tooltip"`),
 * - keyboard support (ESC, Enter, Space),
 * - ensuring focusability of target elements,
 * - messages for screen readers (aria-live),
 * - detecting interaction mode (keyboard/mouse),
 * - adding global accessibility styles (e.g., `.sr-only`).
 *
 * The class is static, so it does not require an instance.
 */

export class AccessibilityManager {
  /** CSS class added when keyboard focus is applied. */
  protected static readonly FOCUS_VISIBLE_CLASS = `keyboard-focus`;
  /** Flag indicating whether the user is currently using the keyboard. */
  protected static isKeyboardUser = false;

  static init() {
    if (typeof document === "undefined") return;

    this.setupKeyboardDetection();
    this.setupFocusListeners();
  }

  /**
   * Detects whether the user is using the keyboard (e.g., Tab vs. Mouse).
   */

  private static setupKeyboardDetection(): void {
    document.addEventListener(
      TOOLTIP_CONSTANTS.EVENTS.KEYDOWN,
      (ev) => {
        if (ev.key === TOOLTIP_CONSTANTS.KEYS.TAB) {
          this.isKeyboardUser = true;
        }
      },
      true
    );

    document.addEventListener(
      TOOLTIP_CONSTANTS.EVENTS.MOUSE_DOWN,
      () => {
        this.isKeyboardUser = false;
      },
      true
    );
  }

  /**
   * Returns whether the user is currently using the keyboard.
   */
  static isKeyboardMode(): boolean {
    return this.isKeyboardUser;
  }

  /**
   * Checks whether a given element can be focused.
   * @param element - the element to check
   */

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

  /**
   * Configures the ARIA relationship between the tooltip and the target element.
   * @param tooltip - the tooltip element
   * @param target - the element to which the tooltip is assigned
   * @param options - tooltip options (from section a11y)
   */

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
      this.addKeyboardSupport(target);
    }

    this.ensureFocusable(target, options);
  }

  /**
   * Sets a global focus event listener for the document,
   * to add and remove the visual focus class (`.keyboard-focus`)
   * only when the user is using the keyboard (e.g., pressing Tab).
   */

  private static setupFocusListeners(): void {
    if (typeof document === "undefined") return;

    document.addEventListener("focusin", (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      if (this.isKeyboardUser) el.classList.add(this.FOCUS_VISIBLE_CLASS);
    });

    document.addEventListener("focusout", (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      el.classList.remove(this.FOCUS_VISIBLE_CLASS);
    });
  }

  /**
   * Adds keyboard support to the tooltip's target element.
   * Responds to the following keys: ESC (close), Enter / Space (toggle).
   * @param target - the element to which the tooltip is assigned
   */

  private static addKeyboardSupport(target: HTMLElement): void {
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

  /**
   * Removes ARIA relationships after the tooltip is destroyed.
   * @param tooltip - tooltip element
   * @param target - target element
   */

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

  /**
   * Sends a message to the screen reader (aria-live).
   * @param message - the message content to be announced
   */

  static announceToScreenReader(message: string): void {
    const announcer = document.createElement("div");
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";

    announcer.textContent = message;
    document.body.appendChild(announcer);

    setTimeout(() => announcer.remove(), 1000);
  }

  /**
   * Ensures that the tooltip target is focusable.
   * @param target - tooltip target
   * @param options - tooltip options
   */

  static ensureFocusable(target: HTMLElement, options: TooltipOptions): void {
    if (!this.isFocusable(target) && options.a11y?.focusable !== false) {
      target.setAttribute("tabindex", "0");
    }
  }
}
