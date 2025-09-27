export function initTooltip() {
  const elements = document.querySelectorAll<HTMLElement>("[data-tooltip]");

  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => showTooltip(el));
    el.addEventListener("mouseleave", () => hideTooltip());
  });
}

let tooltipEl: HTMLElement | null = null;

function showTooltip(target: HTMLElement) {
  const text = target.getAttribute("data-tooltip");
  if (!text) return;

  tooltipEl = document.createElement("div");
  tooltipEl.className = "hintorium-tooltip";
  tooltipEl.textContent = text;

  document.body.appendChild(tooltipEl);

  const rect = target.getBoundingClientRect();
  tooltipEl.style.top = `${rect.top - 30}px`;
  tooltipEl.style.left = `${rect.left}px`;

  tooltipEl.classList.add("show");
}

function hideTooltip() {
  if (tooltipEl) {
    tooltipEl.remove();
    tooltipEl = null;
  }
}
