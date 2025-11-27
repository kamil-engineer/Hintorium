export const Navigation = ({ docs = false }: { docs?: boolean } = {}) => {
  const path = window.location.pathname;

  const normalNavigation = [
    { href: "#overview", title: "Overview" },
    { href: "#examples", title: "Examples" },
    { href: "#reviews", title: "Reviews" },
  ];

  const docsNavigation = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/docs",
      title: "Documentation",
    },
  ];

  const content = /* HTML */ `
    <nav class="nav">
      <ul class="nav__list">
        ${(docs ? docsNavigation : normalNavigation)
          .map((nav) => {
            return /* HTML */ `
              <li>
                <a
                  class="link link--navigation ${path === nav.href
                    ? "link--active"
                    : ""}"
                  href="${nav.href}"
                >
                  ${nav.title}</a
                >
              </li>
            `;
          })
          .join("")}
      </ul>
    </nav>
  `;

  return content;
};
