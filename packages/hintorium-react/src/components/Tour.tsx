import type { ReactNode } from "react";
import type { TourStep } from "../types";
import { useTour } from "../hooks/useTour";

export interface TourProps {
  /**
   * Array of tour steps
   */
  steps: TourStep[];
  /**
   * Render prop function that receives tour controls
   */
  children: (tour: ReturnType<typeof useTour>) => ReactNode;
}

/**
 * Render prop component for product tours
 * Provides tour controls to children via render prop pattern
 *
 * @example
 * ```tsx
 * <Tour steps={[
 *   { element: '#step1', content: 'First step' },
 *   { element: '#step2', content: 'Second step' },
 * ]}>
 *   {(tour) => (
 *     <div>
 *       <button onClick={tour.start}>Start Tour</button>
 *       {tour.isActive && (
 *         <div>
 *           <button onClick={tour.prev}>Previous</button>
 *           <button onClick={tour.next}>Next</button>
 *           <button onClick={tour.stop}>Exit</button>
 *           <span>Step {tour.currentStep + 1}</span>
 *         </div>
 *       )}
 *     </div>
 *   )}
 * </Tour>
 * ```
 */
export function Tour({ steps, children }: TourProps) {
  const tour = useTour(steps);
  return <>{children(tour)}</>;
}
