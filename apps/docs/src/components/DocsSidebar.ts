import { DOCS_NAVIGATION } from "../data/docs-navigation";
import { isLinkActive } from "../helpers/link";

export const DocsSidebar = () => {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash.slice(1);

  const content = /* HTML */ `
    <aside class="docs-main__sidebar sidebar">
      <ul class="sidebar__list">
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
                href="${item.path}"
                class="link link--sidebar ${isActive
                  ? "button--primary link--primary"
                  : ""}"
                ${isActive ? 'aria-current="page"' : ""}
              >
                ${item.title}
              </a>
            </li>
          `;
        }).join("")}
      </ul>
    </aside>
  `;

  return content;
};
