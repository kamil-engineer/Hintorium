import { metaTags } from "../config/meta-tags";
import { getDocLabel } from "../data/docs-navigation";
import { DocsLayout } from "../pages/Docs";
import NotFound from "../pages/NotFound";
import type { Route } from "../router/router.types";
import { DOC_COMPONENTS } from "../router/routes";

export function createDocRoute(path: string): Route {
  const component = DOC_COMPONENTS[path];
  const label = getDocLabel(path);
  const meta = metaTags[path];

  if (!component) {
    console.warn(`No component found for path: ${path}`);
    return {
      path,
      view: NotFound,
      title: "Page Not Found | Hintorium",
      layout: DocsLayout,
    };
  }

  return {
    path,
    view: component,
    title: label ? `${label} | Hintorium` : "Documentation | Hintorium",
    layout: DocsLayout,
    meta,
  };
}
