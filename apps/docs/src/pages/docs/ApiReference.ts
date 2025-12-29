import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const APIReference = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">API Reference</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Complete API documentation for all types, props and configuration
          options.
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <p class="content-article__sub-description">
        The Hintorium Library provides a comprehensive set of options to
        customize behavior, appearance, and accessibility. All configuration is
        done through the
        <span class="content-article__special">TooltipOptions</span>
        interface.
      </p>

      <section class="docs-section">
        <h2 class="docs-section__title">
          ${createIcon("bundle", "docs-section__icon")}
          <span>TooltipOptions</span>
        </h2>
        <p class="docs-section__text">
          Main configuration interface for tooltip behavior and appearance.
        </p>

        <ul class="api-list">
          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">position</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                </div>
              </div>

              <p class="api-list__type">TooltipPosition</p>

              <p class="api-list__item-description">
                Defines where the tooltip appears relative to the target
                element. Supports 12 positions including corners.
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-position="left"
            >
              Test
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">theme</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                </div>
              </div>

              <p class="api-list__type">TooltipTheme</p>

              <p class="api-list__item-description">
                Pre-defined visual theme for the tooltip. Choose from light,
                dark, glass, pastel, neon, or gradient themes.
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-theme="gradient"
            >
              Test
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">animation</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                </div>
              </div>
              <p class="api-list__type">TooltipAnimation</p>

              <p class="api-list__item-description">
                Animation style when tooltip appears and disappears. Supports
                fade, slide, zoom, and bounce effects.
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-animation="bounce"
            >
              Test
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">delay</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                </div>
              </div>

              <p class="api-list__type">number</p>

              <p class="api-list__item-description">
                Delay in milliseconds before the tooltip appears after hovering.
                Useful to prevent accidental tooltips.
              </p>

              <p class="api-list__default">Default : 300ms</p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-delay="0"
            >
              Test
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">a11y</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                  <span class="api-list__tag"> readonly</span>
                </div>
              </div>

              <p class="api-list__type">object</p>

              <p class="api-list__item-description">
                Accessibility configuration including keyboard navigation,
                screen reader support, and focus management.
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
            >
              Test
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">mobile</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                </div>
              </div>

              <p class="api-list__type">object</p>

              <p class="api-list__item-description">
                Mobile-specific behavior including touch support, long-press
                activation, and touch delay configuration.
              </p>

              <p class="api-list__default">Default : false</p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
            >
              Test
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">rtl</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                </div>
              </div>

              <p class="api-list__type">boolean</p>

              <p class="api-list__item-description">
                Enable right-to-left text direction support for Arabic, Hebrew,
                and other RTL languages.
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Big big big tooltip to handle RTL direction"
              dir="rtl"
            >
              Test
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">sticky</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                </div>
              </div>

              <p class="api-list__type">boolean</p>

              <p class="api-list__item-description">
                Keep tooltip visible even when mouse moves away. Useful for
                interactive tooltips with clickable content.
              </p>

              <p class="api-list__default">Default : false</p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
            >
              Test
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">isTour</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                </div>
              </div>

              <p class="api-list__type">boolean</p>

              <p class="api-list__item-description">
                Enable tour mode for creating guided product tours with
                step-by-step tooltips.
              </p>

              <p class="api-list__default">Default : false</p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
            >
              Test
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <div class="api-list__content-top">
                <code class="api-list__title">onInjectContent</code>
                <div class="api-list__tags">
                  <span class="api-list__tag"> optional</span>
                </div>
              </div>

              <p class="api-list__type">(tooltipEl: HTMLDivElement) => void</p>

              <p class="api-list__item-description">
                Callback function executed when tooltip content is injected into
                the DOM. Allows for dynamic content manipulation.
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
            >
              Test
            </button>
          </li>
        </ul>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
