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
    <h1>Documentation</h1>
    <p>Welcome to Hintorium documentation</p>

    <div class="docs-index__sections">
      <a href="/docs/motivation" class="docs-card">
        <h2>Motivation</h2>
        <p>Learn why we built Hintorium</p>
      </a>

      <a href="/docs/getting-started" class="docs-card">
        <h2>Getting Started</h2>
        <p>Quick start guide</p>
      </a>

      <a href="/docs/api" class="docs-card">
        <h2>API Reference</h2>
        <p>Complete API documentation</p>
      </a>
    </div>
  `;

  return DocsLayout(indexContent);
}
