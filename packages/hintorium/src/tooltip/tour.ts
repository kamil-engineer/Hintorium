import type { TooltipContentSource } from "./content";
import { StorageManager } from "./storage";
import { Tooltip } from "./tooltip";
import type { TooltipOptions } from "./types";
import { I18n } from "./i18n";
import { TOOLTIP_CONSTANTS } from "./constants";

type TourStep = {
  target: string;
  content: TooltipContentSource;
  options?: TooltipOptions;
};

type TourConstructor = {
  steps: TourStep[];
  auto?: {
    enabled: boolean;
    delay: number;
  };
  localStorageKey?: string;
};

const en = JSON.parse(
  JSON.stringify({
    hintorium: {
      tour: {
        next: "Next →",
        done: "Done",
        prev: "← Back",
      },
    },
  }),
);

const pl = JSON.parse(
  JSON.stringify({
    hintorium: {
      tour: {
        next: "Następny →",
        done: "Gotowe",
        prev: "← Wstecz",
      },
    },
  }),
);

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

  /**
   * Auto play
   */

  private autoPlay: boolean = false;
  private autoPlayDelay: number = 3000; // default 3s
  private autoPlayTimeout: number | null = null;
  private progressBar?: HTMLDivElement;
  private autoPlayStartTime: number = 0;
  private autoPlayAnimationFrame: number | null = null;

  constructor({ steps, localStorageKey, auto }: TourConstructor) {
    this.steps = steps;

    if (localStorageKey) {
      this.storage = StorageManager.getInstance(localStorageKey);
      this.tourStorageKey = localStorageKey;
    }

    if (auto?.enabled) {
      this.autoPlay = true;
    }

    if (auto?.delay) {
      this.autoPlayDelay = auto.delay;
    }

    this.registerDefaultTranslations();
    this.initializeState();
  }

  private registerDefaultTranslations() {
    I18n.setTranslations("en", en);
    I18n.setTranslations("pl", pl);
  }

  initializeState() {
    if (!this.storage || !this.tourStorageKey) return;

    const completed = this.storage.get(
      `${this.tourStorageKey}-${this.tourCompleted}`,
      false,
    );

    if (completed) {
      this.completedTour = true;
      return;
    }

    const savedStep = this.storage.get(
      `${this.tourStorageKey}-${this.tourProgress}`,
      0,
    );

    if (savedStep) {
      this.current = savedStep;
    }
  }

  start() {
    if (!this.steps.length) return;

    if (this.completedTour) return;

    Tooltip.tourActive = true;

    this.showStep(this.current);
  }

  private startProgressBarAnimation() {
    if (!this.progressBar || !this.autoPlay) return;
    this.autoPlayStartTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - this.autoPlayStartTime;
      const progress = Math.min(elapsed / this.autoPlayDelay, 1);
      this.progressBar!.style.width = `${progress * 100}%`;

      if (progress < 1) {
        this.autoPlayAnimationFrame = requestAnimationFrame(animate);
      } else {
        this.autoPlayAnimationFrame = null;
        if (this.current === this.steps.length - 1) {
          this.finish();
        } else {
          this.next();
        }
      }
    };

    if (this.autoPlayAnimationFrame)
      cancelAnimationFrame(this.autoPlayAnimationFrame);
    this.autoPlayAnimationFrame = requestAnimationFrame(animate);
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
      isTour: true,
      onInjectContent: (tooltipEl) => {
        this.createNavigation(tooltipEl);
        this.createProgressBar(tooltipEl);
      },
    });

    this.activeTooltip = tooltip;

    await tooltip.show();

    if (this.autoPlay) {
      this.clearAutoPlay();
      this.startProgressBarAnimation();
    }
  }

  private clearAutoPlay() {
    if (this.autoPlayTimeout) {
      clearTimeout(this.autoPlayTimeout);
      this.autoPlayTimeout = null;
    }
    if (this.autoPlayAnimationFrame) {
      cancelAnimationFrame(this.autoPlayAnimationFrame);
      this.autoPlayAnimationFrame = null;
    }
  }

  createProgressBar(tooltip: HTMLDivElement): void {
    const wrapper = document.createElement("div");
    wrapper.className = "hintorium-tour-progress-bar-wrapper";

    const tooltipInner = tooltip.querySelector(
      `.${TOOLTIP_CONSTANTS.CSS_CLASSES.WRAPPER}`,
    );
    if (!tooltipInner) return;

    const progressBar = document.createElement("div");
    progressBar.className = "hintorium-tour-progress-bar-fill";
    wrapper.appendChild(progressBar);

    tooltipInner.appendChild(wrapper);

    this.progressBar = progressBar;

    if (this.autoPlay) this.startProgressBarAnimation();
  }

  createNavigation(tooltip: HTMLDivElement): void {
    const wrapper = document.createElement("div");
    wrapper.className = "hintorium-tour-nav";

    const tooltipInner = tooltip.querySelector(
      `.${TOOLTIP_CONSTANTS.CSS_CLASSES.WRAPPER}`,
    );
    if (!tooltipInner) return;

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
        ${I18n.t("hintorium.tour.prev")}
      </button>
      ${
        !isLast
          ? `<button class="hintorium-tour-btn hintorium-tour-next">${I18n.t(
              "hintorium.tour.next",
            )}</button>`
          : `<button class="hintorium-tour-btn hintorium-tour-done">${I18n.t(
              "hintorium.tour.done",
            )}</button>`
      }
    </div>
  `;

    const btnPrev = wrapper.querySelector(
      ".hintorium-tour-prev",
    ) as HTMLButtonElement | null;
    const btnNext = wrapper.querySelector(
      ".hintorium-tour-next",
    ) as HTMLButtonElement | null;
    const btnDone = wrapper.querySelector(
      ".hintorium-tour-done",
    ) as HTMLButtonElement | null;

    btnPrev?.addEventListener("click", this.prev.bind(this));
    btnNext?.addEventListener("click", this.next.bind(this));
    btnDone?.addEventListener("click", this.finish.bind(this));

    tooltipInner.appendChild(wrapper);
  }

  prev() {
    if (this.current > 0) {
      this.clearAutoPlay();
      this.current--;
      this.showStep(this.current);
      this.saveProgress();
    }
  }

  next() {
    if (this.current < this.steps.length - 1) {
      this.clearAutoPlay();
      this.current++;
      this.showStep(this.current);
      this.saveProgress();
    }
  }
  finish() {
    this.clearAutoPlay();
    if (this.activeTooltip) {
      this.activeTooltip.hide();
      this.activeTooltip.destroy();
      this.activeTooltip = null;
    }
    this.current = 0;
    this.markCompleted();
  }

  private saveProgress() {
    if (this.storage) {
      this.storage.set(
        `${this.tourStorageKey}-${this.tourProgress}`,
        this.current,
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
