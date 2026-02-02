import type { ReactNode } from "react";
import { TooltipContext } from "../context/TooltipContext";
import type { TooltipOptions } from "../types";
import { useTooltipManager } from "../hooks/useTooltipManager";

export interface TooltipProviderProps {
  /**
   * Child components
   */
  children: ReactNode;
  /**
   * Global tooltip options applied to all tooltips
   */
  options?: TooltipOptions;
  /**
   * Whether to initialize the global TooltipManager
   * This enables data-tooltip attributes throughout the app
   * @default true
   */
  initManager?: boolean;
}

/**
 * Provider component for global tooltip configuration
 * Wraps your app to provide consistent tooltip styling and behavior
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <TooltipProvider options={{ theme: 'dark', animation: 'fade' }}>
 *       <YourApp />
 *     </TooltipProvider>
 *   );
 * }
 * ```
 */
export function TooltipProvider({
  children,
  options = {},
  initManager = true,
}: TooltipProviderProps) {
  if (initManager) {
    useTooltipManager(options);
  }

  return (
    <TooltipContext.Provider value={{ options }}>
      {children}
    </TooltipContext.Provider>
  );
}
