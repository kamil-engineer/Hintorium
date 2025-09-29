import { AccessibilityManager } from "./accessibility";
import { TOOLTIP_CONSTANTS } from "./constants";
import { MobileManager } from "./mobile";
import { SmartPositioning } from "./positioning";
import type { TooltipInstance, TooltipOptions, TooltipPosition } from "./types";
import { TooltipValidator } from "./validator";

export class TooltipInstanceImpl implements TooltipInstance {
  public readonly id: string;
  public readonly element: HTMLDivElement;
  public readonly target: HTMLElement;
  public readonly options: Required<TooltipOptions>;

  private showTimer: number | null = null;
  private hideTimer: number | null = null;
  private currentPosition: TooltipPosition;
  private isVisible = false;

  constructor(
    target: HTMLElement,
    content: string,
    options: TooltipOptions = {}
  ) {
    this.id = this.generateId();
    this.options = this.normalizeOptions(options);
    this.target = target;
    this.element = this.createElement();

    this.currentPosition = this.options.position;

    this.initializeContent(content);
    this.setupEventListeners();
    this.setupAccessibility();
  }

  private generateId(): string {
    return `${TOOLTIP_CONSTANTS.DEFAULTS.ID_PREFIX}${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
  }

  private createElement(): HTMLDivElement {
    const tooltip = document.createElement("div");
    tooltip.id = this.id;
    tooltip.className = `${TOOLTIP_CONSTANTS.CSS_CLASSES.BASE}`;
    return tooltip;
  }

  private setupEventListeners(): void {
    const triggers = Array.isArray(this.options.trigger)
      ? this.options.trigger
      : [this.options.trigger];

    triggers.forEach((trigger) => {
      switch (trigger) {
        case "hover":
          this.target.addEventListener("mouseenter", () => this.show());
          this.target.addEventListener("mouseleave", () => this.hide());
          break;
        case "focus":
          this.target.addEventListener("focus", () => this.show());
          this.target.addEventListener("blur", () => this.hide());
          break;
      }
    });
  }

  reposition() {
    if (!this.isVisible) return;

    const newPosition = SmartPositioning.positionTooltip(
      this.element,
      this.target,
      this.options
    );

    if (newPosition !== this.currentPosition) {
      this.currentPosition = newPosition;
    }
  }

  async show(): Promise<void> {
    if (this.isVisible) return;

    this.clearTimers();

    if (this.options.showDelay > 0) {
      return new Promise((resolve) => {
        this.showTimer = window.setTimeout(async () => {
          await this.performShow();
          resolve();
        }, this.options.showDelay);
      });
    }

    await this.performShow();
  }

  async hide(): Promise<void> {
    if (!this.isVisible) return;

    this.clearTimers();

    if (this.options.hideDelay > 0) {
      return new Promise((resolve) => {
        this.hideTimer = window.setTimeout(async () => {
          await this.performHide();
          resolve();
        }, this.options.hideDelay);
      });
    }

    await this.performHide();
  }

  private async performShow(): Promise<void> {
    if (this.isVisible) return;

    document.body.appendChild(this.element);
    this.reposition();

    this.isVisible = true;

    if (this.options.a11y.announceOnShow) {
      AccessibilityManager.announceToScreenReader(
        `Tooltip shown: ${this.element.textContent}`
      );
    }
  }

  private async performHide(): Promise<void> {
    if (!this.isVisible) return;

    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    this.isVisible = false;
  }

  private clearTimers(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  private async initializeContent(content: string) {
    this.element.innerHTML = content;
  }

  private setupAccessibility(): void {
    AccessibilityManager.setupTooltipAccessibility(
      this.element,
      this.target,
      this.options
    );
  }

  private normalizeOptions(options: TooltipOptions): Required<TooltipOptions> {
    return {
      position: TooltipValidator.validatePosition(
        options.position,
        "constructor options.position"
      ),
      theme: TooltipValidator.validateTheme(
        options.theme,
        "constructor options.theme"
      ),
      trigger: Array.isArray(options.trigger)
        ? options.trigger
        : [options.trigger || "hover"],
      fallbackPlacements: options.fallbackPlacements || [
        "top",
        "bottom",
        "left",
        "right",
      ],
      showDelay: TooltipValidator.validateDelay(
        options.showDelay,
        "constructor options.showDelay"
      ),
      hideDelay: TooltipValidator.validateDelay(
        options.hideDelay,
        "constructor options.hideDelay"
      ),
      boundary: options.boundary || "viewport",
      offset: options.offset || 5,
      a11y: {
        keyboard: options.a11y?.keyboard ?? true,
        announceOnShow: options.a11y?.announceOnShow ?? false,
        focusable: options.a11y?.focusable ?? true,
      },
      mobile: {
        enabled: options.mobile?.enabled ?? MobileManager.isMobile(),
        longPress: options.mobile?.longPress ?? true,
        touchDelay: TOOLTIP_CONSTANTS.DEFAULTS.TOUCH_DELAY,
      },
    };
  }
}
