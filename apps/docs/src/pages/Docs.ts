import { DocsArticleActions } from "../components/DocsArticleActions";
import { DocsHeader } from "../components/DocsHeader";
import { DocsContent } from "../layout/DocsContent";
import { Header } from "../layout/Header";
import { MobileNavigation } from "../layout/MobileNavigation";

function isDocsIndexPage(path: string = window.location.pathname): boolean {
  return path === "/docs" || path === "/docs/";
}

export function DocsLayout(content: HTMLElement): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("container");

  const currentPath = window.location.pathname;
  const showSideContents = !isDocsIndexPage(currentPath);

  console.log(currentPath);

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
            <a href="/docs/introduction" class="link link--topic"
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
              >
                <path
                  d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
                ></path>
              </svg>
              <h3 class="topics__subtitle">Getting Started</h3>
            </div>
            <p class="topics__item-description">
              Install and set up in minutes
            </p>
            <a href="/docs/getting-started" class="link link--topic"
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
              >
                <path d="m18 16 4-4-4-4"></path>
                <path d="m6 8-4 4 4 4"></path>
                <path d="m14.5 4-5 16"></path>
              </svg>
              <h3 class="topics__subtitle">API reference</h3>
            </div>
            <p class="topics__item-description">Complete API documentation</p>
            <a href="/docs/api" class="link link--topic"
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
              >
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                <path
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
                ></path>
              </svg>
              <h3 class="topics__subtitle">Customization</h3>
            </div>
            <p class="topics__item-description">Customize the look and feel</p>
            <a href="/docs/styling" class="link link--topic"
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
              >
                <circle cx="16" cy="4" r="1"></circle>
                <path d="m18 19 1-7-6 1"></path>
                <path d="m5 8 3-3 5.5 3-2.36 3.5"></path>
                <path d="M4.24 14.5a5 5 0 0 0 6.88 6"></path>
                <path d="M13.76 17.5a5 5 0 0 0-6.88-6"></path>
              </svg>
              <h3 class="topics__subtitle">Accessibility</h3>
            </div>
            <p class="topics__item-description">
              WCAG compliant and keyboard friendly
            </p>
            <a href="/docs/accessibility" class="link link--topic"
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
              >
                <path d="M16 8q6 0 6-6-6 0-6 6" />
                <path d="M17.41 3.59a10 10 0 1 0 3 3" />
                <path d="M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14" />
              </svg>
              <h3 class="topics__subtitle">Animation</h3>
            </div>
            <p class="topics__item-description">Feel free to animations</p>
            <a href="/docs/animations" class="link link--topic"
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
