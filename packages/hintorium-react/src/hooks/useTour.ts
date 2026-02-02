import { useState, useCallback, useRef, useEffect } from "react";
import { HintoriumTour } from "hintorium-core";
import type { TourStep, UseTourReturn } from "../types";
import { useTooltipContext } from "../context/TooltipContext";

/**
 * Hook for creating an interactive product tour
 *
 * @param steps - Array of tour steps
 * @returns Tour control methods and state
 *
 * @example
 * ```tsx
 * function MyTour() {
 *   const tour = useTour([
 *     { element: '#step1', content: 'Welcome!' },
 *     { element: '#step2', content: 'Click here to continue' },
 *   ]);
 *
 *   return (
 *     <div>
 *       <button onClick={tour.start}>Start Tour</button>
 *       {tour.isActive && (
 *         <div>
 *           Step {tour.currentStep + 1} of {steps.length}
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useTour(steps: TourStep[]): UseTourReturn {
  const context = useTooltipContext();
  const tourRef = useRef<HintoriumTour | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (steps.length === 0) return;

    const tourSteps = steps.map((step) => ({
      target: typeof step.element === "string" ? step.element : "",
      content:
        typeof step.content === "string" ? step.content : String(step.content),
      options: {
        ...context?.options,
        ...step.options,
        isTour: true,
      },
    }));

    try {
      tourRef.current = new HintoriumTour({
        steps: tourSteps,
      });
    } catch (error) {
      console.error("[hintorium-react] Failed to create tour:", error);
    }

    return () => {
      if (tourRef.current) {
        tourRef.current.finish();
        tourRef.current = null;
      }
    };
  }, [steps, context]);

  const start = useCallback(() => {
    if (!tourRef.current) return;

    try {
      tourRef.current.start();
      setIsActive(true);
      setCurrentStep(0);
    } catch (error) {
      console.error("[hintorium-react] Failed to start tour:", error);
    }
  }, []);

  const stop = useCallback(() => {
    if (!tourRef.current) return;

    try {
      tourRef.current.finish();
      setIsActive(false);
      setCurrentStep(0);
    } catch (error) {
      console.error("[hintorium-react] Failed to stop tour:", error);
    }
  }, []);

  const next = useCallback(() => {
    if (!tourRef.current || !isActive) return;

    try {
      tourRef.current.next();
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } catch (error) {
      console.error("[hintorium-react] Failed to go to next step:", error);
    }
  }, [isActive, steps.length]);

  const prev = useCallback(() => {
    if (!tourRef.current || !isActive) return;

    try {
      tourRef.current.prev();
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("[hintorium-react] Failed to go to previous step:", error);
    }
  }, [isActive]);

  const goTo = useCallback(
    (index: number) => {
      if (!tourRef.current || !isActive) return;
      if (index < 0 || index >= steps.length) return;

      const diff = index - currentStep;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          tourRef.current.next();
        }
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) {
          tourRef.current.prev();
        }
      }
      setCurrentStep(index);
    },
    [isActive, currentStep, steps.length],
  );

  return {
    start,
    stop,
    next,
    prev,
    goTo,
    currentStep,
    isActive,
  };
}
