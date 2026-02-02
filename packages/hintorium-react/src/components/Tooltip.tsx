import { cloneElement, isValidElement, ReactElement } from "react";
import type { TooltipComponentProps } from "../types";
import { useTooltip } from "../hooks/useTooltip";

/**
 * Declarative tooltip component
 * Wraps a single child element and adds tooltip functionality
 *
 * @example
 * ```tsx
 * <Tooltip content="Click me!" position="top" theme="dark">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  content,
  children,
  className,
  disabled,
  ...options
}: TooltipComponentProps) {
  const contentString = typeof content === "string" ? content : String(content);

  const tooltipRef = useTooltip(contentString, { ...options, disabled });

  if (!isValidElement(children)) {
    console.error(
      "[hintorium-react] Tooltip children must be a valid React element",
    );
    return <>{children}</>;
  }

  const child = children as ReactElement<{ className?: string; ref?: unknown }>;

  return cloneElement(child, {
    ref: tooltipRef,
    className: className
      ? `${child.props.className || ""} ${className}`.trim()
      : child.props.className,
  });
}
