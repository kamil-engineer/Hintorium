import { initTooltip } from "../src/index";

export default {
  title: "Tooltip / Animations",
};

export const SlideTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Tooltip");
  button.setAttribute("data-hintorium-tooltip-animation", "slide");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

SlideTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with slide animation.",
    },
  },
};

export const FadeTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Tooltip");
  button.setAttribute("data-hintorium-tooltip-animation", "fade");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

FadeTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with fade animation.",
    },
  },
};

export const ZoomTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Tooltip");
  button.setAttribute("data-hintorium-tooltip-animation", "zoom");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

ZoomTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with zoom animation.",
    },
  },
};

export const BounceTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Tooltip");
  button.setAttribute("data-hintorium-tooltip-animation", "bounce");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

BounceTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with bounce animation.",
    },
  },
};
