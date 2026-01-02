import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const Animations = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Animations</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Configure smooth animations and transitions for tooltip appearance.
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <p class="content-article__sub-description">
        Choose from multiple animation styles to match your design language and
        user experience preferences.
      </p>

      <section class="docs-section">
        <h2 class="docs-section__title">
          ${createIcon("feather", "docs-section__icon")}
          <span>Tooltip Animations</span>
        </h2>

        <ul class="api-list">
          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                animation:
                <span class="content-article__special"> "fade" </span>
              </p>

              <div class="api-list__typography">
                <h3 class="api-list__heading">Smooth opacity transition</h3>
                <p class="api-list__item-description">
                  Simple and subtle, works well in most contexts
                </p>
              </div>

              <p class="api-list__default">Default</p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-animation="fade"
            >
              Fade
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                animation:
                <span class="content-article__special"> "slide" </span>
              </p>

              <div class="api-list__typography">
                <h3 class="api-list__heading">
                  Slide in from the tooltip's position
                </h3>
                <p class="api-list__item-description">
                  Directional animation that feels natural
                </p>
              </div>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-animation="slide"
            >
              Slide
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                animation:
                <span class="content-article__special"> "zoom" </span>
              </p>

              <div class="api-list__typography">
                <h3 class="api-list__heading">Scale up from center point</h3>
                <p class="api-list__item-description">
                  Eye-catching and modern appearance
                </p>
              </div>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-animation="zoom"
            >
              Zoom
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                animation:
                <span class="content-article__special"> "bounce" </span>
              </p>

              <div class="api-list__typography">
                <h3 class="api-list__heading">Playful bounce effect on show</h3>
                <p class="api-list__item-description">
                  Adds personality and draws attention
                </p>
              </div>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-animation="bounce"
            >
              Bounce
            </button>
          </li>
        </ul>
      </section>
      <section class="docs-section">
        <h3 class="docs-section__title">Delay Configuration</h3>

        <p class="content-article__sub-description">
          Configure how long to wait before showing the tooltip (in
          milliseconds).
        </p>

        <div class="box-y setup-example">
          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p>// Show immediately</p>
              <p>{ delay : 0 }</p>
              <p>&nbsp;</p>
              <p>// Show after 300 ms (default)</p>
              <p>{ delay : 300 }</p>
              <p>&nbsp;</p>
              <p>// Show after 1 second</p>
              <p>{ delay : 1000 }</p>
            </div>
          </div>
        </div>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
