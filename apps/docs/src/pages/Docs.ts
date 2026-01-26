import { DocsArticleActions } from "../components/DocsArticleActions";
import { DocsHeader } from "../components/DocsHeader";
import { topics } from "../data/topics";
import { DocsContent } from "../layout/DocsContent";
import { Header } from "../layout/Header";
import { MobileNavigation } from "../layout/MobileNavigation";
import { createIcon } from "../utils/icons";

function isDocsIndexPage(path: string = window.location.pathname): boolean {
  return path === "/docs" || path === "/docs/";
}

export function DocsLayout(content: HTMLElement): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");

  const currentPath = window.location.pathname;
  const showSideContents = !isDocsIndexPage(currentPath);

  const layoutHTML = /* HTML */ `
    <div class="header-with-nav">
      ${MobileNavigation()} ${Header({ docs: true })}
    </div>
    <main class="docs-content">
      <div class="wrapper">
        ${DocsHeader()} ${DocsContent(content, showSideContents)}
      </div>
    </main>
  `;

  container.innerHTML = layoutHTML;

  return container;
}

export default function Docs(): HTMLElement {
  const indexContent = document.createElement("div");
  indexContent.classList.add("docs-index");

  indexContent.innerHTML = /* HTML */ `
    <article class="content-article">
      <div class="content-article__top-wrapper">
        <header class="content-article__header">
          <h1 class="content-article__title">Documentation</h1>
          ${DocsArticleActions()}
        </header>
        <p class="content-article__description">
          Everything you need to know about building beautiful, accessible
          tooltips with the Tooltip Library.
        </p>
      </div>

      <div class="content-article__cta cta">
        ${createIcon("fast", "cta__icon")}

        <div class="cta__content">
          <h2 class="cta__title">Quick Start</h2>
          <p class="cta__description">
            Get up and running with just a few lines of code.
          </p>
          <div class="cta__actions">
            <a
              href="/docs/getting-started"
              class="button button--primary button--sm"
            >
              Start now</a
            >
            <a href="/docs/examples" class="button button--outline button--sm">
              See examples</a
            >
          </div>
        </div>
      </div>

      <div class="topics">
        <h2 class="topics__title">Key Topics</h2>
        <ul class="topics__list">
          ${topics
            .map(
              (topic) => /* HTML */ `
                <li class="topics__item">
                  <div class="topics__item-top">
                    ${createIcon(topic.icon, "topics__icon")}
                    <h3 class="topics__subtitle">${topic.title}</h3>
                  </div>
                  <p class="topics__item-description">${topic.description}</p>
                  <a href="${topic.href}" class="link link--topic">
                    Explore ${createIcon("rightArrow", "link--topic-icon")}
                  </a>
                </li>
              `,
            )
            .join("")}
        </ul>
      </div>
      <div class="story">
        <h3 class="story__title">Want to know why we built this?</h3>
        <p class="story__description">
          Learn about the problems we solved and the vision behind Hintorium.
        </p>
        <a href="/docs/motivation" class="link link--topic link--story"
          >Read our story ${createIcon("rightArrow", "link--topic-icon")}
        </a>
      </div>
    </article>
    <p class="content-article__bottom">
      New to tooltips? Start with the <b>Introduction</b> guide.
    </p>
  `;

  return DocsLayout(indexContent);
}
