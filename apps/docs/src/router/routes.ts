import { getAllDocPaths } from "../config/docs-navigation";
import { createDocRoute } from "../helpers/route";
import Docs from "../pages/Docs";
import { Motivation } from "../pages/docs/Motivation";
import Home from "./../pages/Home";
import type { Route, RouteContext } from "./router.types";

export const paths = {
  HOME: "/",
  DOCS: "/docs",

  DOCS_MOTIVATION: "/docs/motivation",
  DOCS_INTRODUCTION: "/docs/introduction",
  DOCS_GETTING_STARTED: "/docs/getting-started",
  DOCS_BASIC: "/docs/basic",
  DOCS_API: "/docs/api",
  DOCS_POSITIONING: "/docs/positioning",
  DOCS_STYLE: "/docs/style",
  DOCS_ANIMATIONS: "/docs/animations",
  DOCS_ACCESSIBILITY: "/docs/accessibility",
  DOCS_ADVANCED: "/docs/advanced",
} as const;

export const DOC_COMPONENTS: Record<
  string,
  (ctx: RouteContext) => HTMLElement
> = {
  [paths.DOCS_MOTIVATION]: Motivation,
  [paths.DOCS_INTRODUCTION]: Motivation,
  [paths.DOCS_GETTING_STARTED]: Motivation,
  [paths.DOCS_BASIC]: Motivation,
  [paths.DOCS_API]: Motivation,
  [paths.DOCS_POSITIONING]: Motivation,
  [paths.DOCS_STYLE]: Motivation,
  [paths.DOCS_ANIMATIONS]: Motivation,
  [paths.DOCS_ACCESSIBILITY]: Motivation,
  [paths.DOCS_ADVANCED]: Motivation,
};

export const routes: Route[] = [
  {
    path: paths.HOME,
    view: Home,
    title: "Hintorium - Tooltips & Inline Hints Library",
  },

  {
    path: paths.DOCS,
    view: Docs,
    title: "Documentation | Hintorium",
  },

  ...getAllDocPaths().map(createDocRoute),
];
