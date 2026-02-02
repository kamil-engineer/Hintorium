import { useEffect, useRef, useCallback } from "react";
import { Tooltip, TooltipContentSource } from "hintorium-core";
import type { UseTooltipOptions } from "../types";
import { useTooltipContext } from "../context/TooltipContext";
import { useTooltipAnalytics } from "./useTooltipAnalytics";

/**
 * Hook for creating a tooltip on any element
 *
 * @param content - Tooltip content (string or HTML)
 * @param options - Tooltip configuration options
 * @returns Ref to attach to the target element
 *
 * @example
 * ```tsx
 * function MyButton() {
 *   const tooltipRef = useTooltip('Click me!', { position: 'top' });
 *   return <button ref={tooltipRef}>Hover me</button>;
 * }
 * ```
 */
export function useTooltip(
  content: TooltipContentSource,
  options?: UseTooltipOptions,
): React.RefCallback<HTMLElement> {
  const context = useTooltipContext();
  const tooltipRef = useRef<Tooltip | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);
  const withAnalytics = useTooltipAnalytics(options);

  const cleanup = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.destroy();
      tooltipRef.current = null;
    }
  }, []);

  const refCallback = useCallback(
    (element: HTMLElement | null) => {
      cleanup();

      if (!element || options?.disabled) {
        elementRef.current = null;
        return;
      }

      elementRef.current = element;

      const mergedOptions = {
        ...context?.options,
        ...options,
        onShow: withAnalytics(options?.onShow),
      };

      try {
        tooltipRef.current = new Tooltip(element, content, mergedOptions);
      } catch (error) {
        throw error;
      }
    },
    [content, options, context, cleanup],
  );

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return refCallback;
}

/**
 * Alternative hook that returns tooltip instance for manual control
 *
 * @example
 * ```tsx
 * function MyButton() {
 *   const { ref, tooltip } = useTooltipInstance('Hello');
 *
 *   return (
 *     <button
 *       ref={ref}
 *       onClick={() => tooltip?.show()}
 *     >
 *       Click to show
 *     </button>
 *   );
 * }
 * ```
 */
export function useTooltipInstance(
  content: string,
  options?: UseTooltipOptions,
) {
  const context = useTooltipContext();
  const tooltipRef = useRef<Tooltip | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);
  const withAnalytics = useTooltipAnalytics(options);

  const cleanup = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.destroy();
      tooltipRef.current = null;
    }
  }, []);

  const refCallback = useCallback(
    (element: HTMLElement | null) => {
      cleanup();

      if (!element || options?.disabled) {
        elementRef.current = null;
        return;
      }

      elementRef.current = element;

      const mergedOptions = {
        ...context?.options,
        ...options,
        onShow: withAnalytics(options?.onShow),
      };

      try {
        tooltipRef.current = new Tooltip(element, content, mergedOptions);
      } catch (error) {
        throw error;
      }
    },
    [content, options, context, cleanup],
  );

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    ref: refCallback,
    tooltip: tooltipRef.current,
  };
}
