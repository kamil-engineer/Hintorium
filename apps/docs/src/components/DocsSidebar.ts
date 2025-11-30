import { isLinkActive } from "../helpers/link";
import NotFound from "../pages/NotFound";

export const DocsSidebar = () => {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash.slice(1);

  const docs = [
    {
      subtitle: "Documentation",
    },
    {
      path: "/docs/motivation",
      title: "Motivation",
      view: NotFound,
    },
    {
      path: "/docs/introduction",
      title: "Introduction",
      view: NotFound,
    },
    {
      path: "/docs/getting-started",
      title: "Getting Started",
      view: NotFound,
    },
    {
      path: "/docs/basic",
      title: "Basic Usage",
      view: NotFound,
    },
    {
      path: "/docs/api",
      title: "API Reference",
      view: NotFound,
    },
    {
      path: "/docs/positioning",
      title: "Positioning",
      view: NotFound,
    },
    {
      path: "/docs/style",
      title: "Styling & Theming",
      view: NotFound,
    },
    {
      path: "/docs/animations",
      title: "Animations",
      view: NotFound,
    },
    {
      path: "/docs/accessibility",
      title: "Accessibility",
      view: NotFound,
    },
    {
      path: "/docs/advanced",
      title: "Advanced",
      view: NotFound,
    },
  ];

  const content = /* HTML */ `
    <aside class="docs-main__sidebar sidebar">
      <ul class="sidebar__list">
        ${docs
          .map((item) => {
            const isActive = isLinkActive(
              item.path ?? "",
              currentPath,
              currentHash,
              true
            );

            if (item.subtitle) {
              return /* HTML */ `
                <li class="nav__subtitle">${item.subtitle}</li>
              `;
            }

            return /* HTML */ `
              <li>
                <a
                  href="${item.path}"
                  class="link link--sidebar ${isActive
                    ? "button--primary link--primary"
                    : ""}"
                >
                  ${item.title}
                </a>
              </li>
            `;
          })
          .join("")}
      </ul>
    </aside>
  `;

  return content;
};
