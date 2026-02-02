import { createContext, useContext } from "react";
import type { TooltipOptions } from "../types";

interface TooltipContextValue {
  /**
   * Global tooltip options that will be merged with individual tooltip options
   */
  options: TooltipOptions;
}

export const TooltipContext = createContext<TooltipContextValue | null>(null);

/**
 * Hook to access tooltip context
 * Returns null if not inside TooltipProvider
 */
export function useTooltipContext(): TooltipContextValue | null {
  return useContext(TooltipContext);
}
