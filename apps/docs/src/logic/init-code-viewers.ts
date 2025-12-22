import copyTextWithFeedback from "./copy";

export function initCodeViewers() {
  const viewers = document.querySelectorAll("[data-code-viewer]");

  viewers.forEach((viewer) => {
    const tabs = viewer.querySelectorAll<HTMLButtonElement>("[data-tab]");
    const panels = viewer.querySelectorAll<HTMLElement>("[data-panel]");
    const copyButtons =
      viewer.querySelectorAll<HTMLButtonElement>("[data-copy]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.dataset.tab;

        tabs.forEach((t) => t.classList.remove("code-viewer__tab--active"));
        panels.forEach((p) => p.classList.remove("code-viewer__panel--active"));

        tab.classList.add("code-viewer__tab--active");
        const panel = viewer.querySelector(`[data-panel="${tabId}"]`);
        panel?.classList.add("code-viewer__panel--active");
      });
    });

    copyButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const panelId = button.dataset.copy;
        const panel = viewer.querySelector(`[data-panel="${panelId}"]`);
        const code = panel?.querySelector("code")?.textContent || "";

        await copyTextWithFeedback(button, () => code, {
          successText: "Copied!",
          failText: "Failed",
          timeout: 2000,
        });
      });
    });
  });
}
