import { TOOLTIP_CONSTANTS, VALID_TOOLTIP_POSITIONS } from "./constants";
import type { TooltipAnimation, TooltipPosition, TooltipTheme } from "./types";

export class TooltipValidator {
  /**
   * Checks if the provided NodeList contains at least one valid tooltip element.
   * @param elements - List of elements to validate.
   * @returns True if at least one element exists, false otherwise.
   */

  static isValidTooltipElements(elements: NodeListOf<HTMLElement>): boolean {
    const valid = elements.length > 0;

    if (!valid) {
      console.warn(
        `⚠️ No valid tooltip elements found. Please ensure elements have the correct data attribute to initialize tooltip - (${TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP}).`
      );
    }
    return valid;
  }

  /**
   * Validates that the element has tooltip content.
   * @param element - The HTML element to check.
   * @returns True if the element has non-empty tooltip content, false otherwise.
   */
  static hasValidTooltipContent(
    element: HTMLElement,
    content: string | null
  ): boolean {
    const valid = !!content && content.trim().length > 0;

    if (!valid) {
      console.warn(
        `⚠️ Tooltip element missing content: `,
        element,
        `Please provide a non-empty ${TOOLTIP_CONSTANTS.ATTRIBUTES.TOOLTIP} attribute.`
      );
    }

    return valid;
  }

  /**
   * Validates whether the provided animation string is a supported tooltip animation.
   *
   * Logs a console warning if the animation is invalid or unsupported.
   *
   * @param theme - The raw animation string to validate.
   * @param element - The HTML element associated with the tooltip, used for contextual logging.
   * @returns {theme is TooltipAnimation} `true` if the animation is valid, otherwise `false`.
   */

  static validateAnimation(
    animation: string | null,
    element: HTMLElement
  ): animation is string {
    const validAnimations: TooltipAnimation[] = [
      "fade",
      "slide",
      "zoom",
      "bounce",
    ];
    const isValid = validAnimations.includes(animation as TooltipAnimation);

    if (!isValid) {
      console.warn(
        `⚠️ Invalid tooltip animation: "${animation}" for element`,
        element,
        `\n Valid animations are: ${validAnimations.join(", ")}.`
      );
    }
    return isValid;
  }

  /**
   * Validates the delay value for a tooltip.
   * Ensures that the provided value is a finite number and non-negative.
   *
   * Logs a console warning if the value is invalid.
   *
   * @param delay - The raw delay value (string from data attribute or number from options).
   * @param element - The HTML element associated with the tooltip, used for logging.
   * @returns A valid number delay (>= 0). Falls back to 0 if invalid.
   */
  static validateDelay(
    delay: string | number | null,
    element: HTMLElement
  ): number {
    if (delay === null || delay === undefined) return 0;

    const parsed = typeof delay === "number" ? delay : Number(delay);

    if (Number.isNaN(parsed) || parsed < 0) {
      console.warn(
        `⚠️ Invalid tooltip delay "${delay}" on element`,
        element,
        "\nDelay must be a non-negative number in milliseconds. Falling back to 0."
      );
      return 0;
    }

    return parsed;
  }

  /**
   * Validates whether the provided theme string is a supported tooltip theme.
   *
   * Logs a console warning if the theme is invalid or unsupported.
   *
   * @param theme - The raw theme string to validate (e.g. "light", "dark").
   * @param element - The HTML element associated with the tooltip, used for contextual logging.
   * @returns {theme is TooltipTheme} `true` if the theme is valid, otherwise `false`.
   */

  static validateTheme(
    theme: string | null,
    element: HTMLElement
  ): theme is TooltipTheme {
    const validThemes: TooltipTheme[] = [
      "light",
      "dark",
      "glass",
      "pastel",
      "neon",
      "gradient",
    ];
    const isValid = validThemes.includes(theme as TooltipTheme);

    if (!isValid) {
      console.warn(
        `⚠️ Invalid tooltip theme: "${theme}" for element`,
        element,
        `\n Valid themes are: ${validThemes.join(", ")}.`
      );
    }

    return isValid;
  }

  /**
   * Checks if a given position string is a valid TooltipPosition.
   * Logs a warning if invalid.
   *
   * @param position - Raw position string to validate.
   * @returns True if position is valid, false otherwise.
   */

  static validatePosition(
    position: string | null,
    element: HTMLElement
  ): position is TooltipPosition {
    if (!position) return false;

    const isValid = VALID_TOOLTIP_POSITIONS.includes(
      position as TooltipPosition
    );

    if (!isValid) {
      console.warn(
        `Invalid tooltip position : ${position} for element`,
        element,
        `\n Valid positions are : ${VALID_TOOLTIP_POSITIONS.join(", ")}`
      );
    }

    return isValid;
  }

  /**
   * Returns a valid tooltip position, falling back to default if invalid.
   *
   * @param raw - Raw position string.
   * @param element - The HTML element to check.
   * @param defaultPosition - Default position to use if raw is invalid.
   * @returns Valid TooltipPosition.
   */

  static getValidPosition(
    raw: string | null,
    element: HTMLElement,
    defaultPosition: TooltipPosition = "top"
  ): TooltipPosition {
    return raw && this.validatePosition(raw, element)
      ? (raw as TooltipPosition)
      : defaultPosition;
  }

  /**
   * Returns a valid tooltip theme, falling back to default if invalid.
   *
   * @param raw - Raw theme string.
   * @param element - The HTML element to check.
   * @param defaultPosition - Default theme to use if raw is invalid.
   * @returns Valid TooltipTheme.
   */

  static getValidTheme(
    raw: string | null,
    element: HTMLElement,
    defaultTheme: TooltipTheme = "dark"
  ): TooltipTheme {
    return raw && this.validateTheme(raw, element)
      ? (raw as TooltipTheme)
      : defaultTheme;
  }

  /**
   * Returns a valid tooltip animation, falling back to default if invalid.
   *
   * @param raw - Raw animation string.
   * @param element - The HTML element to check.
   * @param defaultAnimation - Default animation to use if raw is invalid.
   * @returns Valid TooltipAnimation.
   */

  static getValidAnimation(
    raw: string | null,
    element: HTMLElement,
    defaultAnimation: TooltipAnimation = "fade"
  ): TooltipAnimation {
    return raw && this.validateAnimation(raw, element)
      ? (raw as TooltipAnimation)
      : defaultAnimation;
  }
}
