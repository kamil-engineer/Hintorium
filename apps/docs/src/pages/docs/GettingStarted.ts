import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const GettingStarted = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Getting Started</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Learn how to install and set up Hintorium in your project. Get your
          first tooltip running in minutes.
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <section class="docs-section">
        <h2 class="docs-section__title">Installation</h2>
        <p class="docs-section__text">
          Hintorium can be installed via npm, yarn. Choose the method that works
          best for your project.
        </p>

        <div class="install-methods">
          <div class="install-method">
            <div class="install-method__header">
              <div class="install-method__icon">
                ${createIcon("bundle", "install-method__svg")}
              </div>
              <h3 class="install-method__title">npm</h3>
            </div>

            <p class="install-method__description">
              Most popular package manager for Node.js
            </p>

            <div class="install-method__code">
              <span>npm install hintorium-core</span>
            </div>
          </div>

          <div class="install-method">
            <div class="install-method__header">
              <div class="install-method__icon">
                ${createIcon("bundle", "install-method__svg")}
              </div>
              <h3 class="install-method__title">yarn</h3>
            </div>

            <p class="install-method__description">
              Fast, reliable package manager
            </p>

            <div class="install-method__code">
              <span>yarn add hintorium-core</span>
            </div>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Quick Setup</h2>
        <p class="docs-section__text">
          Import and start using tooltips in your application with just a few
          lines of code.
        </p>

        <div class="setup-example">
          <h3 class="setup-example__title">Basic Example</h3>

          <div class="content-article__cta cta">
            ${createIcon("bulb", "cta__icon")}
            <div class="cta__content">
              <h3 class="cta__title">Your First Tooltip</h3>
              <p class="cta__description">
                Here's how to create a simple tooltip. Import the component and
                wrap it around any element.
              </p>
            </div>
          </div>

          <span class="line">&nbsp;</span>

          <div class="setup-example__code-block">
            <p class="setup-example__subtitle">Import the library:</p>
            <div class="install-method__code">
              <p>import { Tooltip } from 'hintorium-core'</p>
              <p>import 'hintorium-core/dist/hintorium-core.css'</p>
            </div>
          </div>

          <div class="setup-example__code-block">
            <p class="setup-example__subtitle">Use it in your component/app</p>
            <div class="install-method__code">
              <p>new Tooltip(*HTML_ELEMENT*,*CONTENT*)</p>
            </div>
          </div>

          <div>
            <a
              href="https://stackblitz.com/edit/vitejs-vite-yxy6i8bp?file=src%2Fmain.ts,index.html,src%2Fstyle.css&terminal=dev"
              class="button button--lg button--primary"
              target="_blank"
            >
              ${createIcon("play")}
              <span>Basic Example</span>
            </a>
          </div>
        </div>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
