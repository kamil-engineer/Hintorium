import { AccessibilityManager } from "./accessibility";
import { TOOLTIP_CONSTANTS } from "./constants";
import { MobileManager } from "./mobile";
import { Tooltip } from "./tooltip";
import type { TooltipOptions } from "./types";
import { TooltipValidator } from "./validator";

/**
 * Central controller responsible for managing all tooltip instances across the application.
 *
 * Handles creation, initialization, removal, and configuration of tooltips.
 * Implements the Singleton pattern to ensure a single consistent manager instance.
 *
 * Responsibilities:
 * - Automatically initializes tooltips based on data attributes in the DOM.
 * - Integrates accessibility (ARIA) and mobile gesture support.
 * - Manages tooltip lifecycle and global cleanup.
 */

export class TooltipManager {
  private static instance: TooltipManager;
  private readonly options: TooltipOptions = {};
  private tooltips: Map<HTMLElement, Tooltip> = new Map();
  private isInitialized = false;

  constructor(options?: TooltipOptions) {
    this.options = {
      ...options,
    };
  }

  /**
   * Returns the single instance of TooltipManager (Singleton pattern).
   */

  public static getInstance(): TooltipManager {
    if (!TooltipManager.instance) {
      TooltipManager.instance = new TooltipManager();
    }
    return TooltipManager.instance;
  }

  /**
   * Initializes all tooltips found in the DOM that contain the tooltip attribute.
   * Also sets up global listeners for touch devices and initializes accessibility support.
   */

  init(): TooltipManager {
    if (this.isInitialized) return this;
    this.isInitialized = true;

    AccessibilityManager.init();
    this.registerGlobalTouchListener();
    this.initializeAllTooltips();

    return this;
  }

  /**
   * Creates and registers a new tooltip instance for the given element.
   *
   * If a tooltip already exists for the same element, it will be removed
   * and replaced with a new instance. This ensures that each element has
   * at most one active tooltip at any given time.
   *
   * The provided options are merged with both global manager defaults
   * and tooltip-level overrides to ensure consistent configuration.
   *
   * @param {HTMLElement} element - The target element to which the tooltip is bound.
   * @param {string} content - The text or HTML content displayed inside the tooltip.
   * @param {TooltipOptions} [options] - Optional configuration overrides for this tooltip.
   * @returns {Tooltip} The newly created {@link Tooltip} instance.
   *
   * @example
   * const manager = TooltipManager.getInstance();
   * const button = document.querySelector('#save');
   * manager.add(button, 'Click to save your progress', { position: 'bottom' });
   */

  add(
    element: HTMLElement,
    content: string,
    options?: TooltipOptions
  ): Tooltip {
    if (this.tooltips.has(element)) {
      this.remove(element);
    }

    const mergedOptions: TooltipOptions = {
      ...this.options,
      ...options,
    };

    console.log(mergedOptions);

    const tooltip = new Tooltip(element, content, mergedOptions);

    this.tooltips.set(element, tooltip);

    return tooltip;
  }

  /**
   * Removes and destroys an existing tooltip associated with a specific element.
   *
   * This method ensures full cleanup by calling the tooltip’s internal `destroy()`
   * method, removing mobile-related listeners via {@link MobileManager.cleanup},
   * and deleting the reference from the manager’s internal Map.
   *
   * @param {HTMLElement} element - The element whose tooltip should be removed.
   *
   * @example
   * const button = document.querySelector('#save');
   * tooltipManager.remove(button);
   */

  remove(element: HTMLElement) {
    if (!element) return;

    const tooltip = this.tooltips.get(element);

    if (!tooltip) return;

    tooltip.destroy();
    MobileManager.cleanup(element);
    this.tooltips.delete(element);
  }

  /**
   * Extracts and normalizes tooltip configuration options from a given HTML element.
   *
   * This method reads tooltip-related attributes from the target element (such as
   * position, theme, and animation), validates them using {@link TooltipValidator},
   * and merges them with global and default configuration values.
   *
   * Additionally, mobile-specific behavior is automatically resolved via
   * {@link MobileManager.resolveMobileOptions}, which determines whether mobile
   * support should be enabled based on the current environment and user-provided options.
   *
   * The resulting configuration object ensures consistent, validated tooltip behavior
   * across all initialization methods (attribute-based and programmatic).
   *
   * @private
   * @param {HTMLElement} element - The target element containing tooltip attributes.
   * @returns {TooltipOptions} A fully merged and validated tooltip configuration object.
   *
   * @example
   * // Example element markup:
   * // <button data-tooltip="Hello" data-tooltip-position="bottom" data-tooltip-theme="dark"></button>
   *
   * const options = tooltipManager['extractOptions'](buttonEl);
   * // Returns something like:
   * // {
   * //   position: "bottom",
   * //   theme: "dark",
   * //   animation: "fade",
   * //   mobile: { enabled: true, longPress: true, touchDelay: 300 },
   * //   ...
   * // }
   */

  private extractOptions(element: HTMLElement): TooltipOptions {
    const rawPosition = element.getAttribute(
      TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP_POSITION
    );

    const rawTheme = element.getAttribute(
      TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP_THEME
    );

    const rawAnimation = element.getAttribute(
      TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP_ANIMATION
    );

    const rawDelay = element.getAttribute(
      TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP_DELAY
    );

    const options: TooltipOptions = {
      position: rawPosition
        ? TooltipValidator.getValidPosition(rawPosition, element)
        : this.options.position ?? TOOLTIP_CONSTANTS.DEFAULT.POSITION,
      theme: rawTheme
        ? TooltipValidator.getValidTheme(rawTheme, element)
        : this.options.theme ?? TOOLTIP_CONSTANTS.DEFAULT.THEME,
      animation: rawAnimation
        ? TooltipValidator.getValidAnimation(rawAnimation, element)
        : this.options.animation ?? TOOLTIP_CONSTANTS.DEFAULT.ANIMATION,
      mobile:
        this.options.mobile !== undefined
          ? MobileManager.resolveMobileOptions(this.options.mobile)
          : {},
      delay: rawDelay
        ? TooltipValidator.validateDelay(rawDelay, element)
        : this.options.delay ?? TOOLTIP_CONSTANTS.DEFAULT.DELAY,
    };

    return options;
  }

  /**
   * Initializes a single tooltip element from the DOM.
   */
  private initializeTooltip(element: HTMLElement) {
    const content = element.getAttribute(TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP);

    if (!TooltipValidator.hasValidTooltipContent(element, content)) return;

    const options = this.extractOptions(element);

    this.add(element, content!, options);
  }

  /**
   * Initializes tooltips for all DOM elements that contain the tooltip attribute.
   */

  private initializeAllTooltips(): void {
    const tooltipElements = document.querySelectorAll<HTMLElement>(
      `[${TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP}]`
    );

    if (!TooltipValidator.isValidTooltipElements(tooltipElements)) return;

    tooltipElements.forEach((tooltipEl) => {
      this.initializeTooltip(tooltipEl);
    });
  }

  /**
   * Registers a global event listener that hides mobile tooltips when tapping outside.
   */
  private registerGlobalTouchListener(): void {
    document.addEventListener("touchstart", (e) => {
      if (!(e.target instanceof HTMLElement)) return;

      const tooltipElements = Array.from(this.tooltips.values()).map(
        (tooltip) => tooltip.element
      );

      if (!tooltipElements.includes(e.target)) {
        MobileManager.hideMobileTooltips();
      }
    });
  }
}
