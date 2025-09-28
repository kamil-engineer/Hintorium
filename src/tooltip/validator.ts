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
