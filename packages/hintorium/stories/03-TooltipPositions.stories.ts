import { initTooltip } from "../src/index";

export default {
  title: "Tooltip / Positions & Options",
};

export const TopPosition = () => {
  const btn = document.createElement("button");
  btn.textContent = "Top";
  btn.setAttribute("data-hintorium-tooltip", "Top Tooltip");
  btn.setAttribute("data-hintorium-tooltip-position", "top");
  document.body.appendChild(btn);

  initTooltip();
  return btn;
};

TopPosition.parameters = {
  docs: {
    description: {
      story: "Tooltip positioned above the element.",
    },
  },
};

export const BottomPosition = () => {
  const btn = document.createElement("button");
  btn.textContent = "Bottom";
  btn.setAttribute("data-hintorium-tooltip", "Bottom Tooltip");
  btn.setAttribute("data-hintorium-tooltip-position", "bottom");
  document.body.appendChild(btn);

  initTooltip();
  return btn;
};

BottomPosition.parameters = {
  docs: {
    description: {
      story: "Tooltip positioned below the element.",
    },
  },
};

export const LeftPosition = () => {
  const btn = document.createElement("button");
  btn.textContent = "Left";
  btn.setAttribute("data-hintorium-tooltip", "Left Tooltip");
  btn.setAttribute("data-hintorium-tooltip-position", "left");
  document.body.appendChild(btn);

  initTooltip();
  return btn;
};

LeftPosition.parameters = {
  docs: {
    description: {
      story: "Tooltip positioned left of the element.",
    },
  },
};

export const RightPosition = () => {
  const btn = document.createElement("button");
  btn.textContent = "Right";
  btn.setAttribute("data-hintorium-tooltip", "Right Tooltip");
  btn.setAttribute("data-hintorium-tooltip-position", "right");
  document.body.appendChild(btn);

  initTooltip();
  return btn;
};

RightPosition.parameters = {
  docs: {
    description: {
      story: "Tooltip positioned right of the element.",
    },
  },
};

export const SmartPositioning = () => {
  const btn = document.createElement("button");
  btn.textContent = "Left";
  btn.style.position = "fixed";
  btn.style.left = "20px";
  btn.style.top = "20px";
  btn.setAttribute(
    "data-hintorium-tooltip",
    "Left Tooltip but positioning to smart right"
  );
  btn.setAttribute("data-hintorium-tooltip-position", "left");
  document.body.appendChild(btn);

  initTooltip();
  return btn;
};

SmartPositioning.parameters = {
  docs: {
    description: {
      story: "Tooltip positioned smart of the element.",
    },
  },
};
