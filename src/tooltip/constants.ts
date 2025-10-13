export const VALID_TOOLTIP_POSITIONS = [
  "top",
  "bottom",
  "left",
  "right",
] as const;

export const TOOLTIP_CONSTANTS = {
  ATTRIBUTES: {
    TOOLTIP: "data-hintorium-tooltip",
    TOOLTIP_POSITION: "data-hintorium-tooltip-position",
  },

  CSS_CLASSES: {
    BASE: "hintorium-tooltip",
    SHOW: "show",
    HIDDEN: "hidden",
  },

  DEFAULT: {
    POSITION: "top" as const,
  },
};
