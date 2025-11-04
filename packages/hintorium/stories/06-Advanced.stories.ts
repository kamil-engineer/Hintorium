import { initTooltip, Tooltip } from "../src/index";

export default {
  title: "Tooltip / Advanced",
};

export const RTLTooltip = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute(
    "data-hintorium-tooltip",
    "RTL Tooltip for testing purpose, must be biiiiiiiiiig"
  );
  button.setAttribute("data-hintorium-tooltip-position", "left");
  button.setAttribute("dir", "rtl");
  document.body.appendChild(button);

  initTooltip();
  return button;
};

RTLTooltip.parameters = {
  docs: {
    description: {
      story: "Tooltip with RTL direction.",
    },
  },
};
