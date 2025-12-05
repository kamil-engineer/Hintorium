import { getDocPages, type DocPage } from "../config/docs-navigation";
import { createIcon } from "../utils/icons";

function getAdjacentPages(currentPath: string): {
  prev: DocPage | null;
  next: DocPage | null;
} {
  const pages = getDocPages();
  const currentIndex = pages.findIndex((page) => page.path === currentPath);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? pages[currentIndex - 1] : null,
    next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null,
  };
}

function isDocsIndexPage(path: string): boolean {
  return path === "/docs" || path === "/docs/";
}

export const DocsArticleActions = () => {
  const currentPath = window.location.pathname;
  const isIndexPage = isDocsIndexPage(currentPath);

  let prev: DocPage | null = null;
  let next: DocPage | null = null;

  if (isIndexPage) {
    const pages = getDocPages();
    next = pages.length > 0 ? pages[0] : null;
  } else {
    const adjacent = getAdjacentPages(currentPath);
    prev = adjacent.prev;
    next = adjacent.next;
  }

  const content = /* HTML */ `
    <div class="article__actions">
      <button class="button button--outline button--sm button--copy">
        ${createIcon("copy", "button__icon")} Copy page
      </button>
      <div class="article__navigation">
        ${prev || next
          ? /* HTML */ `
              <div class="article__navigation">
                ${prev
                  ? /* HTML */ `
                      <a
                        href="${prev.path}"
                        class="button button--outline button--sm button--nav"
                        aria-label="Previous page: ${prev.title}"
                      >
                        ${createIcon("leftArrow", "button__icon")}
                      </a>
                    `
                  : ""}
                ${next
                  ? /* HTML */ `
                      <a
                        href="${next.path}"
                        class="button button--outline button--sm button--nav"
                        aria-label="Next page: ${next.title}"
                      >
                        ${createIcon("rightArrow", "button__icon")}
                      </a>
                    `
                  : ""}
              </div>
            `
          : ""}
      </div>
    </div>
  `;

  return content;
};
