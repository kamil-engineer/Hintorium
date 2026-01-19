export type DocSection = {
  type: "section";
  title: string;
};

export type DocPage = {
  type: "page";
  path: string;
  title: string;
  label?: string;
};

export type DocItem = DocSection | DocPage;

export const DOCS_NAVIGATION: DocItem[] = [
  {
    type: "section",
    title: "Documentation",
  },
  {
    type: "page",
    path: "/docs/motivation",
    title: "Motivation",
  },
  {
    type: "page",
    path: "/docs/introduction",
    title: "Introduction",
  },
  {
    type: "page",
    path: "/docs/getting-started",
    title: "Getting Started",
  },
  {
    type: "section",
    title: "API",
  },
  {
    type: "page",
    path: "/docs/api",
    title: "API Reference",
  },
  {
    type: "page",
    path: "/docs/positioning",
    title: "Positioning",
  },
  {
    type: "page",
    path: "/docs/style",
    title: "Styling & Theming",
    label: "Styling",
  },
  {
    type: "page",
    path: "/docs/animations",
    title: "Animations",
  },
  {
    type: "page",
    path: "/docs/accessibility",
    title: "Accessibility",
  },
  {
    type: "section",
    title: "Advanced",
  },
  {
    type: "page",
    path: "/docs/dynamic",
    title: "Dynamic Content",
  },
  {
    type: "page",
    path: "/docs/inline-hint",
    title: "Inline Hints",
  },
  {
    type: "page",
    path: "/docs/internationalization",
    title: "Internationalization",
  },
  {
    type: "page",
    path: "/docs/analytics",
    title: "Analytics",
  },
  {
    type: "page",
    path: "/docs/tours",
    title: "Tours",
  },
];

export function getDocPages(): DocPage[] {
  return DOCS_NAVIGATION.filter(
    (item): item is DocPage => item.type === "page"
  );
}

export function findDocPage(path: string): DocPage | null {
  return getDocPages().find((page) => page.path === path) || null;
}

export function getDocLabel(path: string): string | null {
  const page = findDocPage(path);
  return page ? page.label || page.title : null;
}

export function isValidDocPage(path: string): boolean {
  return !!findDocPage(path);
}

export function getAllDocPaths(): string[] {
  return getDocPages().map((page) => page.path);
}
