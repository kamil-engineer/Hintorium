import { initTooltip } from "../src/index";

export default {
  title: "Tooltip / Variants",
};

export const DarkTheme = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Dark Tooltip");
  button.setAttribute("data-hintorium-tooltip-theme", "dark");
  document.body.appendChild(button);

  initTooltip({ theme: "light" });
  return button;
};

DarkTheme.parameters = {
  docs: {
    description: {
      story: "Tooltip with dark theme, overriding global light theme.",
    },
  },
};

export const NeonTheme = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Neon Tooltip");
  button.setAttribute("data-hintorium-tooltip-theme", "neon");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

NeonTheme.parameters = {
  docs: {
    description: {
      story: "Tooltip with neon theme applied.",
    },
  },
};

export const LightTheme = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Light Tooltip");
  button.setAttribute("data-hintorium-tooltip-theme", "light");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

LightTheme.parameters = {
  docs: {
    description: {
      story: "Tooltip with light theme applied.",
    },
  },
};

export const GradientTheme = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Gradient Tooltip");
  button.setAttribute("data-hintorium-tooltip-theme", "gradient");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

GradientTheme.parameters = {
  docs: {
    description: {
      story: "Tooltip with gradient theme applied.",
    },
  },
};

export const PastelTheme = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Pastel Tooltip");
  button.setAttribute("data-hintorium-tooltip-theme", "pastel");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

PastelTheme.parameters = {
  docs: {
    description: {
      story: "Tooltip with pastel theme applied.",
    },
  },
};
