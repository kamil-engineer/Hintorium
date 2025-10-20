import type { VALID_TOOLTIP_POSITIONS } from "./constants";

export type TooltipPosition = (typeof VALID_TOOLTIP_POSITIONS)[number];
export type TooltipAnimation = "fade" | "slide" | "zoom" | "bounce";
export type TooltipTheme =
  | "light"
  | "dark"
  | "glass"
  | "pastel"
  | "neon"
  | "gradient";

export type TooltipOptions = {
  position?: TooltipPosition;
  theme?: TooltipTheme;
  animation?: TooltipAnimation;
  readonly a11y?: {
    readonly keyboard?: boolean;
    readonly announceOnShow?: boolean;
    readonly focusable?: boolean;
  };
};
