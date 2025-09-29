export const TOOLTIP_CONSTANTS = {
  ATTRIBUTES: {
    DATA_TOOLTIP: "data-tooltip",
    DATA_TOOLTIP_THEME: "data-tooltip-theme",
    DATA_TOOLTIP_POS: "data-tooltip-pos",
    DATA_TOOLTIP_HTML: "data-tooltip-html",
  },

  CSS_CLASSES: {
    BASE: "hintorium-tooltip",
    SHOW: "show",
    HIDDEN: "hidden",

    // Themes
    THEME_LIGHT: "light",
    THEME_DARK: "dark",

    // Positioning
    POSITION_TOP: "pos-top",
    POSITION_BOTTOM: "pos-bottom",
    POSITION_LEFT: "pos-left",
    POSITION_RIGHT: "pos-right",

    MOBILE: "mobile",
    KEYBOARD_FOCUS: "keyboard-focus",
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

  DEFAULTS: {
    POSITION: "top" as const,
    THEME: "light" as const,
    BOUNDARY_PADDING: 10,
    OFFSET: 5,
    ID_PREFIX: "hintorium-tooltip-",
    SHOW_DELAY: 0,
    HIDE_DELAY: 0,
    MOBILE_BREAKPOINT: 768,
    LONG_PRESS_DURATION: 500,
    KEYBOARD_DELAY: 100,
    TOUCH_DELAY: 500,
  },

  EVENTS: {
    MOUSE_ENTER: "mouseenter",
    MOUSE_LEAVE: "mouseleave",
    FOCUS: "focus",
    BLUR: "blur",
    KEYDOWN: "keydown",
    TOUCH_START: "touchstart",
    TOUCH_END: "touchend",
    TOUCH_CANCEL: "touchcancel",
    RESIZE: "resize",
    SCROLL: "scroll",
  },
} as const;

export const TOOLTIP_MESSAGES = {
  INFO: {
    EMPTY_TOOLTIP_ELEMENTS:
      "ℹ️ Hintorium Tooltip: No elements with data-tooltip attributes found.",
  },
} as const;
