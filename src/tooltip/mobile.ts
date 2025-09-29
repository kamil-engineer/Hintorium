import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipInstance, TooltipOptions } from "./types";

export class MobileManager {
  private static touchStartTime = 0;
  private static touchTimer: number | null = null;
  private static activeTouchTooltip: TooltipInstance | null = null;

  static isMobile(): boolean {
    return (
      window.innerWidth <= TOOLTIP_CONSTANTS.DEFAULTS.MOBILE_BREAKPOINT ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  }

  static setupMobileSupport(
    tooltip: TooltipInstance,
    target: HTMLElement,
    options: TooltipOptions
  ): void {
    if (!options.mobile?.enabled || !this.isMobile()) return;

    console.info(`ℹ️ Tooltip: Setting up mobile support for element`);
    tooltip.element.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.MOBILE);
    this.addTouchEvents(tooltip, target, options);
    target.addEventListener("contextmenu", this.handleContextMenu);
  }

  private static addTouchEvents(
    tooltip: TooltipInstance,
    target: HTMLElement,
    options: TooltipOptions
  ): void {
    const touchDelay =
      options.mobile?.touchDelay ?? TOOLTIP_CONSTANTS.DEFAULTS.TOUCH_DELAY;
    const longPressEnabled = options.mobile?.longPress ?? true;

    const handleTouchStart = () => {
      this.touchStartTime = Date.now();

      if (this.activeTouchTooltip && this.activeTouchTooltip !== tooltip) {
        this.activeTouchTooltip.hide();
      }

      if (longPressEnabled) {
        this.touchTimer = window.setTimeout(() => {
          tooltip.show();
          this.activeTouchTooltip = tooltip;
        }, touchDelay);
      }
    };

    const handleTouchEnd = () => {
      if (this.touchTimer) {
        clearTimeout(this.touchTimer);
        this.touchTimer = null;
      }

      const touchDuration = Date.now() - this.touchStartTime;

      if (!longPressEnabled && touchDuration < 300) {
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

    const handleTouchCancel = () => {
      if (this.touchTimer) {
        clearTimeout(this.touchTimer);
        this.touchTimer = null;
      }
    };

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
    target.setAttribute("data-mobile-handlers", "true");
  }

  private static handleContextMenu = (event: Event) => {
    event.preventDefault();
  };

  static hideMobileTooltips(): void {
    if (this.activeTouchTooltip) {
      this.activeTouchTooltip.hide();
      this.activeTouchTooltip = null;
    }
  }

  static cleanup(target: HTMLElement): void {
    target.removeEventListener("contextmenu", this.handleContextMenu);
    if (this.touchTimer) {
      clearTimeout(this.touchTimer);
      this.touchTimer = null;
    }
  }
}
