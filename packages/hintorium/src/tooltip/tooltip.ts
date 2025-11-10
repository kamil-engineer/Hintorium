import { AccessibilityManager } from "./accessibility";
import { AnimationManager } from "./animation";
import { TOOLTIP_CONSTANTS } from "./constants";
import { TooltipContent, type TooltipContentSource } from "./content";
import { MobileManager } from "./mobile";
import { SmartPositioning } from "./positioning";
import type { TooltipOptions } from "./types";

export class Tooltip {
  public element: HTMLElement;
  private contentManager: TooltipContent;
  private tooltipEl: HTMLDivElement | null = null;
  private options: TooltipOptions = {};
  private readonly id: string;
  private listeners: Map<string, EventListener> = new Map();
  private outsideClickListener:
    | ((event: MouseEvent | TouchEvent) => void)
    | null = null;
  private showTimeout: number | null = null;
  private rtl: boolean;

  constructor(
    element: HTMLElement,
    content: TooltipContentSource,
    options?: TooltipOptions
  ) {
    this.element = element;
    this.rtl = this.detectRTL();
    this.contentManager = new TooltipContent(content);
    this.id = this.generateId();

    if (options) {
      this.options = options;
    }

    AccessibilityManager.ensureFocusable(this.element, this.options);
    MobileManager.setupMobileSupport(this, this.element, this.options);

    this.setupListeners();
  }

  private handleTooltipShow = () => this.show();
  private handleTooltipHide = () => this.hide();
  private handleTooltipToggle = () =>
    this.tooltipEl ? this.hide() : this.show();
  private handleMouseEnter = () => this.show();
  private handleMouseLeave = () => this.hide();
  private handleClick = () => (this.tooltipEl ? this.hide() : this.show());

  private async createElement(): Promise<HTMLDivElement> {
    const tooltip = document.createElement("div");
    tooltip.id = this.id;
    tooltip.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.BASE);
    tooltip.classList.add(
      this.options.theme || TOOLTIP_CONSTANTS.DEFAULT.THEME
    );

    if (this.rtl) {
      tooltip.setAttribute("dir", "rtl");
      tooltip.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.RTL);
    }

    const contentNode = await this.contentManager.render();

    if (typeof contentNode === "string") {
      tooltip.innerHTML = contentNode;
    } else {
      tooltip.appendChild(contentNode);
    }
    tooltip.setAttribute("data-position", this.options.position || "top");

    return tooltip;
  }

  private generateId(): string {
    return `${TOOLTIP_CONSTANTS.DEFAULT.ID_PREFIX}${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
  }

  private setupAccessibility(): void {
    if (!this.tooltipEl) return;

    AccessibilityManager.setupTooltipAccessibility(
      this.tooltipEl,
      this.element,
      this.options
    );
  }

  private setupListeners(): void {
    const eventsMap: Record<string, EventListener> = {
      mouseenter: this.handleMouseEnter,
      mouseleave: this.options.sticky ? () => {} : this.handleMouseLeave, // 👈 ignore mouseleave if sticky
      focus: this.handleMouseEnter,
      blur: this.options.sticky ? () => {} : this.handleMouseLeave,
      "tooltip:show": this.handleTooltipShow,
      "tooltip:hide": this.handleTooltipHide,
      "tooltip:toggle": this.handleTooltipToggle,
    };

    if (this.options.sticky) {
      this.element.addEventListener("click", this.handleClick);
      this.listeners.set("click", this.handleClick);
    }

    Object.entries(eventsMap).forEach(([event, handler]) => {
      this.element.addEventListener(event, handler);
      this.listeners.set(event, handler);
    });
  }

  private removeListeners(): void {
    this.listeners.forEach((handler, event) => {
      this.element.removeEventListener(event, handler);
    });
    this.listeners.clear();
  }

  async show() {
    if (this.tooltipEl) return;

    const delay = this.options.delay ?? 0;

    if (delay > 0) {
      this.showTimeout = window.setTimeout(() => {
        this.showTimeout = null;
        this.showTooltip();
      }, delay);
    } else {
      this.showTooltip();
    }
  }

  private async showTooltip() {
    this.tooltipEl = await this.createElement();
    this.setupAccessibility();
    document.body.appendChild(this.tooltipEl);

    SmartPositioning.position(
      this.element,
      this.tooltipEl,
      this.options.position,
      this.rtl
    );

    if (this.options.a11y?.announceOnShow) {
      AccessibilityManager.announceToScreenReader(
        `Tooltip shown: ${this.element.textContent}`
      );
    }
    if (this.options.sticky) {
      this.addOutsideClickListener();
    }

    await AnimationManager.show(this.tooltipEl, this.options.animation);
  }

  private addOutsideClickListener() {
    this.outsideClickListener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (this.tooltipEl?.contains(target) || this.element.contains(target)) {
        return;
      }
      this.hide();
    };

    document.addEventListener("mousedown", this.outsideClickListener);
    document.addEventListener("touchstart", this.outsideClickListener);
  }
  async hide() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
      return;
    }

    if (!this.tooltipEl) return;

    try {
      await AnimationManager.hide(this.tooltipEl);

      this.tooltipEl?.parentNode?.removeChild(this.tooltipEl);
    } catch (err) {
      console.warn("[Hintorium Tooltip] Error hiding tooltip:", err);
    } finally {
      this.tooltipEl = null;
    }
  }

  /**
   * Detect if RTL is enabled.
   */

  detectRTL(): boolean {
    if (this.options.rtl) return this.options.rtl;

    const dir =
      this.element.dir || document.documentElement.dir || document.body.dir;

    if (dir) return dir.toLowerCase() === "rtl";

    const lang = document.documentElement.lang?.toLowerCase() ?? "";
    const rtlLangs = ["ar", "he", "fa", "ur"];
    return rtlLangs.some((prefix) => lang.startsWith(prefix));
  }

  isRTL(): boolean {
    return this.rtl;
  }

  destroy(): void {
    this.hide();
    if (this.tooltipEl) {
      AccessibilityManager.removeTooltipAccessibility(
        this.tooltipEl,
        this.element
      );
    }
    this.removeListeners();
  }
}
