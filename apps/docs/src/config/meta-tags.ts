import type { MetaTags } from "../router/router.types";

export const metaTags: Record<string, MetaTags> = {
  "/docs/motivation": {
    description:
      "Discover why Hintorium was created, the problems it solves, and our journey to building a lightweight, accessible, and framework-agnostic tooltip library.",
    "og:title": "Motivation | Hintorium",
    "og:description":
      "Learn about the challenges we faced with tooltips and why we built Hintorium: smaller bundle sizes, simplicity, accessibility, and framework-agnostic design.",
    "og:image": "/og-docs.png",
    "twitter:title": "Motivation | Hintorium",
    "twitter:description":
      "Learn about the challenges we faced with tooltips and why we built Hintorium: smaller bundle sizes, simplicity, accessibility, and framework-agnostic design.",
    "twitter:image": "/og-docs.png",
  },
};
