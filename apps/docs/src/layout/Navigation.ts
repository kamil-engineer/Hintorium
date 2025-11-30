function isLinkActive(
  href: string,
  currentPath: string,
  currentHash: string,
  exact: boolean = true
): boolean {
  if (href.startsWith("#")) {
    return currentHash === href.slice(1);
  }

  if (href.includes("#")) {
    const [linkPath, linkHash] = href.split("#");
    return currentPath === linkPath && currentHash === linkHash;
  }

  if (exact) {
    return currentPath === href;
  } else {
    return currentPath.startsWith(href) && href !== "/";
  }
}

export const Navigation = ({ docs = false }: { docs?: boolean } = {}) => {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash.slice(1);

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
            const isActive = isLinkActive(
              nav.href,
              currentPath,
              currentHash,
              true
            );

            return /* HTML */ `
              <li class="nav__item">
                <a
                  class="link link--navigation ${isActive
                    ? "link--active"
                    : ""}"
                  href="${nav.href}"
                  ${isActive ? 'aria-current="page"' : ""}
                >
                  ${nav.title}
                </a>
              </li>
            `;
          })
          .join("")}
      </ul>
    </nav>
  `;

  return content;
};
