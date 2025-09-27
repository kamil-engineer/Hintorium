import {
  createTooltipElement,
  positionTooltip,
  type TooltipOptions,
} from "./core";

const tooltipMap = new WeakMap<HTMLElement, HTMLDivElement>();

export function initTooltip(options: TooltipOptions = {}) {
  const elements = document.querySelectorAll<HTMLElement>("[data-tooltip]");

  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const text = el.getAttribute("data-tooltip");
      if (!text) return;

      const tooltipEl = createTooltipElement(text);

      const themeAttr = el.getAttribute("data-tooltip-theme") as
        | "light"
        | "dark";
      tooltipEl.classList.add(themeAttr || "light");

      tooltipMap.set(el, tooltipEl);

      const positionAttr = el.getAttribute(
        "data-tooltip-pos"
      ) as TooltipOptions["position"];

      tooltipEl.setAttribute("data-tooltip-pos", positionAttr ?? "top");
      positionTooltip(tooltipEl, el, { ...options, position: positionAttr });

      requestAnimationFrame(() => tooltipEl.classList.add("show"));
    });

    el.addEventListener("mouseleave", () => {
      const tooltipEl = tooltipMap.get(el);
      if (tooltipEl) {
        tooltipEl.classList.remove("show");
        setTimeout(() => {
          tooltipEl.remove();
          tooltipMap.delete(el);
        }, 200);
      }
    });
  });
}
