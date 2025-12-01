import { DocsArticleActions } from "../components/DocsArticleActions";
import { DocsHeader } from "../components/DocsHeader";
import { DocsContent } from "../layout/DocsContent";
import { Header } from "../layout/Header";
import { MobileNavigation } from "../layout/MobileNavigation";

export function DocsLayout(content: HTMLElement): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");

  const layoutHTML = /* HTML */ `
    <div class="header-with-nav">
      ${MobileNavigation()} ${Header({ docs: true })}
    </div>
    <main class="docs-content">
      <div class="wrapper">${DocsHeader()} ${DocsContent(content)}</div>
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
      <div class="top-wrapper">
        <header class="article__header">
          <h1 class="article__title">Documentation</h1>
          ${DocsArticleActions()}
        </header>
        <p class="article__description">
          Everything you need to know about building beautiful, accessible
          tooltips with the Tooltip Library.
        </p>
      </div>

      <div class="article__cta cta">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="cta__icon"
        >
          <path
            d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
          ></path>
        </svg>
        <div class="cta__content">
          <h2 class="cta__title">Quick Start</h2>
          <p class="cta__description">
            Get up and running with just a few lines of code.
          </p>
          <div class="cta__actions">
            <a href="#" class="button button--primary button--sm"> Start now</a>
            <a href="#" class="button button--outline button--sm">
              See examples</a
            >
          </div>
        </div>
      </div>

      <div class="topics">
        <h2 class="topics__title">Key Topics</h2>
        <ul class="topics__list">
          <li class="topics__item">
            <div class="topics__item-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="topics__icon"
                aria-hidden="true"
              >
                <path d="M12 7v14"></path>
                <path
                  d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                ></path>
              </svg>
              <h3 class="topics__subtitle">Introduction</h3>
            </div>
            <p class="topics__item-description">
              Learn the basics about Tooltip Library
            </p>
            <a href="#asddd" class="link link--topic"
              >Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="link--topic-icon"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </li>
          <li class="topics__item">
            <div class="topics__item-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="topics__icon"
                aria-hidden="true"
              >
                <path d="M12 7v14"></path>
                <path
                  d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                ></path>
              </svg>
              <h3 class="topics__subtitle">Introduction</h3>
            </div>
            <p class="topics__item-description">
              Learn the basics about Tooltip Library
            </p>
            <a href="#asddd" class="link link--topic"
              >Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="link--topic-icon"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </li>
          <li class="topics__item">
            <div class="topics__item-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="topics__icon"
                aria-hidden="true"
              >
                <path d="M12 7v14"></path>
                <path
                  d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                ></path>
              </svg>
              <h3 class="topics__subtitle">Introduction</h3>
            </div>
            <p class="topics__item-description">
              Learn the basics about Tooltip Library
            </p>
            <a href="#asddd" class="link link--topic"
              >Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="link--topic-icon"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </li>
          <li class="topics__item">
            <div class="topics__item-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="topics__icon"
                aria-hidden="true"
              >
                <path d="M12 7v14"></path>
                <path
                  d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                ></path>
              </svg>
              <h3 class="topics__subtitle">Introduction</h3>
            </div>
            <p class="topics__item-description">
              Learn the basics about Tooltip Library
            </p>
            <a href="#asddd" class="link link--topic"
              >Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="link--topic-icon"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </li>
          <li class="topics__item">
            <div class="topics__item-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="topics__icon"
                aria-hidden="true"
              >
                <path d="M12 7v14"></path>
                <path
                  d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                ></path>
              </svg>
              <h3 class="topics__subtitle">Introduction</h3>
            </div>
            <p class="topics__item-description">
              Learn the basics about Tooltip Library
            </p>
            <a href="#asddd" class="link link--topic"
              >Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="link--topic-icon"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </li>
          <li class="topics__item">
            <div class="topics__item-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="topics__icon"
                aria-hidden="true"
              >
                <path d="M12 7v14"></path>
                <path
                  d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                ></path>
              </svg>
              <h3 class="topics__subtitle">Introduction</h3>
            </div>
            <p class="topics__item-description">
              Learn the basics about Tooltip Library
            </p>
            <a href="#asddd" class="link link--topic"
              >Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="link--topic-icon"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div class="story">
        <h3 class="story__title">Want to know why we built this?</h3>
        <p class="story__description">
          Learn about the problems we solved and the vision behind Hintorium.
        </p>
        <a href="#asddd" class="link link--topic link--story"
          >Read our story
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="link--topic-icon"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </article>
    <p class="article-bottom">
      New to tooltips? Start with the <b>Introduction</b> guide.
    </p>
  `;

  return DocsLayout(indexContent);
}
