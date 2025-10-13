import type { TooltipPosition } from "./types";

interface PositionCoordinates {
  top: number;
  left: number;
}

export class SmartPositioning {
  private static readonly DEFAULT_OFFSET = 8;

  static position(
    triggerElement: HTMLElement,
    tooltipElement: HTMLElement,
    position: TooltipPosition = "top",
    offset = SmartPositioning.DEFAULT_OFFSET
  ): void {
    const coords = this.calculatePosition(
      triggerElement,
      tooltipElement,
      position,
      offset
    );
    tooltipElement.style.top = `${coords.top}px`;
    tooltipElement.style.left = `${coords.left}px`;
  }

  private static calculatePosition(
    trigger: HTMLElement,
    tooltip: HTMLElement,
    position: TooltipPosition,
    offset: number
  ): PositionCoordinates {
    const { top, left, bottom, right, width, height } =
      trigger.getBoundingClientRect();
    const { width: tw, height: th } = tooltip.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const centers = {
      horizontal: left + scrollX + (width - tw) / 2,
      vertical: top + scrollY + (height - th) / 2,
    };

    switch (position) {
      case "top":
        return { top: top + scrollY - th - offset, left: centers.horizontal };
      case "bottom":
        return { top: bottom + scrollY + offset, left: centers.horizontal };
      case "left":
        return { top: centers.vertical, left: left + scrollX - tw - offset };
      case "right":
        return { top: centers.vertical, left: right + scrollX + offset };
    }
  }
}
