import { DOCS_NAVIGATION, homeNavItems } from "../data/docs-navigation";
import { isLinkActive } from "../helpers/link";

function isDocsPage(): boolean {
  return window.location.pathname.startsWith("/docs");
}

export const MobileNavigation = () => {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash.slice(1);
  const isDocs = isDocsPage();

  let navItems = "";

  if (isDocs) {
    navItems = /* HTML */ `
      ${DOCS_NAVIGATION.map((item) => {
        if (item.type === "section") {
          return /* HTML */ ` <li class="nav__subtitle">${item.title}</li> `;
        }

        const isActive = isLinkActive(
          item.path,
          currentPath,
          currentHash,
          true,
        );

        return /* HTML */ `
          <li>
            <a
              class="link link--navigation ${isActive ? "link--active" : ""}"
              href="${item.path}"
              ${isActive ? 'aria-current="page"' : ""}
            >
              ${item.title}
            </a>
          </li>
        `;
      }).join("")}
    `;
  } else {
    navItems = /* HTML */ `
      <li class="nav__subtitle">Menu</li>
      ${homeNavItems
        .map((item) => {
          const isActive = isLinkActive(
            item.href,
            currentPath,
            currentHash,
            true,
          );

          return /* HTML */ `
            <li>
              <a
                class="link link--navigation ${isActive ? "link--active" : ""}"
                href="${item.href}"
                ${isActive ? 'aria-current="page"' : ""}
              >
                ${item.title}
              </a>
            </li>
          `;
        })
        .join("")}
    `;
  }

  const content = /* HTML */ `
    <nav class="mobile-nav">
      <ul class="nav__list">
        ${navItems}
      </ul>
    </nav>
  `;

  return content;
};
