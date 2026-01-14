import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const Internationalization = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Internationalization</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Support multiple languages and right-to-left layouts in your tooltips
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <section class="docs-section">
        <h2 class="docs-section__title">Setup</h2>
        <p class="docs-section__text">
          Configure the tooltip library to support multiple languages in your
          application.
        </p>

        <div class="contextual">
          <p class="contextual__text">
            The I18n module allows you to
            <strong class="contextual__special">
              add translations for different languages
            </strong>
            and switch between them dynamically. Don't worry about setup
            language, it will
            <strong class="contextual__special">
              automatically detect the browser or document language.
            </strong>
          </p>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Translations</h2>
        <p class="docs-section__text">
          Provide translated content for tooltips in different languages.
        </p>

        <div class="box-y setup-example">
          <h3 class="setup-example__title">In same file</h3>

          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p class="ml-4">
                I18n.setTranslations("pl", { "tooltip.save": "Zapisz zmiany",
                });
              </p>
              <p class="ml-4">
                I18n.setTranslations("en", { "tooltip.save": "Save changes", });
              </p>

              <p>&nbsp;</p>

              <p class="ml-4">
                const button = document.createElement("button");
              </p>
              <p class="ml-4">button.textContent = "Save";</p>
              <p class="ml-4">new Tooltip(button, "tooltip.save");</p>

              <p>&nbsp;</p>

              <p class="ml-4">document.body.appendChild(button);</p>
            </div>
          </div>
          <div class="line">&nbsp;</div>

          <h3 class="setup-example__title">Importing</h3>

          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p class="ml-4">I18n.loadMultipleTranslations([</p>
              <p class="ml-8">{ lang: "en", url: "/en.json" },</p>
              <p class="ml-8">{ lang: "pl", url: "/pl.json" },</p>
              <p class="ml-4">]);</p>
            </div>
          </div>
          <div class="line">&nbsp;</div>

          <div class="setup-example__code-block">
            <div>
              <a
                href="https://stackblitz.com/edit/vitejs-vite-tdtih2be?file=src%2Fmain.ts"
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
            Library automatically detects browser language and switches tooltips
            accordingly.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Import translations from external JSON files to keep codebase clean.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Use descriptive keys for tooltip texts to make translations easier.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Test tooltips in different languages to ensure proper display and
            formatting.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Consider right-to-left (RTL) layouts for languages like Arabic or
            Hebrew.
          </li>
        </ul>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
