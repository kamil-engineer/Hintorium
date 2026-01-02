import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const Styling = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Styling & Theming</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Customize the appearance of your tooltips with built-in themes and
          styling options.
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <p class="content-article__sub-description">
        Customize tooltip appearance with pre-built themes or
        <span class="content-article__special"
          >create your own using CSS variables.</span
        >
      </p>

      <section class="docs-section">
        <h2 class="docs-section__title">
          ${createIcon("palette", "docs-section__icon")}
          <span>Tooltip Themes</span>
        </h2>

        <ul class="api-list">
          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                theme: <span class="content-article__special"> "light" </span>
              </p>

              <p class="api-list__item-description">
                Clean light background with dark text
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-theme="light"
            >
              Light
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                theme: <span class="content-article__special"> "dark" </span>
              </p>

              <p class="api-list__item-description">
                Dark background with light text (default)
              </p>

              <p class="api-list__default">Default theme</p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-theme="dark"
            >
              Dark
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                theme: <span class="content-article__special"> "glass" </span>
              </p>

              <p class="api-list__item-description">
                Glassmorphism effect with backdrop blur
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-theme="glass"
            >
              Glass
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                theme: <span class="content-article__special"> "pastel" </span>
              </p>

              <p class="api-list__item-description">
                Soft pastel colors for a friendly look
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-theme="pastel"
            >
              Pastel
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                theme: <span class="content-article__special"> "neon" </span>
              </p>

              <p class="api-list__item-description">
                Vibrant neon colors for high contrast
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-theme="neon"
            >
              Neon
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                theme:
                <span class="content-article__special"> "gradient" </span>
              </p>

              <p class="api-list__item-description">
                Smooth gradient background
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-theme="gradient"
            >
              Gradient
            </button>
          </li>
        </ul>
      </section>
      <section class="docs-section">
        <h3 class="docs-section__title">CSS Variables</h3>
        <p class="content-article__description">
          Override default styles using CSS custom properties:
        </p>

        <div class="content-article__cta cta box-y">
          <div class="cta__content">
            <h3 class="cta__title">Styling imports</h3>
            <p class="cta__description">
              If you want to customize properties, your custom CSS file must be
              imported after the hintorium core css.
            </p>
          </div>
        </div>

        <div class="box-y setup-example">
          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p>GLOBAL PROPERTIES</p>
              <p>:root {</p>
              <p class="ml-4">--hint-tooltip-font-size: 26px;</p>
              <p class="ml-4">
                --hint-tooltip-max-width: calc(500px - 2 * 100px);
              </p>
              <p class="ml-4">--hint-tooltip-radius: 12px;</p>
              <p class="ml-4">--hint-tooltip-padding-top: 26px;</p>
              <p class="ml-4">...</p>
              <p>}</p>
              <p>THEME PROPERTIES</p>
              <p>.hintorium-tooltip.light {</p>
              <p class="ml-4">--tooltip-bg:#162549</p>
              <p>}</p>
            </div>
          </div>
        </div>

        <a
          href="https://stackblitz.com/edit/vitejs-vite-tadvvsvg?file=index.html,src%2Fstyle.css,src%2Fmain.ts&terminal=dev"
          class="button button--lg button--primary"
          target="_blank"
        >
          ${createIcon("play")}
          <span>Example with custom properties</span>
        </a>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
