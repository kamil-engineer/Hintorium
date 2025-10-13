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
    TOOLTIP_THEME: "data-hintorium-tooltip-theme",
  },

  CSS_CLASSES: {
    BASE: "hintorium-tooltip",
    SHOW: "show",
    HIDDEN: "hidden",

    // THEME
    THEME_LIGHT: "theme-light",
    THEME_DARK: "theme-dark",
  },

  DEFAULT: {
    POSITION: "top" as const,
    THEME: "dark" as const,
  },
};
