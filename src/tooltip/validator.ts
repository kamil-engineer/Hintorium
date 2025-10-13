import { VALID_TOOLTIP_POSITIONS } from "./constants";
import type { TooltipPosition } from "./types";

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
