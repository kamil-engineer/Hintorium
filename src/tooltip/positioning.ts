import { TOOLTIP_CONSTANTS } from "./constants";
import type { TooltipOptions, TooltipPosition } from "./types";

export class SmartPositioning {
  /**
   * Map of opposite positions used when trying to "flip" tooltip placement.
   */
  private static readonly FLIP_POSITIONS: Record<
    TooltipPosition,
    TooltipPosition
  > = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
    auto: "top",
  };

  /**
   * Calculates and applies the best position for a tooltip relative to a target element.
   *
   * @param tooltip - The tooltip element to position.
   * @param target - The target element to which the tooltip is attached.
   * @param options - Tooltip options such as position, offset, boundary, and fallbacks.
   * @returns The final applied position.
   */
  static positionTooltip(
    tooltip: HTMLDivElement,
    target: HTMLElement,
    options: TooltipOptions
  ): TooltipPosition {
    const position = options.position ?? TOOLTIP_CONSTANTS.DEFAULTS.POSITION;
    const offset = options.offset ?? TOOLTIP_CONSTANTS.DEFAULTS.OFFSET;
    const boundary =
      options.boundary === "viewport"
        ? null
        : (options.boundary as HTMLElement);

    this.ensureTooltipMeasurable(tooltip);

    if (position === "auto") {
      const autoPos = this.autoPosition(tooltip, target, offset, boundary);
      this.addPositionClass(tooltip, autoPos);
      return autoPos;
    }

    const finalPos =
      this.tryPosition(tooltip, target, position, offset, boundary) ||
      this.findFallbackPosition(
        tooltip,
        target,
        position,
        offset,
        boundary,
        options.fallbackPlacements
      );

    this.applyPosition(tooltip, target, finalPos, offset);
    this.addPositionClass(tooltip, finalPos);

    return finalPos;
  }

  /**
   * Ensures tooltip is measurable by temporarily attaching it to the DOM
   * and applying hidden styles if necessary.
   *
   * @param tooltip - The tooltip element.
   * @private
   */
  private static ensureTooltipMeasurable(tooltip: HTMLDivElement): void {
    if (
      !tooltip.offsetParent ||
      tooltip.offsetWidth === 0 ||
      tooltip.offsetHeight === 0
    ) {
      const originalStyle = {
        position: tooltip.style.position,
        visibility: tooltip.style.visibility,
        opacity: tooltip.style.opacity,
        left: tooltip.style.left,
        top: tooltip.style.top,
      };

      tooltip.style.position = "fixed";
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
      tooltip.style.left = "-9999px";
      tooltip.style.top = "-9999px";

      if (!tooltip.parentNode) {
        document.body.appendChild(tooltip);
      }

      tooltip.offsetWidth;

      setTimeout(() => {
        tooltip.style.position = originalStyle.position;
        tooltip.style.visibility = originalStyle.visibility;
        tooltip.style.opacity = originalStyle.opacity;
        tooltip.style.left = originalStyle.left;
        tooltip.style.top = originalStyle.top;
      }, 0);
    }
  }

  /**
   * Chooses the best tooltip position automatically based on available space in the viewport.
   *
   * @param tooltip - Tooltip element.
   * @param target - Target element.
   * @param offset - Distance in pixels between tooltip and target.
   * @param boundary - Optional container boundary, null = viewport.
   * @returns The chosen position.
   * @private
   */
  private static autoPosition(
    tooltip: HTMLDivElement,
    target: HTMLElement,
    offset: number,
    boundary: HTMLElement | null
  ): TooltipPosition {
    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewport = this.getViewport(boundary);

    const spacesAvailable = {
      top: targetRect.top - viewport.top,
      bottom: viewport.bottom - targetRect.bottom,
      left: targetRect.left - viewport.left,
      right: viewport.right - targetRect.right,
    };

    const spacesNeeded = {
      top: tooltipRect.height + offset,
      bottom: tooltipRect.height + offset,
      left: tooltipRect.width + offset,
      right: tooltipRect.width + offset,
    };

    const fittingPositions: { position: TooltipPosition; score: number }[] = [];

    Object.entries(spacesAvailable).forEach(([dir, available]) => {
      const needed = spacesNeeded[dir as keyof typeof spacesNeeded];
      const position = dir as TooltipPosition;
      const score = available >= needed ? available : available - needed * 2;
      fittingPositions.push({ position, score });
    });

    fittingPositions.sort((a, b) => b.score - a.score);
    const bestPos = fittingPositions[0]?.position || "top";

    this.applyPosition(tooltip, target, bestPos, offset);
    return bestPos;
  }

  /**
   * Attempts to apply a specific position and checks if the tooltip is visible within boundaries.
   *
   * @param tooltip - Tooltip element.
   * @param target - Target element.
   * @param position - Requested position.
   * @param offset - Distance in pixels between tooltip and target.
   * @param boundary - Boundary container or null for viewport.
   * @returns Position if valid, otherwise null.
   * @private
   */
  private static tryPosition(
    tooltip: HTMLDivElement,
    target: HTMLElement,
    position: TooltipPosition,
    offset: number,
    boundary: HTMLElement | null
  ): TooltipPosition | null {
    this.applyPosition(tooltip, target, position, offset);
    return this.isTooltipVisible(tooltip, boundary) ? position : null;
  }

  /**
   * Tries fallback positions when the original position is not visible.
   *
   * @param tooltip - Tooltip element.
   * @param target - Target element.
   * @param originalPosition - The initial desired position.
   * @param offset - Distance in pixels between tooltip and target.
   * @param boundary - Boundary element or viewport.
   * @param fallbackPlacements - Optional custom fallback order.
   * @returns A valid fallback position.
   * @private
   */
  private static findFallbackPosition(
    tooltip: HTMLDivElement,
    target: HTMLElement,
    originalPosition: TooltipPosition,
    offset: number,
    boundary: HTMLElement | null,
    fallbackPlacements?: TooltipPosition[]
  ): TooltipPosition {
    const fallbacks = fallbackPlacements || [
      this.FLIP_POSITIONS[originalPosition],
      "top",
      "bottom",
      "left",
      "right",
    ];

    for (const pos of fallbacks) {
      if (pos === originalPosition || pos === "auto") continue;
      const result = this.tryPosition(tooltip, target, pos, offset, boundary);
      if (result) return result;
    }

    return this.findBestPartialFit(
      tooltip,
      target,
      fallbacks,
      offset,
      boundary
    );
  }

  /**
   * Finds the position with the least overflow when no perfect fit exists.
   *
   * @param tooltip - Tooltip element.
   * @param target - Target element.
   * @param positions - List of positions to try.
   * @param offset - Distance in pixels between tooltip and target.
   * @param boundary - Boundary container or viewport.
   * @returns The best fitting position with minimal overflow.
   * @private
   */
  private static findBestPartialFit(
    tooltip: HTMLDivElement,
    target: HTMLElement,
    positions: TooltipPosition[],
    offset: number,
    boundary: HTMLElement | null
  ): TooltipPosition {
    let bestPosition: TooltipPosition = "top";
    let minOverflow = Infinity;
    const viewport = this.getViewport(boundary);

    for (const pos of positions) {
      if (pos === "auto") continue;
      this.applyPosition(tooltip, target, pos, offset);
      const rect = tooltip.getBoundingClientRect();

      const overflow =
        Math.max(0, viewport.top - rect.top) +
        Math.max(0, rect.bottom - viewport.bottom) +
        Math.max(0, viewport.left - rect.left) +
        Math.max(0, rect.right - viewport.right);

      if (overflow < minOverflow) {
        minOverflow = overflow;
        bestPosition = pos;
      }
    }

    return bestPosition;
  }

  /**
   * Applies a specific position to the tooltip relative to the target element.
   *
   * @param tooltip - Tooltip element.
   * @param target - Target element.
   * @param position - Position to apply.
   * @param offset - Distance in pixels between tooltip and target.
   * @private
   */
  private static applyPosition(
    tooltip: HTMLDivElement,
    target: HTMLElement,
    position: TooltipPosition,
    offset: number
  ): void {
    if (!tooltip.parentElement) document.body.appendChild(tooltip);
    tooltip.style.position = "fixed";

    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const coordsMap = {
      top: {
        top: targetRect.top - tooltipRect.height - offset,
        left: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
      },
      bottom: {
        top: targetRect.bottom + offset,
        left: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
      },
      left: {
        top: targetRect.top + targetRect.height / 2 - tooltipRect.height / 2,
        left: targetRect.left - tooltipRect.width - offset,
      },
      right: {
        top: targetRect.top + targetRect.height / 2 - tooltipRect.height / 2,
        left: targetRect.right + offset,
      },
    };

    const coords = coordsMap[position as keyof typeof coordsMap];
    const safeCoords = this.ensureBoundaries(
      coords,
      tooltipRect,
      position,
      targetRect
    );

    tooltip.style.top = `${safeCoords.top}px`;
    tooltip.style.left = `${safeCoords.left}px`;
    tooltip.style.zIndex = "10000";
  }

  /**
   * Checks whether the tooltip is fully visible within the viewport or boundary.
   *
   * @param tooltip - Tooltip element.
   * @param boundary - Boundary element or viewport.
   * @returns True if tooltip is fully visible, false otherwise.
   * @private
   */
  private static isTooltipVisible(
    tooltip: HTMLDivElement,
    boundary: HTMLElement | null
  ): boolean {
    const rect = tooltip.getBoundingClientRect();
    const viewport = this.getViewport(boundary);
    const padding = TOOLTIP_CONSTANTS.DEFAULTS.BOUNDARY_PADDING;

    return (
      rect.top >= viewport.top + padding &&
      rect.bottom <= viewport.bottom - padding &&
      rect.left >= viewport.left + padding &&
      rect.right <= viewport.right - padding
    );
  }

  /**
   * Returns the viewport dimensions for the given boundary element or window.
   *
   * @param boundary - Optional boundary element.
   * @returns The viewport rectangle.
   * @private
   */
  private static getViewport(boundary: HTMLElement | null) {
    if (boundary) {
      const rect = boundary.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      };
    }
    return {
      top: 0,
      bottom: window.innerHeight,
      left: 0,
      right: window.innerWidth,
    };
  }

  /**
   * Ensures tooltip stays within viewport boundaries, adjusting coordinates if necessary.
   *
   * @param coords - Initial coordinates.
   * @param tooltipRect - Tooltip bounding rect.
   * @param position - Desired position.
   * @param targetRect - Target bounding rect.
   * @returns Safe coordinates clamped to boundaries.
   * @private
   */
  private static ensureBoundaries(
    coords: { top: number; left: number },
    tooltipRect: DOMRect,
    position: TooltipPosition,
    targetRect: DOMRect
  ): { top: number; left: number } {
    const viewport = this.getViewport(null);
    const padding = TOOLTIP_CONSTANTS.DEFAULTS.BOUNDARY_PADDING;

    let top = coords.top;
    let left = coords.left;

    if (top < viewport.top + padding && position === "top")
      top = targetRect.bottom + padding;
    if (
      top + tooltipRect.height > viewport.bottom - padding &&
      position === "bottom"
    )
      top = targetRect.top - tooltipRect.height - padding;

    if (left < viewport.left + padding && position === "left")
      left = targetRect.right + padding;
    if (
      left + tooltipRect.width > viewport.right - padding &&
      position === "right"
    )
      left = targetRect.left - tooltipRect.width - padding;

    top = Math.max(
      viewport.top + padding,
      Math.min(top, viewport.bottom - tooltipRect.height - padding)
    );
    left = Math.max(
      viewport.left + padding,
      Math.min(left, viewport.right - tooltipRect.width - padding)
    );

    return { top, left };
  }

  /**
   * Updates tooltip CSS classes based on its applied position.
   *
   * @param tooltip - Tooltip element.
   * @param position - Final applied position.
   * @private
   */
  private static addPositionClass(
    tooltip: HTMLDivElement,
    position: TooltipPosition
  ): void {
    tooltip.classList.remove(
      TOOLTIP_CONSTANTS.CSS_CLASSES.POSITION_TOP,
      TOOLTIP_CONSTANTS.CSS_CLASSES.POSITION_BOTTOM,
      TOOLTIP_CONSTANTS.CSS_CLASSES.POSITION_LEFT,
      TOOLTIP_CONSTANTS.CSS_CLASSES.POSITION_RIGHT
    );

    const positionClass = `pos-${position}`;
    tooltip.classList.add(positionClass);
  }
}
