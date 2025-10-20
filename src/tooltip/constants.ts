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
    TOOLTIP_ANIMATION: "data-hintorium-tooltip-animation",
  },

  CSS_CLASSES: {
    BASE: "hintorium-tooltip",
    SHOW: "show",
    HIDDEN: "hidden",

    // THEME
    THEME_LIGHT: "theme-light",
    THEME_DARK: "theme-dark",

    // ANIMATION
    ANIMATION_FADE: "fade",
    ANIMATION_SLIDE: "slide",
    ANIMATION_ZOOM: "zoom",
    ANIMATION_BOUNCE: "bounce",
  },

  ARIA: {
    ROLE_TOOLTIP: "tooltip",
  },

  KEYS: {
    ESCAPE: "Escape",
    ENTER: "Enter",
    SPACE: " ",
    TAB: "Tab",
  },

  DEFAULT: {
    POSITION: "top" as const,
    THEME: "dark" as const,
    ANIMATION: "fade" as const,
    ID_PREFIX: "hintorium-tooltip-",
  },
};
