import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipAnimation } from "./types";

/**
 * @class AnimationManager
 * @description
 * A utility class responsible for managing tooltip animations (e.g., fade, scale, slide).
 * Handles smooth CSS-based transitions for showing and hiding tooltip elements,
 * ensuring proper timing synchronization with CSS transitions and delays.
 *
 * @example
 * ```ts
 * const tooltip = document.createElement('div');
 * tooltip.textContent = 'Hello, world!';
 * document.body.appendChild(tooltip);
 *
 * // Apply a fade-in animation
 * await AnimationManager.show(tooltip, 'fade');
 *
 * // Wait and hide it with a fade-out effect
 * await AnimationManager.hide(tooltip);
 * ```
 */

export class AnimationManager {
  /**
   * Removes all existing animation classes from the tooltip and
   * applies the new animation class based on the given animation type.
   *
   * @private
   * @param {HTMLElement} tooltip - The tooltip element to prepare.
   * @param {TooltipAnimation} animation - The animation type (e.g., `'fade'`, `'scale'`, `'slide'`).
   *
   * @example
   * ```ts
   * AnimationManager.prepareAnimation(tooltip, 'scale');
   * ```
   */

  private static prepareAnimation(
    tooltip: HTMLElement,
    animation: TooltipAnimation
  ) {
    tooltip.classList.forEach((cls) => {
      if (cls.startsWith(TOOLTIP_CONSTANTS.DEFAULT.ANIMATION_PREFIX)) {
        tooltip.classList.remove(cls);
      }
    });
    tooltip.classList.add(
      `${TOOLTIP_CONSTANTS.DEFAULT.ANIMATION_PREFIX}${animation}`
    );
  }

  /**
   * Displays the tooltip with the specified animation effect.
   * Automatically removes the `hidden` class, adds the `show` class,
   * and waits for the CSS transition to finish before resolving.
   *
   * @async
   * @param {HTMLDivElement} tooltip - The tooltip element to animate.
   * @param {TooltipAnimation} [animation='fade'] - The animation style to apply.
   * @param {number} [delay=0] - The delay (in milliseconds) before starting the animation.
   * @returns {Promise<void>} Resolves once the animation completes.
   *
   * @example
   * ```ts
   * await AnimationManager.show(tooltip, 'fade', 150);
   * ```
   */

  static async show(
    tooltip: HTMLDivElement,
    animation: TooltipAnimation = "fade",
    delay: number = 0
  ): Promise<void> {
    if (!tooltip) return Promise.resolve();

    this.prepareAnimation(tooltip, animation);

    await this.wait(delay);

    tooltip.classList.remove(TOOLTIP_CONSTANTS.CSS_CLASSES.HIDDEN);
    tooltip.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.SHOW);

    await this.waitForTransition(tooltip);
  }

  /**
   * Hides the tooltip with the currently active animation effect.
   * Removes the `show` class, waits for the transition to complete,
   * and finally adds the `hidden` class.
   *
   * @async
   * @param {HTMLDivElement} tooltip - The tooltip element to hide.
   * @param {number} [delay=0] - Optional delay (in milliseconds) before hiding.
   * @returns {Promise<void>} Resolves once the hide transition finishes.
   *
   * @example
   * ```ts
   * await AnimationManager.hide(tooltip, 200);
   * ```
   */

  static async hide(tooltip: HTMLDivElement, delay: number = 0): Promise<void> {
    if (!tooltip) return;

    await this.wait(delay);

    tooltip.classList.remove(TOOLTIP_CONSTANTS.CSS_CLASSES.SHOW);

    await this.waitForTransition(tooltip);

    tooltip.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.HIDDEN);
  }

  /**
   * Waits for the CSS transition on the given element to complete.
   * If no `transitionend` event is fired, it resolves automatically after
   * the computed transition duration (as a safety fallback).
   *
   * @private
   * @param {HTMLElement} element - The element undergoing a CSS transition.
   * @returns {Promise<void>} Resolves after the transition completes or timeout elapses.
   */

  private static waitForTransition(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      const duration = this.getTransitionDuration(element);
      element.addEventListener("transitionend", () => resolve(), {
        once: true,
      });
      setTimeout(resolve, duration);
    });
  }

  /**
   * Reads the element’s computed transition duration and delay from CSS.
   * Returns the total transition time in milliseconds.
   *
   * @private
   * @param {HTMLElement} element - The element whose transition timing is computed.
   * @returns {number} Total transition time (duration + delay) in milliseconds.
   */

  private static getTransitionDuration(element: HTMLElement): number {
    const style = getComputedStyle(element);
    const duration = parseFloat(style.transitionDuration) || 0;
    const delay = parseFloat(style.transitionDelay) || 0;
    return (duration + delay) * 1000;
  }

  /**
   * A simple delay helper that pauses execution for the specified time.
   *
   * @private
   * @param {number} ms - Time in milliseconds to wait.
   * @returns {Promise<void>} Resolves after the delay.
   *
   * @example
   * ```ts
   * await AnimationManager.wait(300) ;
   * console.log('Waited 300ms');
   * ```
   */

  private static wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
