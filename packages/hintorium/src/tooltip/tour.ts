import type { TooltipContentSource } from "./content";
import { StorageManager } from "./storage";
import { Tooltip } from "./tooltip";
import type { TooltipOptions } from "./types";

type TourStep = {
  target: string;
  content: TooltipContentSource;
  options?: TooltipOptions;
};

type TourConstructor = {
  steps: TourStep[];
  localStorageKey?: string;
};

export class HintoriumTour {
  private steps: TourStep[] = [];
  private current = 0;
  private activeTooltip: Tooltip | null = null;
  protected storage: StorageManager | null = null;
  protected completedTour = false;

  /**
   * Tour state keys (localStorage)
   */
  protected tourProgress = "hintorium_tour_progress";
  protected tourCompleted = "hintorium_tour_completed";
  protected tourStorageKey?: string;

  constructor({ steps, localStorageKey }: TourConstructor) {
    this.steps = steps;

    if (localStorageKey) {
      this.storage = StorageManager.getInstance(localStorageKey);
      this.tourStorageKey = localStorageKey;
    }

    this.initializeState();
  }

  initializeState() {
    if (!this.storage || !this.tourStorageKey) return;

    const completed = this.storage.get(
      `${this.tourStorageKey}-${this.tourCompleted}`,
      false
    );

    if (completed) {
      this.completedTour = true;
      return;
    }

    const savedStep = this.storage.get(
      `${this.tourStorageKey}-${this.tourProgress}`,
      0
    );

    if (savedStep) {
      this.current = savedStep;
    }
  }

  start() {
    if (!this.steps.length) return;

    if (this.completedTour) return;

    this.showStep(this.current);
  }

  private async showStep(index: number) {
    if (index < 0 || index >= this.steps.length) return;

    if (this.activeTooltip) {
      this.activeTooltip.hide();
      this.activeTooltip = null;
    }

    const step = this.steps[index];
    const targetElement = document.querySelector<HTMLElement>(step.target);
    if (!targetElement) return;

    const tooltip = new Tooltip(targetElement, step.content, {
      ...step.options,
      sticky: true,
      onInjectContent: (tooltipEl) => {
        this.createNavigation(tooltipEl);
      },
    });

    this.activeTooltip = tooltip;

    await tooltip.show();
  }

  createNavigation(tooltip: HTMLDivElement): void {
    const wrapper = document.createElement("div");
    wrapper.className = "hintorium-tour-nav";

    const isFirst = this.current === 0;
    const isLast = this.current === this.steps.length - 1;

    wrapper.innerHTML = `
    <div class="hintorium-tour-progress">
      <span class="hintorium-tour-step">${this.current + 1}</span>
      <span class="hintorium-tour-separator">/</span>
      <span class="hintorium-tour-total">${this.steps.length}</span>
    </div>
    <div class="hintorium-tour-buttons">
      <button class= "hintorium-tour-btn hintorium-tour-prev" ${
        isFirst ? "disabled" : ""
      }>
        ← Back
      </button>
      ${
        !isLast
          ? `<button class="hintorium-tour-btn hintorium-tour-next">Next →</button>`
          : `<button class="hintorium-tour-btn hintorium-tour-done">Done ✓</button>`
      }
    </div>
  `;

    const btnPrev = wrapper.querySelector(
      ".hintorium-tour-prev"
    ) as HTMLButtonElement | null;
    const btnNext = wrapper.querySelector(
      ".hintorium-tour-next"
    ) as HTMLButtonElement | null;
    const btnDone = wrapper.querySelector(
      ".hintorium-tour-done"
    ) as HTMLButtonElement | null;

    btnPrev?.addEventListener("click", this.prev.bind(this));
    btnNext?.addEventListener("click", this.next.bind(this));
    btnDone?.addEventListener("click", this.finish.bind(this));

    tooltip.appendChild(wrapper);
  }

  prev() {
    if (this.current > 0) {
      this.current--;
      this.showStep(this.current);
      this.saveProgress();
    }
  }

  next() {
    if (this.current < this.steps.length - 1) {
      this.current++;
      this.showStep(this.current);
      this.saveProgress();
    }
  }
  finish() {
    if (this.activeTooltip) {
      this.activeTooltip.hide();
      this.activeTooltip = null;
    }
    this.current = 0;
    this.markCompleted();
  }

  private saveProgress() {
    if (this.storage) {
      this.storage.set(
        `${this.tourStorageKey}-${this.tourProgress}`,
        this.current
      );
    }
  }

  private markCompleted() {
    if (!this.storage || !this.tourStorageKey) return;

    this.storage.set(`${this.tourStorageKey}-${this.tourCompleted}`, true);
    this.storage.remove(`${this.tourStorageKey}-${this.tourProgress}`);
  }

  resetProgress() {
    if (!this.storage || !this.tourStorageKey) return;

    this.current = 0;
    this.storage.remove(`${this.tourStorageKey}-${this.tourProgress}`);
    this.storage.remove(`${this.tourStorageKey}-${this.tourCompleted}`);
  }
}
