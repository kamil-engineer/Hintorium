export type TooltipPosition = "top" | "bottom" | "left" | "right" | "auto";
export type TooltipTheme = "light" | "dark";
export type TooltipTrigger = "hover" | "focus" | "click" | "manual" | "touch";

export type TooltipOptions = {
  readonly position?: TooltipPosition;
  readonly theme?: TooltipTheme;
  readonly trigger?: TooltipTrigger | TooltipTrigger[];
  readonly offset?: number;
  readonly boundary?: HTMLElement | "viewport";
  readonly fallbackPlacements?: TooltipPosition[];
  readonly showDelay?: number;
  readonly hideDelay?: number;
  readonly a11y?: {
    readonly keyboard?: boolean;
    readonly announceOnShow?: boolean;
    readonly focusable?: boolean;
  };

  readonly mobile?: {
    readonly enabled?: boolean;
    readonly longPress?: boolean;
    readonly touchDelay?: number;
  };
};

export type TooltipInstance = {
  readonly id: string;
  readonly element: HTMLDivElement;
  readonly target: HTMLElement;
  readonly options: Required<TooltipOptions>;

  show(): Promise<void>;
  hide(): Promise<void>;
};
