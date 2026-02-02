export { Analytics, I18n } from "hintorium-core";

export { TooltipProvider } from "./components/TooltipProvider";
export type { TooltipProviderProps } from "./components/TooltipProvider";

export { Tooltip } from "./components/Tooltip";
export { Tour } from "./components/Tour";
export type { TourProps } from "./components/Tour";

export { useHintoriumI18n } from "./hooks/useHintoriumI18n";

export { useTooltipAnalytics } from "./hooks/useTooltipAnalytics";
export { useAnalytics } from "./hooks/useAnalytics";
export { useTooltip, useTooltipInstance } from "./hooks/useTooltip";
export { useTooltipManager } from "./hooks/useTooltipManager";
export { useTour } from "./hooks/useTour";
export { useInlineHint, useInlineHintManager } from "./hooks/useInlineHint";

export { useTooltipContext } from "./context/TooltipContext";

export type {
  TooltipOptions,
  TooltipPosition,
  TooltipTheme,
  TooltipAnimation,
  UseTooltipOptions,
  TooltipComponentProps,
  TourStep,
  UseTourReturn,
} from "./types";
