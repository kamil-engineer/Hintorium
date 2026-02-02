import { useCallback } from "react";
import { Analytics } from "hintorium-core";
import type { UseTooltipOptions } from "../types";

export function useTooltipAnalytics(options?: UseTooltipOptions) {
  return useCallback(
    (originalOnShow?: (id: string) => void) => {
      return (id: string) => {
        originalOnShow?.(id);

        if (options?.id) {
          Analytics.increment(options.id);
        }
      };
    },
    [options?.id],
  );
}
