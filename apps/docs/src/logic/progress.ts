export const dynamicProgressBar = () => {
  const progressEl = document.querySelector<HTMLDivElement>(".progress-bar");
  const articleEl = document.querySelector<HTMLElement>(".content-article");
  let ticking = false;
  function updateProgress() {
    if (!articleEl || !progressEl) return;
    const rect = articleEl.getBoundingClientRect();
    const articleHeight = articleEl.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = Math.min(
      Math.max((viewportHeight - rect.top) / articleHeight, 0),
      1
    );

    progressEl.style.setProperty("--progress-width", scrolled * 100 + "%");

    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  });
};
