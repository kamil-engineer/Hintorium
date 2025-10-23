import { TOOLTIP_CONSTANTS } from "./constants";
import type { Tooltip } from "./tooltip";
import type { TooltipOptions } from "./types";

export class MobileManager {
  protected static touchStartTime = 0;
  private static touchTimer: number | null = null;
  private static activeTouchTooltip: Tooltip | null = null;

  static isMobile(): boolean {
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

  static setupMobileSupport(
    tooltip: Tooltip,
    target: HTMLElement,
    options: TooltipOptions
  ): void {
    if (!options.mobile?.enabled || !this.isMobile()) return;

    if (target.getAttribute("data-mobile-handlers") === "true") return;

    console.info(`ℹ️ Tooltip: Setting up mobile support for element`);

    tooltip.element.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.MOBILE);

    this.addTouchEvents(tooltip, target, options);

    target.addEventListener("contextmenu", this.handleContextMenu);
    target.setAttribute("data-mobile-handlers", "true");
  }

  private static addTouchEvents(
    tooltip: Tooltip,
    target: HTMLElement,
    options: TooltipOptions
  ): void {
    const touchDelay =
      options.mobile?.touchDelay ?? TOOLTIP_CONSTANTS.DEFAULT.TOUCH_DELAY;
    const longPressEnabled = options.mobile?.longPress ?? true;

    const clearTouchTimer = () => {
      if (this.touchTimer) {
        clearTimeout(this.touchTimer);
        this.touchTimer = null;
      }
    };

    const handleTouchStart = () => {
      this.touchStartTime = Date.now();

      if (this.activeTouchTooltip && this.activeTouchTooltip !== tooltip) {
        this.activeTouchTooltip.hide();
      }

      const isVisible = tooltip.element.classList.contains(
        TOOLTIP_CONSTANTS.CSS_CLASSES.SHOW
      );

      if (longPressEnabled) {
        this.touchTimer = window.setTimeout(() => {
          if (isVisible) {
            tooltip.hide();
            this.activeTouchTooltip = null;
          } else {
            tooltip.show();
            this.activeTouchTooltip = tooltip;
          }
          this.touchTimer = null;
        }, touchDelay);
      } else {
        if (isVisible) {
          tooltip.hide();
          this.activeTouchTooltip = null;
        } else {
          tooltip.show();
          this.activeTouchTooltip = tooltip;
        }
      }
    };

    const handleTouchEnd = () => {
      clearTouchTimer();

      if (!longPressEnabled) {
        if (
          tooltip.element.classList.contains(TOOLTIP_CONSTANTS.CSS_CLASSES.SHOW)
        ) {
          tooltip.hide();
          this.activeTouchTooltip = null;
        } else {
          tooltip.show();
          this.activeTouchTooltip = tooltip;
        }
      }
    };

    const handleTouchCancel = () => clearTouchTimer();

    target.addEventListener(
      TOOLTIP_CONSTANTS.EVENTS.TOUCH_START,
      handleTouchStart,
      { passive: true }
    );
    target.addEventListener(
      TOOLTIP_CONSTANTS.EVENTS.TOUCH_END,
      handleTouchEnd,
      { passive: true }
    );
    target.addEventListener(
      TOOLTIP_CONSTANTS.EVENTS.TOUCH_CANCEL,
      handleTouchCancel,
      { passive: true }
    );
  }

  private static handleContextMenu(event: Event): void {
    event.preventDefault();
  }

  static hideMobileTooltips(): void {
    if (this.activeTouchTooltip) {
      this.activeTouchTooltip.hide();
      this.activeTouchTooltip = null;
    }
    this.touchTimer && clearTimeout(this.touchTimer);
    this.touchTimer = null;
  }

  static cleanup(target: HTMLElement): void {
    target.removeEventListener("contextmenu", this.handleContextMenu);
    target.removeAttribute("data-mobile-handlers");
    this.touchTimer && clearTimeout(this.touchTimer);
    this.touchTimer = null;
    this.activeTouchTooltip = null;
  }
}
