import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const AnalyticsTracking = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Analytics & Tracking</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Track tooltip interactions and gather usage analytics
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <section class="docs-section">
        <h2 class="docs-section__title">What analytics mean?</h2>
        <p class="docs-section__text">
          Analytics help you understand how users interact with your tooltips.
        </p>

        <div class="contextual">
          <p class="contextual__text">
            Hintorium stores all analytical data in
            <strong class="contextual__special"> local storage </strong>
            so that it is not retained per refresh.
          </p>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Setup</h2>

        <div class="box-y setup-example">
          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p class="ml-4">
                import { Tooltip, Analytics } from "hintorium-core";
              </p>

              <p>&nbsp;</p>

              <p class="ml-4">
                const button = document.createElement("button");
              </p>
              <p class="ml-4">button.textContent = "Hover me";</p>
              <p class="ml-4">new Tooltip(button,'Analytics Example',{</p>
              <p class="ml-8">id:'example-tooltip'</p>
              <p class="ml-8">onShow: (id) => {</p>
              <p class="ml-12">console.log(Analytics.getCount(id));</p>
              <p class="ml-8">}</p>
              <p class="ml-4">});</p>

              <p>&nbsp;</p>

              <p class="ml-4">document.body.appendChild(button);</p>
            </div>
          </div>

          <div class="setup-example__code-block">
            <div>
              <a
                href="https://stackblitz.com/edit/vitejs-vite-eqvnddge?file=index.html&terminal=dev"
                class="button button--lg button--primary"
                target="_blank"
              >
                ${createIcon("play")}
                <span>Example</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Best practices</h2>
        <ul class="best-practices">
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Use analytics to monitor tooltip engagement and optimize content.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Combine analytics with A/B testing to refine tooltip designs.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Regularly review analytics to identify trends and user preferences.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Ensure user privacy by anonymizing data and complying with
            regulations.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Leverage analytics to inform future tooltip strategies and
            improvements.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Don't afraid to integrate with third-party analytics tools for
            deeper insights.
          </li>
        </ul>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
