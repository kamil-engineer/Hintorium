export type Position = "top" | "bottom" | "left" | "right";

export interface TooltipOptions {
  position?: Position;
  offset?: number;
}

export function createTooltipElement(text: string): HTMLDivElement {
  const tooltip = document.createElement("div");
  tooltip.className = "hintorium-tooltip";
  tooltip.textContent = text;
  document.body.appendChild(tooltip);
  return tooltip;
}

export function positionTooltip(
  tooltip: HTMLDivElement,
  target: HTMLElement,
  options: TooltipOptions = {}
) {
  const rect = target.getBoundingClientRect();
  const offset = options.offset ?? 5;
  const position = options.position ?? "top";

  switch (position) {
    case "top":
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - offset}px`;
      tooltip.style.left = `${
        rect.left + rect.width / 2 - tooltip.offsetWidth / 2
      }px`;
      break;
    case "bottom":
      tooltip.style.top = `${rect.bottom + offset}px`;
      tooltip.style.left = `${
        rect.left + rect.width / 2 - tooltip.offsetWidth / 2
      }px`;
      break;
    case "left":
      tooltip.style.top = `${
        rect.top + rect.height / 2 - tooltip.offsetHeight / 2
      }px`;
      tooltip.style.left = `${rect.left - tooltip.offsetWidth - offset}px`;
      break;
    case "right":
      tooltip.style.top = `${
        rect.top + rect.height / 2 - tooltip.offsetHeight / 2
      }px`;
      tooltip.style.left = `${rect.right + offset}px`;
      break;
  }

  tooltip.classList.add("show");
}

