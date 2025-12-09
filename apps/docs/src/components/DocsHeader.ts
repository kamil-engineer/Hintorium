import { getDocLabel } from "../config/docs-navigation";
import { createIcon } from "../utils/icons";

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => {
      const upperWord = word.toUpperCase();
      if (
        ["API", "URL", "HTTP", "CSS", "JS", "HTML", "SEO"].includes(upperWord)
      ) {
        return upperWord;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export const DocsHeader = () => {
  const currentPath = window.location.pathname;

  const separator = /* HTML */ `
    <li class="breadcrumbs__item">
      ${createIcon("breadcrumbSeparator", "breadcrumbs__icon")}
    </li>
  `;

  let breadcrumbItems = /* HTML */ `
    <li class="breadcrumbs__item">
      <a
        href="/"
        class="link link--breadcrumb ${currentPath === "/"
          ? "link--current"
          : ""}"
      >
        Home
      </a>
    </li>
    ${separator}
    <li class="breadcrumbs__item">
      <a
        href="/docs"
        class="link link--breadcrumb ${currentPath === "/docs" ||
        currentPath === "/docs/"
          ? "link--current"
          : ""}"
      >
        Documentation
      </a>
    </li>
  `;

  if (currentPath.startsWith("/docs/")) {
    const label = getDocLabel(currentPath);

    if (label) {
      breadcrumbItems += /* HTML */ `
        ${separator}
        <li class="breadcrumbs__item">
          <a href="${currentPath}" class="link link--breadcrumb link--current">
            ${label}
          </a>
        </li>
      `;
    } else {
      // Fallback
      const segments = currentPath.split("/").filter(Boolean);
      const lastSegment = segments[segments.length - 1];
      const fallbackLabel = slugToLabel(lastSegment);

      breadcrumbItems += /* HTML */ `
        ${separator}
        <li class="breadcrumbs__item">
          <span class="link link--breadcrumb link--current"
            >${fallbackLabel}</span
          >
        </li>
      `;
    }
  }

  const content = /* HTML */ `
    <header class="docs-content__header">
      <nav aria-label="Breadcrumb">
        <ul class="breadcrumbs">
          ${breadcrumbItems}
        </ul>
      </nav>
    </header>
  `;

  return content;
};
