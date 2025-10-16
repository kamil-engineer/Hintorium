import { VALID_TOOLTIP_POSITIONS } from "./constants";
import type { TooltipPosition, TooltipTheme } from "./types";

export class TooltipValidator {
  static isValidTooltipElements(elements: NodeListOf<HTMLElement>): boolean {
    const valid = elements.length > 0;

    if (!valid) {
      console.warn(
        "⚠️ No valid tooltip elements found. Please ensure elements have the correct data attributes."
      );
    }
    return valid;
  }

  static validateAnimation(animation: string | null): animation is string {
    const validAnimations: string[] = ["fade", "slide", "zoom", "bounce"];
    const isValid = validAnimations.includes(animation || "");
    if (!isValid) {
      console.warn(
        `⚠️ Invalid tooltip animation: "${animation}". Valid animations are: ${validAnimations.join(
          ", "
        )}.`
      );
    }
    return isValid;
  }

  static validateTheme(theme: string | null): theme is TooltipTheme {
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
        `⚠️ Invalid tooltip theme: "${theme}". Valid themes are: ${validThemes.join(
          ", "
        )}.`
      );
    }

    return isValid;
  }

  static validatePosition(
    position: string | null
  ): position is TooltipPosition {
    if (!position) return false;

    const isValid = VALID_TOOLTIP_POSITIONS.includes(
      position as TooltipPosition
    );

    if (!isValid) {
      console.warn(
        `⚠️ Invalid tooltip position: "${position}". Valid positions are: ${VALID_TOOLTIP_POSITIONS.join(
          ", "
        )}.`
      );
    }

    return isValid;
  }
}
