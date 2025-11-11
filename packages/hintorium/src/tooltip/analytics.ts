import { TOOLTIP_CONSTANTS } from "./constants";
import { StorageManager } from "./storage";
/**
 * TooltipAnalytics
 *
 * Tracks number of times tooltips have been shown.
 * Persists data via StorageManager (localStorage).
 */

export class TooltipAnalytics {
  private static instance: TooltipAnalytics | null = null;
  private storage: StorageManager;

  constructor() {
    this.storage = StorageManager.getInstance(
      TOOLTIP_CONSTANTS.STORAGE_KEYS.TOOLTIP_ANALYTICS
    );
  }

  static getInstance(): TooltipAnalytics {
    if (!this.instance) {
      this.instance = new TooltipAnalytics();
    }
    return this.instance;
  }

  /**
   * Increment tooltip show count
   * @param tooltipId - unique identifier for the tooltip
   */
  increment(tooltipId: string): void {
    const current = this.storage.get<number>(tooltipId, 0) ?? 0;
    const next = current + 1;
    this.storage.set(tooltipId, next);
  }

  /**
   * Get the number of times a tooltip has been shown
   * @param tooltipId - unique identifier for the tooltip
   */
  getCount(tooltipId: string): number {
    const count = this.storage.get<number>(tooltipId, 0);

    if (count) return count;

    return 0;
  }

  /**
   * Get all tooltip counts as an object
   */
  getAll(): Record<string, number> {
    return this.storage.getAll();
  }

  /**
   * Reset all tooltip counts
   */
  resetAll(): void {
    this.storage.clear();
  }
}

export const Analytics = TooltipAnalytics.getInstance();
