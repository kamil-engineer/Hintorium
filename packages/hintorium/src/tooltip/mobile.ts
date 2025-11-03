import { TOOLTIP_CONSTANTS } from "./constants";
import type { Tooltip } from "./tooltip";
import type { TooltipOptions } from "./types";

/**
 * Manages tooltip behavior on mobile and touch devices.
 * Supports long-press, single taps, context menu prevention,
 * and automatic hiding of active tooltips.
 *
 * Ensures compatibility with various environments (mobile, tablet, touch desktop).
 */

export class MobileManager {
  /** Timer that supports long-press / touch-delay */
  private static touchTimer: number | null = null;
  /** Currently active tooltip triggered by touch */
  private static activeTouchTooltip: Tooltip | null = null;

  /** Stores assigned event handlers for a given element */
  private static touchHandlers = new WeakMap<
    HTMLElement,
    { start: EventListener; end: EventListener; cancel: EventListener }
  >();

  /**
   * Checks whether the current environment is a mobile or touch-enabled device.
   * Uses several heuristics: window width, presence of `ontouchstart`, and `maxTouchPoints`.
   *
   * @returns {boolean} `true` if the device supports touch or has a small viewport.
   */
  static isMobile(): boolean {
    if (typeof window === "undefined") return false;

    return (
      window.innerWidth <= TOOLTIP_CONSTANTS.DEFAULT.MOBILE_BREAKPOINT ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  }

  /**
   * Resolves mobile configuration for tooltip behavior.
   * Decides whether mobile support should be enabled based on user options and environment.
   *
   * @param globalOptions - The global tooltip options provided by the user.
   * @returns A normalized mobile options object.
   */
  static resolveMobileOptions(globalOptions?: TooltipOptions["mobile"]) {
    const enabled =
      globalOptions?.enabled !== undefined
        ? globalOptions.enabled
        : MobileManager.isMobile();

    return {
      enabled,
      longPress: globalOptions?.longPress ?? true,
      touchDelay:
        globalOptions?.touchDelay ?? TOOLTIP_CONSTANTS.DEFAULT.TOUCH_DELAY,
    };
  }

  /**
   * Initializes touch support for a specific tooltip.
   * Adds classes and listens for gestures (tap, long-press).
   *
   * @param tooltip - Tooltip instance.
   * @param target - Element on which the tooltip is activated.
   * @param options - Tooltip options (including mobile).
   */

  static setupMobileSupport(
    tooltip: Tooltip,
    target: HTMLElement,
    options: TooltipOptions
  ): void {
    const mobileOpts = options.mobile ?? this.resolveMobileOptions();

    if (!mobileOpts.enabled || !this.isMobile()) return;

    if (target.getAttribute("data-mobile-handlers") === "true") return;

    tooltip.element.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.MOBILE);

    this.addTouchEvents(tooltip, target, options);

    target.addEventListener("contextmenu", this.handleContextMenu);
    target.setAttribute("data-mobile-handlers", "true");
  }

  /**
   * Adds touch event handling to the target element.
   * Supports both long-presses (after the specified `touchDelay`)
   * and single taps if `longPress` is disabled.
   *
   * @private
   */

  private static addTouchEvents(
    tooltip: Tooltip,
    target: HTMLElement,
    options: TooltipOptions
  ): void {
    const { mobile: { longPress, touchDelay } = {} } = options;

    const clearTouchTimer = () => {
      if (this.touchTimer) {
        clearTimeout(this.touchTimer);
        this.touchTimer = null;
      }
    };

    const handleTouchStart = () => {
      clearTouchTimer();

      if (this.activeTouchTooltip && this.activeTouchTooltip !== tooltip) {
        this.activeTouchTooltip.hide();
        this.activeTouchTooltip = null;
      }

      if (longPress) {
        this.touchTimer = window.setTimeout(() => {
          const isVisibleNow = tooltip.element.classList.contains(
            TOOLTIP_CONSTANTS.CSS_CLASSES.SHOW
          );

          if (isVisibleNow) {
            tooltip.hide();
            this.activeTouchTooltip = null;
          } else {
            tooltip.show();
            this.activeTouchTooltip = tooltip;
          }

          this.touchTimer = null;
        }, touchDelay);
      } else {
        const isVisible = tooltip.element.classList.contains(
          TOOLTIP_CONSTANTS.CSS_CLASSES.SHOW
        );
        if (isVisible) {
          tooltip.hide();
          this.activeTouchTooltip = null;
        } else {
          tooltip.show();
          this.activeTouchTooltip = tooltip;
        }
      }
    };

    const handleTouchEnd = () => clearTouchTimer();
    const handleTouchCancel = () => clearTouchTimer();

    const startEvent = window.PointerEvent ? "pointerdown" : "touchstart";
    const endEvent = window.PointerEvent ? "pointerup" : "touchend";
    const cancelEvent = window.PointerEvent ? "pointercancel" : "touchcancel";

    target.addEventListener(startEvent, handleTouchStart, { passive: true });
    target.addEventListener(endEvent, handleTouchEnd, { passive: true });
    target.addEventListener(cancelEvent, handleTouchCancel, { passive: true });

    this.touchHandlers.set(target, {
      start: handleTouchStart,
      end: handleTouchEnd,
      cancel: handleTouchCancel,
    });
  }

  /**
   * Blocks the display of the context menu (long-press menu).
   * @private
   */

  private static handleContextMenu(event: Event): void {
    event.preventDefault();
  }

  /**
   * Hides the currently active touch tooltip (if any)
   * and clears any active long-press timer.
   */

  static hideMobileTooltips(): void {
    if (this.activeTouchTooltip) {
      this.activeTouchTooltip.hide();
      this.activeTouchTooltip = null;
    }
    this.touchTimer && clearTimeout(this.touchTimer);
    this.touchTimer = null;
  }

  /**
   * Removes all event listeners and clears the touch state
   * assigned to the target element.
   *
   * @param target - The element for which cleanup should be performed.
   */

  static cleanup(target: HTMLElement): void {
    target.removeEventListener("contextmenu", this.handleContextMenu);

    const handlers = this.touchHandlers.get(target);
    if (handlers) {
      const startEvent = window.PointerEvent ? "pointerdown" : "touchstart";
      const endEvent = window.PointerEvent ? "pointerup" : "touchend";
      const cancelEvent = window.PointerEvent ? "pointercancel" : "touchcancel";

      target.removeEventListener(startEvent, handlers.start);
      target.removeEventListener(endEvent, handlers.end);
      target.removeEventListener(cancelEvent, handlers.cancel);

      this.touchHandlers.delete(target);
    }

    target.removeAttribute("data-mobile-handlers");

    if (this.touchTimer) {
      clearTimeout(this.touchTimer);
      this.touchTimer = null;
    }

    this.activeTouchTooltip = null;
  }
}
