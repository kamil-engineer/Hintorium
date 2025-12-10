import { escapeHtml } from "../helpers/html-sanitize";

type CodeSnippet = {
  language: "html" | "typescript" | "javascript" | "css";
  label: string;
  code: string;
};

type CodeExampleConfig = {
  title: string;
  description?: string;
  demo: string;
  snippets: CodeSnippet[];
};

export function CodeExample(config: CodeExampleConfig): string {
  const { title, description, demo, snippets } = config;

  const id = `code-example-${Math.random().toString(36).substr(2, 9)}`;

  return /* HTML */ `
    <div class="code-example">
      <!-- Title & Description -->
      <div class="code-example__header">
        <h3 class="code-example__title">${title}</h3>
        ${description
          ? /* HTML */ `<p class="code-example__description">${description}</p>`
          : ""}
      </div>

      <!-- Demo Area -->
      <div class="code-example__demo">${demo}</div>

      <!-- Code Viewer -->
      <div class="code-example__viewer" data-code-viewer="${id}">
        <!-- Tabs -->
        <div class="code-viewer__tabs">
          ${snippets
            .map(
              (snippet, index) => /* HTML */ `
                <button
                  class="code-viewer__tab ${index === 0
                    ? "code-viewer__tab--active"
                    : ""}"
                  data-tab="${id}-${index}"
                  data-language="${snippet.language}"
                >
                  ${snippet.label}
                </button>
              `
            )
            .join("")}
        </div>

        <!-- Code Panels -->
        <div class="code-viewer__panels">
          ${snippets
            .map(
              (snippet, index) => /* HTML */ `
                <div
                  class="code-viewer__panel ${index === 0
                    ? "code-viewer__panel--active"
                    : ""}"
                  data-panel="${id}-${index}"
                >
                  <!-- Copy Button -->
                  <button
                    class="code-viewer__copy"
                    data-copy="${id}-${index}"
                    aria-label="Copy code"
                    title="Copy to clipboard"
                  >
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
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path
                        d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                      />
                    </svg>
                    <span class="code-viewer__copy-text">Copy</span>
                  </button>

                  <!-- Code Block -->
                  <pre
                    class="code-viewer__pre"
                  ><code class="code-viewer__code language-${snippet.language}">${escapeHtml(
                    snippet.code
                  )}</code></pre>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}
