import { initTooltip } from "../src/index";

export default {
  title: "Tooltip / Basics",
  parameters: {
    docs: {
      description: {
        component: "Basic Tooltip using default or global options.",
      },
    },
  },
};

export const Default = () => {
  const button = document.createElement("button");
  button.textContent = "Hover me";
  button.setAttribute("data-hintorium-tooltip", "Hello Tooltip!");
  document.body.appendChild(button);

  initTooltip();

  return button;
};

Default.parameters = {
  docs: {
    description: {
      story:
        "Default tooltip appears on hover and uses global/default settings.",
    },
  },
};
