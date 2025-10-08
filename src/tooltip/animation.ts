import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipAnimation } from "./types";

export class AnimationManager {
  static show(
    tooltip: HTMLDivElement,
    animation: TooltipAnimation = "fade",
    delay: number = 0
  ): Promise<void> {
    return new Promise((resolve) => {
      tooltip.classList.add(`anim-${animation}`);

      setTimeout(() => {
        tooltip.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.SHOW);
        setTimeout(resolve, 200);
      }, delay);
    });
  }

  static hide(tooltip: HTMLDivElement, delay: number = 0): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        tooltip.classList.remove(TOOLTIP_CONSTANTS.CSS_CLASSES.SHOW);
        tooltip.classList.add(TOOLTIP_CONSTANTS.CSS_CLASSES.HIDDEN);

        setTimeout(resolve, 200);
      }, delay);
    });
  }
}
