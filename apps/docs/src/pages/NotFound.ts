import { router } from "../main";
import { createIcon } from "../utils/icons";

export default function NotFound(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");

  const content = /* HTML */ `
    <main class="not-found">
      <div class="not-found__content">
        <div class="not-found__icon">
          ${createIcon("alert", "not-found__icon-svg")}
        </div>
        <h1 class="not-found__title">404</h1>
        <h2 class="not-found__subtitle">Page not found</h2>
        <p class="not-found__description">
          It seems you've lost your way. The page you're looking for doesn't
          exist, has been moved, or the URL is incorrect.
        </p>

        <div class="not-found__actions">
          <a href="/" class="button button--primary button--lg">
            ${createIcon("accessibility", "button__icon")}
            <span>Home</span>
          </a>

          <button class="button button--outline button--lg" data-back>
            ${createIcon("book", "button__icon")}
            <span>Back</span>
          </button>
        </div>

        <div class="not-found__links">
          <h3 class="not-found__links-title">Maybe you are looking for:</h3>

          <ul class="not-found__quick-links">
            <li>
              <a href="/docs/introduction" class="link link--quick">
                ${createIcon("book", "quick-link__icon")}
                <span>Documentation</span>
              </a>
            </li>

            <li>
              <a href="/docs/getting-started" class="link link--quick">
                ${createIcon("rocket", "quick-link__icon")}
                <span>Getting Started</span>
              </a>
            </li>

            <li>
              <a href="/docs/api" class="link link--quick">
                ${createIcon("code", "quick-link__icon")}
                <span>API Reference</span>
              </a>
            </li>

            <li>
              <a href="/docs/examples" class="link link--quick">
                ${createIcon("bulb", "quick-link__icon")}
                <span>Examples</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  `;

  container.innerHTML = content;

  container.addEventListener("click", (ev) => {
    if (!(ev.target instanceof HTMLButtonElement)) return;

    router.back();
  });

  return container;
}
