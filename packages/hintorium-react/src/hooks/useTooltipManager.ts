import { useEffect, useRef } from "react";
import { initTooltip } from "hintorium-core";
import type { TooltipOptions } from "../types";

/**
 * Hook for initializing the global TooltipManager
 * This automatically initializes all tooltips with data-tooltip attributes in the DOM
 *
 * @param options - Global tooltip options
 *
 * @example
 * ```tsx
 * function App() {
 *   useTooltipManager({ theme: 'dark', animation: 'fade' });
 *
 *   return (
 *     <div>
 *       <button data-tooltip="I'm a tooltip!">Hover me</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTooltipManager(options?: TooltipOptions) {
  const managerRef = useRef<ReturnType<typeof initTooltip> | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    try {
      managerRef.current = initTooltip(options);
      isInitialized.current = true;
    } catch (error) {
      console.error(
        "[hintorium-react] Failed to initialize TooltipManager:",
        error,
      );
    }

    return () => {
      isInitialized.current = false;
      managerRef.current = null;
    };
  }, []);

  return managerRef.current;
}
