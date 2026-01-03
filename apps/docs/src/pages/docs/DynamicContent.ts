import { DocsArticleActions } from "../../components/DocsArticleActions";
import { dynamicTimeCalculation } from "../../logic/dynamic-time-calculation";
import { createIcon } from "../../utils/icons";

export const DynamicContent = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Dynamic Content</h1>
          ${DocsArticleActions()}
        </header>

        <p class="content-article__description">
          Various possibilities of creating content for our tool
        </p>

        <div class="content-article__tags">
          <span class="tag tag--time">
            ${createIcon("read")}
            <span class="time">Loading ...</span>
          </span>
        </div>
      </div>

      <p class="content-article__sub-description">
        In addition to creating plain text, Hintorium allows you to create more
        advanced content.
      </p>

      <section class="docs-section">
        <h2 class="docs-section__title">Markdown</h2>

        <div class="box-y setup-example">
          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p>const Markdown = () = {</p>
              <p class="ml-4">
                const button = document.createElement('button');
              </p>

              <p>&nbsp;</p>

              <p class="ml-4">button.textContent = 'Markdown';</p>

              <p>&nbsp;</p>

              <p class="ml-4">const markdownContent = '</p>
              <p>### Keyboard shortcuts</p>
              <p>- **Ctrl + S** — Save</p>
              <p>- **Ctrl + P** — Print'</p>

              <p>&nbsp;</p>

              <p class="ml-4">new Tooltip(button, markdownContent);</p>

              <p>&nbsp;</p>

              <p class="ml-4">return button;</p>
              <p>};</p>

              <p>&nbsp;</p>

              <p>root?.appendChild(Markdown());</p>
            </div>

            <div>
              <a
                href="https://stackblitz.com/edit/vitejs-vite-jf1zx6v9?file=src%2Fmain.ts,index.html&terminal=dev"
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
        <h2 class="docs-section__title">HTML Elements</h2>

        <div class="box-y setup-example">
          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p>const root = document.querySelector('#app');</p>

              <p>&nbsp;</p>

              <p>const CustomHTMLElements = () = {</p>
              <p class="ml-4">
                const button = document.createElement('button');
              </p>
              <p class="ml-4">const content = document.createElement('div');</p>

              <p>&nbsp;</p>

              <p class="ml-4">const html = /* HTML */ "</p>
              <p class="ml-8">&lt;h3&gt;John Doe&lt;/h3&gt;</p>
              <p class="ml-8">
                &lt;p&gt;Senior Developer at Hintorium &lt;/p&gt;
              </p>
              <p class="ml-4">";</p>

              <p>&nbsp;</p>

              <p class="ml-4">content.innerHTML = html;</p>
              <p class="ml-4">button.textContent = 'HTML Injection';</p>

              <p>&nbsp;</p>

              <p class="ml-4">new Tooltip(button, content);</p>

              <p>&nbsp;</p>

              <p class="ml-4">return button;</p>
              <p>};</p>

              <p>&nbsp;</p>

              <p>root?.appendChild(CustomHTMLElements());</p>
            </div>

            <div>
              <a
                href="https://stackblitz.com/edit/vitejs-vite-jf1zx6v9?file=src%2Fmain.ts,index.html&terminal=dev"
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
        <h2 class="docs-section__title">Lazy Dynamic Content</h2>

        <div class="box-y setup-example">
          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p>const LazyDynamicContent = () = {</p>
              <p class="ml-4">
                const button = document.createElement('button');
              </p>

              <p>&nbsp;</p>

              <p class="ml-4">button.textContent = 'Lazy Dynamic Content';</p>

              <p>&nbsp;</p>

              <p class="ml-4">
                const currentTime = new Date().toLocaleTimeString();
              </p>

              <p>&nbsp;</p>

              <p class="ml-4">
                new Tooltip(button, 'Current time : $${"{"}currentTime}');
              </p>

              <p>&nbsp;</p>

              <p class="ml-4">return button;</p>
              <p>};</p>

              <p>&nbsp;</p>

              <p>root?.appendChild(LazyDynamicContent());</p>
            </div>

            <div>
              <a
                href="https://stackblitz.com/edit/vitejs-vite-jf1zx6v9?file=src%2Fmain.ts,index.html&terminal=dev"
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
        <h2 class="docs-section__title">Async Content</h2>

        <div class="box-y setup-example">
          <div class="setup-example__code-block">
            <div class="install-method__code">
              <p>const AsyncContent = () = {</p>
              <p class="ml-4">
                const button = document.createElement('button');
              </p>
              <p class="ml-4">button.textContent = 'Async Content';</p>

              <p>&nbsp;</p>

              <p class="ml-4">const content = document.createElement('div');</p>

              <p>&nbsp;</p>

              <p class="ml-4">new Tooltip(button, async () = {</p>

              <p class="ml-8">
                const res = await
                fetch('https://jsonplaceholder.typicode.com/users/2');
              </p>
              <p class="ml-8">const data = await res.json();</p>

              <p>&nbsp;</p>

              <p class="ml-8">const html = '</p>
              <p class="ml-12">
                &lt;strong&gt;$${"{"}data.name}&lt;/strong&gt;&lt;br&gt;
              </p>
              <p class="ml-12">&lt;small&gt;$${"{"}data.email}&lt;/small&gt;</p>
              <p class="ml-8">';</p>

              <p>&nbsp;</p>

              <p class="ml-8">content.innerHTML = html;</p>

              <p>&nbsp;</p>

              <p class="ml-8">return content;</p>
              <p class="ml-4">});</p>

              <p>&nbsp;</p>

              <p class="ml-4">return button;</p>
              <p>};</p>

              <p>&nbsp;</p>

              <p>root?.appendChild(AsyncContent());</p>
            </div>

            <div>
              <a
                href="https://stackblitz.com/edit/vitejs-vite-jf1zx6v9?file=src%2Fmain.ts,index.html&terminal=dev"
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
    </article>
  `;

  container.innerHTML = content;

  dynamicTimeCalculation(container);

  return container;
};
