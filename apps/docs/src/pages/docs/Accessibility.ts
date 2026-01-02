import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const Accessibility = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Accessibility</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Ensure your tooltips are accessible to all users with comprehensive
          a11y support.
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <p class="content-article__sub-description">
        The Hintorium Library is built with accessibility as a core principle,
        ensuring all users can access tooltip content.
      </p>

      <section class="docs-section">
        <h2 class="docs-section__title">
          ${createIcon("accessibility", "docs-section__icon")}
          <span>Configuration options</span>
        </h2>

        <ul class="api-list">
          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                a11y.keyboard:
                <span class="content-article__special"> "boolean" </span>
              </p>

              <p class="api-list__item-description">
                Enable keyboard navigation for tooltips. Users can trigger
                tooltips using Tab and show/hide using Enter or Space.
              </p>

              <p class="api-list__default">Default : true</p>
            </div>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                a11y.announceOnShow:
                <span class="content-article__special"> "boolean" </span>
              </p>

              <p class="api-list__item-description">
                Announce tooltip content to screen readers when displayed using
                ARIA live regions.
              </p>

              <p class="api-list__default">Default : true</p>
            </div>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                a11y.focusable:
                <span class="content-article__special"> "boolean" </span>
              </p>

              <p class="api-list__item-description">
                Make the tooltip itself focusable, useful for tooltips with
                interactive content.
              </p>

              <p class="api-list__default">Default : false</p>
            </div>
          </li>
        </ul>
      </section>
      <section class="docs-section">
        <h2 class="docs-section__title">
          ${createIcon("accessibility", "docs-section__icon")}
          <span>Mobile support</span>
        </h2>

        <ul class="api-list">
          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                mobile.enabled:
                <span class="content-article__special"> "boolean" </span>
              </p>

              <p class="api-list__item-description">
                Enable or disable tooltips on mobile devices. Useful for
                preventing conflicts with touch interactions.
              </p>

              <p class="api-list__default">Default : true</p>
            </div>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                mobile.longPress:
                <span class="content-article__special"> "boolean" </span>
              </p>

              <p class="api-list__item-description">
                Require long press to show tooltips on mobile, preventing
                accidental triggers during scrolling.
              </p>

              <p class="api-list__default">Default : false</p>
            </div>
          </li>

          <li class="api-list__item">
            <div class="api-list__content">
              <p class="api-list__type">
                mobile.touchDelay:
                <span class="content-article__special"> "boolean" </span>
              </p>

              <p class="api-list__item-description">
                Delay in milliseconds before showing tooltip on touch devices.
              </p>

              <p class="api-list__default">Default : 0</p>
            </div>
          </li>
        </ul>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">WCAG Compliance</h2>
        <p class="docs-section__description">
          The Tooltip Library follows WCAG 2.1 Level AA guidelines:
        </p>
        <ul class="box-y best-practices">
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Full keyboard navigation (Tab, Enter, Escape)
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Proper ARIA labels and roles (aria-describedby, role="tooltip")
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Screen reader announcements via live regions
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            High contrast mode support
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Focus management for interactive tooltips
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            RTL (Right-to-Left) language support
          </li>
        </ul>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
