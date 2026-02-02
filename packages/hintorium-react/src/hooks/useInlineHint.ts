import { useEffect, useRef, useCallback } from 'react';
import { InlineHint } from 'hintorium-core';

/**
 * Hook for creating inline hints
 * Inline hints are persistent tooltips that appear inline with content
 * 
 * @param content - Hint content
 * @returns Ref to attach to the target element
 * 
 * @example
 * ```tsx
 * function HelpText() {
 *   const hintRef = useInlineHint('This is helpful information');
 *   
 *   return (
 *     <span ref={hintRef}>
 *       Hover for help
 *     </span>
 *   );
 * }
 * ```
 */
export function useInlineHint(content: string): React.RefCallback<HTMLElement> {
  const hintRef = useRef<InlineHint | null>(null);

  const cleanup = useCallback(() => {
    if (hintRef.current) {
      hintRef.current.destroy();
      hintRef.current = null;
    }
  }, []);

  const refCallback = useCallback(
    (element: HTMLElement | null) => {
      cleanup();

      if (!element) return;

      try {
        hintRef.current = new InlineHint(element, content);
      } catch (error) {
        console.error('[hintorium-react] Failed to create inline hint:', error);
      }
    },
    [content, cleanup]
  );

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return refCallback;
}

/**
 * Hook for initializing all inline hints in the DOM
 * This scans for elements with data-inline-hint attribute
 * 
 * @example
 * ```tsx
 * function App() {
 *   useInlineHintManager();
 *   
 *   return (
 *     <div>
 *       <span data-inline-hint="Helper text">Need help?</span>
 *     </div>
 *   );
 * }
 * ```
 */
export function useInlineHintManager() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    try {
      InlineHint.initFromDOM();
      isInitialized.current = true;
    } catch (error) {
      console.error('[hintorium-react] Failed to initialize inline hints:', error);
    }
  }, []);
}
