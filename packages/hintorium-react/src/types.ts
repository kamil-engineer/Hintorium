import { TooltipOptions } from "hintorium-core";
import { TooltipContentSource } from "hintorium-core/dist/types/tooltip/content";

export type {
  TooltipOptions,
  TooltipPosition,
  TooltipTheme,
  TooltipAnimation,
} from "hintorium-core";

// React-specific types
export interface UseTooltipOptions extends TooltipOptions {
  /**
   * Whether the tooltip is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface TooltipComponentProps extends UseTooltipOptions {
  /**
   * Tooltip content - can be string or React node
   */
  content: TooltipContentSource;
  /**
   * Child element that triggers the tooltip
   */
  children: React.ReactElement;
  /**
   * Additional className for the trigger element
   */
  className?: string;
}

export interface TourStep {
  /**
   * CSS selector or HTMLElement for the target
   */
  element: string | HTMLElement;
  /**
   * Content to display in the tour step
   */
  content: string | React.ReactNode;
  /**
   * Optional step-specific options
   */
  options?: TooltipOptions;
}

export interface UseTourReturn {
  /**
   * Start the tour
   */
  start: () => void;
  /**
   * Stop/exit the tour
   */
  stop: () => void;
  /**
   * Go to next step
   */
  next: () => void;
  /**
   * Go to previous step
   */
  prev: () => void;
  /**
   * Go to specific step by index
   */
  goTo: (index: number) => void;
  /**
   * Current step index
   */
  currentStep: number;
  /**
   * Whether tour is currently active
   */
  isActive: boolean;
}
