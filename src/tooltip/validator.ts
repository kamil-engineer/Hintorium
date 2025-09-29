import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipPosition, TooltipTheme } from "./types";

export class TooltipValidator {
  static validatePosition(
    position: unknown,
    context = "option",
    elementInfo = ""
  ) {
    const validPositions: readonly TooltipPosition[] = [
      "top",
      "bottom",
      "left",
      "right",
      "auto",
    ];

    if (position === null || position === undefined) {
      return TOOLTIP_CONSTANTS.DEFAULTS.POSITION;
    }

    if (typeof position !== "string") {
      console.warn(
        `⚠️ Tooltip: Position ${context} must be a string, received: ${typeof position}${elementInfo}. ` +
          `Using default: "${TOOLTIP_CONSTANTS.DEFAULTS.POSITION}".`
      );
      return TOOLTIP_CONSTANTS.DEFAULTS.POSITION;
    }

    const normalizedPosition = position.toLowerCase().trim();

    if (!validPositions.includes(normalizedPosition as TooltipPosition)) {
      console.warn(
        `⚠️ Tooltip: Invalid position "${position}"${elementInfo}. ` +
          `Valid options are: ${validPositions
            .map((p) => `"${p}"`)
            .join(", ")}. ` +
          `Using default: "${TOOLTIP_CONSTANTS.DEFAULTS.POSITION}".`
      );
      return TOOLTIP_CONSTANTS.DEFAULTS.POSITION;
    }

    if (position !== normalizedPosition) {
      console.warn(
        `⚠️ Tooltip: Position "${position}" contains extra whitespace or mixed case${elementInfo}. ` +
          `Using normalized value: "${normalizedPosition}".`
      );
    }

    return normalizedPosition as TooltipPosition;
  }

  static validateDelay(
    delay: unknown,
    context = "option",
    elementInfo = ""
  ): number {
    if (delay === null || delay === undefined) {
      return TOOLTIP_CONSTANTS.DEFAULTS.SHOW_DELAY;
    }

    if (typeof delay === "string") {
      const parsedDelay = parseInt(delay, 10);
      if (!isNaN(parsedDelay)) {
        console.warn(
          `⚠️ Tooltip: Delay ${context} provided as string "${delay}"${elementInfo}. ` +
            `Converting to number: ${parsedDelay}.`
        );
        delay = parsedDelay;
      } else {
        console.warn(
          `⚠️ Tooltip: Delay "${delay}" cannot be converted to number${elementInfo}. ` +
            `Using default: ${TOOLTIP_CONSTANTS.DEFAULTS.SHOW_DELAY}.`
        );
        return TOOLTIP_CONSTANTS.DEFAULTS.SHOW_DELAY;
      }
    }

    if (typeof delay !== "number" || !Number.isFinite(delay)) {
      console.warn(
        `⚠️ Tooltip: Delay ${context} must be a finite number, received: ${typeof delay}${elementInfo}. ` +
          `Using default: ${TOOLTIP_CONSTANTS.DEFAULTS.SHOW_DELAY}.`
      );
      return TOOLTIP_CONSTANTS.DEFAULTS.SHOW_DELAY;
    }

    if (delay < 0) {
      console.warn(
        `⚠️ Tooltip: Delay ${context} should be non-negative, received: ${delay}${elementInfo}. ` +
          `Using absolute value: ${Math.abs(delay)}.`
      );
      return Math.abs(delay);
    }

    if (delay > 10000) {
      console.warn(
        `⚠️ Tooltip: Delay ${context} is very long (${delay}ms)${elementInfo}. ` +
          `This may cause poor user experience.`
      );
    }

    return delay;
  }

  static validateTheme(
    theme: unknown,
    context = "option",
    elementInfo = ""
  ): TooltipTheme {
    const validThemes: readonly TooltipTheme[] = ["light", "dark"];

    if (theme === null || theme === undefined) {
      return TOOLTIP_CONSTANTS.DEFAULTS.THEME;
    }

    if (typeof theme !== "string") {
      console.warn(
        `⚠️ Tooltip: Theme ${context} must be a string, received: ${typeof theme}${elementInfo}. ` +
          `Using default: "${TOOLTIP_CONSTANTS.DEFAULTS.THEME}".`
      );
      return TOOLTIP_CONSTANTS.DEFAULTS.THEME;
    }

    const normalizedTheme = theme.toLowerCase().trim();

    if (!validThemes.includes(normalizedTheme as TooltipTheme)) {
      console.warn(
        `⚠️ Tooltip: Invalid theme "${theme}"${elementInfo}. ` +
          `Valid options are: ${validThemes
            .map((t) => `"${t}"`)
            .join(", ")}. ` +
          `Using default: "${TOOLTIP_CONSTANTS.DEFAULTS.THEME}".`
      );
      return TOOLTIP_CONSTANTS.DEFAULTS.THEME;
    }

    if (theme !== normalizedTheme) {
      console.warn(
        `⚠️ Tooltip: Theme "${theme}" contains extra whitespace or mixed case${elementInfo}. ` +
          `Using normalized value: "${normalizedTheme}".`
      );
    }

    return normalizedTheme as TooltipTheme;
  }
}
