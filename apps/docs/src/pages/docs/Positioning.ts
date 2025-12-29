import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const Positioning = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Positioning</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Learn how to position tooltips in different directions.
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <p class="content-article__sub-description">
        The Hintorium library supports
        <span class="content-article__special">4</span> different positioning
        options to ensure tooltips display optimally in any context.
      </p>

      <section class="docs-section">
        <h2 class="docs-section__title">
          ${createIcon("bundle", "docs-section__icon")}
          <span>TooltipPosition</span>
        </h2>

        <ul class="api-list">
          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                position: <span class="content-article__special"> "top" </span>
              </p>

              <p class="api-list__item-description">
                Display tooltip above the element
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-position="top"
            >
              Top
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                position:
                <span class="content-article__special"> "bottom" </span>
              </p>
              <p class="api-list__item-description">
                Display tooltip below the element
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-position="bottom"
            >
              Bottom
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                position: <span class="content-article__special"> "left" </span>
              </p>
              <p class="api-list__item-description">
                Display tooltip to the left of the element
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-position="left"
            >
              Left
            </button>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                position:
                <span class="content-article__special"> "right" </span>
              </p>
              <p class="api-list__item-description">
                Display tooltip to the right of the element
              </p>
            </div>

            <button
              class="button button--sm button--outline"
              data-hintorium-tooltip="Example"
              data-hintorium-tooltip-position="right"
            >
              Right
            </button>
          </li>
        </ul>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Best Practices</h2>
        <ul class="best-practices">
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Choose positioning based on available viewport space
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Use top or bottom positions for horizontal layouts
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Left/right positions work best for vertical navigation
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            The library automatically adjusts position if space is limited
          </li>
        </ul>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
