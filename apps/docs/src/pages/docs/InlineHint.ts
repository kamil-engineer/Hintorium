import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const InlineHint = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Inline Hints</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Create contextual inline hints and helper tooltips within text content
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <section class="docs-section">
        <h2 class="docs-section__title">What are Inline Hints?</h2>
        <p class="docs-section__text">
          Inline hints are small, contextual tooltips that appear within text
          content to provide additional information without disrupting the
          reading flow.
        </p>

        <div class="contextual">
          <p class="contextual__text">
            They're perfect for explaining
            <strong class="contextual__special"> technical terms </strong>,
            providing
            <strong class="contextual__special"> definitions </strong>
            , or offering
            <strong class="contextual__special"> extra context </strong>
            .
          </p>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section__title">Creating Inline Hints</h2>
        <p class="docs-section__text">
          To create an inline hint, simply wrap the target text in a span or
          similar element and initialize a tooltip on that element.
        </p>

        <div class="box-y setup-example">
          <h3 class="setup-example__title">HTML Approach</h3>

          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p>&lt;div&gt;</p>
              <p class="ml-4">&lt;label</p>
              <p class="ml-8">for='email'</p>
              <p class="ml-8">data-hintorium-hint="This is required field"</p>
              <p class="ml-8">data-hintorium-tooltip-position="right"</p>
              <p class="ml-4">/&gt;</p>

              <p>&nbsp;</p>

              <p class="ml-4">&lt;input</p>
              <p class="ml-8">id='email'</p>
              <p class="ml-8">required</p>
              <p class="ml-4">/&gt;</p>

              <p>&lt;/div&gt;</p>
            </div>
          </div>
          <div class="line">&nbsp;</div>

          <h3 class="setup-example__title">Programmatic Approach</h3>

          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p>const inlineHint = () => {</p>
              <p class="ml-4">
                const groupElement = document.createElement('div');
              </p>
              <p class="ml-4">const label = document.createElement('label');</p>

              <p>&nbsp;</p>

              <p class="ml-4">label.textContent = 'Password';</p>
              <p class="ml-4">label.htmlFor = 'password';</p>

              <p>&nbsp;</p>

              <p class="ml-4">const input = document.createElement('input');</p>

              <p>&nbsp;</p>

              <p class="ml-4">input.required = true;</p>
              <p class="ml-4">input.id = 'password';</p>
              <p class="ml-4">input.type = 'password';</p>

              <p>&nbsp;</p>

              <p class="ml-4">
                new InlineHint(label, 'This is required field!', {
              </p>
              <p class="ml-8">position: 'bottom',</p>
              <p class="ml-8">theme: 'gradient',</p>
              <p class="ml-4">});</p>

              <p>&nbsp;</p>

              <p class="ml-4">groupElement.appendChild(label);</p>
              <p class="ml-4">groupElement.appendChild(input);</p>

              <p>&nbsp;</p>

              <p class="ml-4">document.body.appendChild(groupElement);</p>
              <p>};</p>

              <p>&nbsp;</p>

              <p>inlineHint();</p>
            </div>

            <div>
              <a
                href="https://stackblitz.com/edit/vitejs-vite-4v89t7pj?file=src%2Fmain.ts,src%2Fstyle.css,index.html&terminal=dev"
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
        <h2 class="docs-section__title">Common Patterns</h2>
        <ul class="best-practices">
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Define technical terms inline without external links.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Small question mark icons with contextual help.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Provide extra context for form fields without cluttering the UI.
          </li>
          <li class="best-practices__item">
            <span class="best-practices__marker">&nbsp;</span>
            Explain new or premium features with hover tooltips.
          </li>
        </ul>
      </section>
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
