import type { VALID_TOOLTIP_POSITIONS } from "./constants";

export type TooltipPosition = (typeof VALID_TOOLTIP_POSITIONS)[number];
export type TooltipAnimation = "fade" | "slide" | "scale";
export type TooltipTheme = "light" | "dark";

export type TooltipOptions = {
  position?: TooltipPosition;
  theme?: TooltipTheme;
};
