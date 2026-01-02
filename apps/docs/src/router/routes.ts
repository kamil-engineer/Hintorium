import { getAllDocPaths } from "../config/docs-navigation";
import { createDocRoute } from "../helpers/route";
import Docs from "../pages/Docs";
import { Accessibility } from "../pages/docs/Accessibility";
import { Animations } from "../pages/docs/Animations";
import { APIReference } from "../pages/docs/ApiReference";
import { GettingStarted } from "../pages/docs/GettingStarted";
import { Introduction } from "../pages/docs/Introduction";
import { Motivation } from "../pages/docs/Motivation";
import { Positioning } from "../pages/docs/Positioning";
import { Styling } from "../pages/docs/Styling";
import Home from "./../pages/Home";
import type { Route, RouteContext } from "./router.types";

export const paths = {
  HOME: "/",
  DOCS: "/docs",

  DOCS_MOTIVATION: "/docs/motivation",
  DOCS_INTRODUCTION: "/docs/introduction",
  DOCS_GETTING_STARTED: "/docs/getting-started",
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
  [paths.DOCS_INTRODUCTION]: Introduction,
  [paths.DOCS_GETTING_STARTED]: GettingStarted,
  [paths.DOCS_API]: APIReference,
  [paths.DOCS_POSITIONING]: Positioning,
  [paths.DOCS_STYLE]: Styling,
  [paths.DOCS_ANIMATIONS]: Animations,
  [paths.DOCS_ACCESSIBILITY]: Accessibility,
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
