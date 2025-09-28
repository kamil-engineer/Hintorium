export type TooltipPosition = "top" | "bottom" | "left" | "right" | "auto";
export type TooltipTheme = "light" | "dark";
export type TooltipTrigger = "hover";

export type TooltipOptions = {
  readonly position?: TooltipPosition;
  readonly theme?: TooltipTheme;
  readonly trigger?: TooltipTrigger | TooltipTrigger[];
  readonly offset?: number;
  readonly boundary?: HTMLElement | "viewport";
  readonly fallbackPlacements?: TooltipPosition[];
};

export type TooltipInstance = {
  readonly id: string;
  readonly element: HTMLDivElement;
  readonly target: HTMLElement;
  readonly options: Required<TooltipOptions>;
};
