import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const Tours = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Tour System</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Create interactive guided tours and walkthroughs for your users.
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <section class="docs-section">
        <h2 class="docs-section__title">Overview</h2>
        <p class="docs-section__text">
          Tours allow you to create step-by-step guided experiences that
          highlight specific elements of your UI. Perfect for onboarding new
          users, showcasing features, or walking through complex workflows.
        </p>

        <div class="setup-example">
          <div class="content-article__cta cta">
            ${createIcon("bulb", "cta__icon")}
            <div class="cta__content">
              <h3 class="cta__title">What are Tours?</h3>
              <p class="cta__description">
                Tours are sequences of tooltips that guide users through your
                application. Each step highlights a specific element and
                provides contextual information, with navigation controls to
                move between steps.
              </p>
            </div>
          </div>
        </div>

        <div class="intro-features">
          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("play", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Auto-Play</h3>
              <p class="intro-feature__description">
                Automatic progression with customizable delays and progress bars
              </p>
            </div>
          </div>

          <div class="intro-feature">
            <div class="intro-feature__icon">
              ${createIcon("bundle", "intro-feature__svg")}
            </div>
            <div class="intro-feature__content">
              <h3 class="intro-feature__title">Progress Tracking</h3>
              <p class="intro-feature__description">
                Save tour progress in localStorage and track completion
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Basic Tour</h2>

        <p class="docs-section__text">
          Create your first tour with just a few lines of code.
        </p>

        <div class="box-y setup-example">
          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p class="ml-4">
                import { HintoriumTour } from 'tooltip-library'
              </p>

              <p>&nbsp;</p>

              <p class="ml-4">// Define tour steps</p>
              <p class="ml-4">const tour = new HintoriumTour({</p>
              <p class="ml-8">steps: [</p>
              <p class="ml-8">{</p>
              <p class="ml-12">target: '#welcome-button',</p>
              <p class="ml-12">
                content: 'Welcome! Click here to get started.',
              </p>
              <p class="ml-12">options: { position: 'bottom' }</p>
              <p class="ml-8">},</p>
              <p class="ml-8">],</p>
              <p class="ml-4">});</p>

              <p>&nbsp;</p>

              <p class="ml-4">tour.start()</p>
            </div>
          </div>

          <div class="setup-example__code-block">
            <div>
              <a
                href="https://stackblitz.com/edit/vitejs-vite-zd9kijut?file=src%2Fmain.ts,index.html&terminal=dev"
                class="button button--lg button--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${createIcon("play")}
                <span>Example</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Tour Steps</h2>
        <p class="docs-section__text">
          Each step in a tour highlights a specific element and provides
          contextual information.
        </p>

        <ul class="api-list">
          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">target</code>
                <div class="api-list__tags">
                  <span class="api-list__tag">required</span>
                </div>
              </div>

              <p class="api-list__type">string</p>

              <p class="api-list__item-description">
                CSS selector for the element to highlight
              </p>

              <div class="api-list__code">
                <p>
                  target: '#my-element' | '.class-name' | '[data-tour="step1"]'
                </p>
              </div>
            </div>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">content</code>
                <div class="api-list__tags">
                  <span class="api-list__tag">required</span>
                </div>
              </div>

              <p class="api-list__type">string | HTML | Promise</p>

              <p class="api-list__item-description">
                Content to display in the tooltip
              </p>

              <div class="api-list__code">
                <p>content: 'Simple text'</p>
                <p>content: '&lt;strong&gt;HTML content&lt;/strong&gt;'</p>
                <p>content: async () =&gt; await fetchContent()</p>
              </div>
            </div>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">options</code>
                <div class="api-list__tags">
                  <span class="api-list__tag">optional</span>
                </div>
              </div>

              <p class="api-list__type">TooltipOptions</p>

              <p class="api-list__item-description">
                Custom tooltip configuration for this step
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Navigation Controls</h2>
        <p class="docs-section__text">
          Tours automatically include navigation buttons to move between steps.
          The UI shows current progress and available actions includes I18N
          support.
        </p>

        <div class="controls">
          <h3 class="controls__title">Built-in Navigation</h3>
          <p class="controls__description">
            Each tour step includes previous, next, and done buttons with step
            counter (e.g., "2/5")
          </p>

          <ul class="controls__list">
            <li class="controls__item">
              <p class="controls__item-title">
                ${createIcon("leftArrow", "controls__icon")} Back
              </p>
              <p class="controls__item-description">
                Navigate to previous step (disabled on first step)
              </p>
            </li>
            <li class="controls__item">
              <p class="controls__item-title">
                Next ${createIcon("rightArrow", "controls__icon")}
              </p>
              <p class="controls__item-description">
                Advance to next step (shown on all except last)
              </p>
            </li>
            <li class="controls__item">
              <p class="controls__item-title">Done</p>
              <p class="controls__item-description">
                Complete tour (shown only on last step)
              </p>
            </li>
          </ul>

          <div class="api-list__code">
            <p>// Manual navigation</p>
            <p>tour.next() &nbsp; &nbsp; // Go to next step</p>
            <p>tour.prev() &nbsp; &nbsp; // Go to previous step</p>
            <p>tour.finish() &nbsp; &nbsp; // Complete the tour</p>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Auto-Play Mode</h2>
        <p class="docs-section__text">
          Enable automatic progression through tour steps with customizable
          delays and visual progress indicators.
        </p>

        <div class="controls">
          <h3 class="controls__title">Auto-Play Configuration</h3>

          <div class="setup-example">
            <div class="setup-example__code-block">
              <div class="install-method__code">
                <p class="ml-4">const tour = new HintoriumTour({</p>
                <p class="ml-8">steps: [...],</p>
                <p class="ml-8">auto: {</p>
                <p class="ml-12">enabled: true,</p>
                <p class="ml-12">delay: 5000 // 5 seconds per step</p>
                <p class="ml-8">}</p>
                <p class="ml-4">})</p>

                <p>&nbsp;</p>

                <p class="ml-4">tour.start()</p>
              </div>
            </div>
          </div>

          <ul class="controls__list controls__list--grid-2">
            <li class="controls__item">
              <p class="controls__item-title">enabled</p>
              <p class="controls__item-description">
                Turn on/off automatic progression
              </p>
            </li>
            <li class="controls__item">
              <p class="controls__item-title">delay</p>
              <p class="controls__item-description">
                Time in milliseconds before auto-advance
              </p>
            </li>
          </ul>

          <div class="setup-example">
            <div class="content-article__cta cta">
              ${createIcon("bulb", "cta__icon")}
              <div class="cta__content">
                <h3 class="cta__title">Progress Bar</h3>
                <p class="cta__description">
                  When auto-play is enabled, a progress bar automatically
                  appears at the top of each tooltip, visually indicating time
                  remaining before the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Progress Tracking</h2>
        <p class="docs-section__text">
          Automatically save and restore tour progress using localStorage,
          ensuring users can continue where they left off.
        </p>

        <div class="controls">
          <h3 class="controls__title">localStorage Integration</h3>

          <div class="setup-example">
            <div class="setup-example__code-block">
              <div class="install-method__code">
                <p class="ml-4">const tour = new HintoriumTour({</p>
                <p class="ml-8">steps: [...],</p>
                <p class="ml-8">localStorageKey:'my-app-onboarding'</p>
                <p class="ml-4">})</p>

                <p>&nbsp;</p>

                <p class="ml-4">tour.start()</p>

                <p>&nbsp;</p>

                <p class="ml-4">tour.resetProgress()</p>
              </div>
            </div>
          </div>

          <ul class="controls__list controls__list--grid-2">
            <li class="controls__item">
              <p class="controls__item-title">*_tour_progress</p>
              <p class="controls__item-description">
                Stores current step index
              </p>
            </li>
            <li class="controls__item">
              <p class="controls__item-title">*_tour_completed</p>
              <p class="controls__item-description">Marks tour as finished</p>
            </li>
          </ul>

          <div class="setup-example">
            <div class="content-article__cta cta">
              ${createIcon("safe", "cta__icon")}
              <div class="cta__content">
                <h3 class="cta__title">Completion Tracking</h3>
                <p class="cta__description">
                  Once a tour is completed, it won't automatically start again
                  unless you call resetProgress()
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="setup-example__code-block">
          <div>
            <a
              href="https://stackblitz.com/edit/vitejs-vite-hgzmvaty?file=src%2Fstyle.css,src%2Fmain.ts,index.html&terminal=dev"
              class="button button--lg button--primary"
              target="_blank"
            >
              ${createIcon("play")}
              <span>Example</span>
            </a>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Best practices</h2>
        <ul class="best-practices">
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Keep tours concise (5-7 steps maximum) to avoid overwhelming users
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Use clear, actionable language in your step content
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Always provide a way to skip or exit the tour
          </li>
        </ul>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
