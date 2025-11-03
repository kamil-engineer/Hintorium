import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipPosition } from "./types";

interface PositionCoordinates {
  top: number;
  left: number;
  actualPosition: TooltipPosition;
}

/**
 * Handles automatic and smart positioning of tooltips relative to their trigger elements.
 * Detects viewport edges, adjusts coordinates, and flips position if needed.
 */

export class SmartPositioning {
  /** Default pixel offset between trigger and tooltip */
  private static readonly DEFAULT_OFFSET =
    TOOLTIP_CONSTANTS.DEFAULT.DEFAULT_OFFSET;

  /** Minimal padding from viewport edges (in px). */
  private static readonly VIEWPORT_PADDING =
    TOOLTIP_CONSTANTS.DEFAULT.VIEWPORT_PADDING;

  /**
   * Positions a tooltip element relative to its trigger element.
   * Handles flipping and edge detection automatically.
   *
   * @param triggerElement - The element that triggers the tooltip.
   * @param tooltipElement - The tooltip element to be positioned.
   * @param position - Desired position ("top" | "bottom" | "left" | "right" | "auto").
   * @param offset - Distance in pixels between the trigger and the tooltip.
   */

  static position(
    triggerElement: HTMLElement,
    tooltipElement: HTMLElement,
    position: TooltipPosition = "top",
    offset = SmartPositioning.DEFAULT_OFFSET
  ): void {
    if (typeof window === "undefined" || !triggerElement || !tooltipElement)
      return;

    const coords = this.calculatePosition(
      triggerElement,
      tooltipElement,
      position,
      offset
    );
    tooltipElement.style.top = `${coords.top}px`;
    tooltipElement.style.left = `${coords.left}px`;
  }
  /**
   * Calculates the tooltip's top and left coordinates in the document.
   * Automatically flips the tooltip if it doesn't fit in the viewport.
   */

  private static calculatePosition(
    trigger: HTMLElement,
    tooltip: HTMLElement,
    preferred: TooltipPosition,
    offset: number
  ): PositionCoordinates {
    // 1️⃣ Read element and viewport dimensions
    const triggerRect = trigger.getBoundingClientRect();
    let tooltipRect = tooltip.getBoundingClientRect(); // will be updated if width changes
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    const {
      top,
      left,
      bottom,
      right,
      width: tWidth,
      height: tHeight,
    } = triggerRect;

    tooltipRect = tooltip.getBoundingClientRect();
    const tpWidth = tooltipRect.width;
    const tpHeight = tooltipRect.height;

    // 3️⃣ Compute available space around trigger
    const space = {
      top: top - offset - this.VIEWPORT_PADDING,
      bottom: viewportH - bottom - offset - this.VIEWPORT_PADDING,
      left: left - offset - this.VIEWPORT_PADDING,
      right: viewportW - right - offset - this.VIEWPORT_PADDING,
    };

    // 4️⃣ Check if tooltip fits in each direction
    const fits = {
      top: space.top >= tpHeight,
      bottom: space.bottom >= tpHeight,
      left: space.left >= tpWidth,
      right: space.right >= tpWidth,
    };

    // 5️⃣ Determine actual position (flip if necessary)
    let actual: TooltipPosition = preferred;
    if (!fits[preferred]) {
      const fallbackMap: Record<TooltipPosition, TooltipPosition[]> = {
        top: ["bottom", "right", "left"],
        bottom: ["top", "right", "left"],
        left: ["right", "top", "bottom"],
        right: ["left", "top", "bottom"],
      };
      for (const alt of fallbackMap[preferred]) {
        if (fits[alt]) {
          actual = alt;
          break;
        }
      }
    }

    // 6️⃣ Compute initial coordinates
    const centerX = left + scrollX + (tWidth - tpWidth) / 2;
    const centerY = top + scrollY + (tHeight - tpHeight) / 2;

    let topPos = 0;
    let leftPos = 0;

    switch (actual) {
      case "top":
        topPos = top + scrollY - tpHeight - offset;
        leftPos = centerX;
        break;
      case "bottom":
        topPos = bottom + scrollY + offset;
        leftPos = centerX;
        break;
      case "left":
        topPos = centerY;
        leftPos = left + scrollX - tpWidth - offset;
        break;
      case "right":
        topPos = centerY;
        leftPos = right + scrollX + offset;
        break;
    }

    // 7️⃣ Clamp tooltip to viewport
    topPos = Math.max(
      scrollY + this.VIEWPORT_PADDING,
      Math.min(topPos, scrollY + viewportH - tpHeight - this.VIEWPORT_PADDING)
    );
    leftPos = Math.max(
      scrollX + this.VIEWPORT_PADDING,
      Math.min(leftPos, scrollX + viewportW - tpWidth - this.VIEWPORT_PADDING)
    );

    // 8️⃣ Compute arrow offset relative to trigger
    const arrowOffsetX = Math.max(
      10,
      Math.min(tWidth / 2 + (left - leftPos), tpWidth - 10)
    );
    const arrowOffsetY = Math.max(
      10,
      Math.min(tHeight / 2 + (top - topPos), tpHeight - 10)
    );

    tooltip.style.setProperty("--arrow-offset-x", `${arrowOffsetX}px`);
    tooltip.style.setProperty("--arrow-offset-y", `${arrowOffsetY}px`);

    // 9️⃣ Set data-position for CSS
    tooltip.setAttribute("data-position", actual);

    return { top: topPos, left: leftPos, actualPosition: actual };
  }
}
