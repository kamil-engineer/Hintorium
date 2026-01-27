import { getAllDocPaths } from "../data/docs-navigation";
import { createDocRoute } from "../helpers/route";
import Docs from "../pages/Docs";
import { Accessibility } from "../pages/docs/Accessibility";
import { AnalyticsTracking } from "../pages/docs/AnalyticsTracking";
import { Animations } from "../pages/docs/Animations";
import { APIReference } from "../pages/docs/ApiReference";
import { DynamicContent } from "../pages/docs/DynamicContent";
import { GettingStarted } from "../pages/docs/GettingStarted";
import { InlineHint } from "../pages/docs/InlineHint";
import { Internationalization } from "../pages/docs/Internationalization";
import { Introduction } from "../pages/docs/Introduction";
import { Motivation } from "../pages/docs/Motivation";
import { Positioning } from "../pages/docs/Positioning";
import { Styling } from "../pages/docs/Styling";
import { Tours } from "../pages/docs/Tours";
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
  DOCS_ADVANCED: "/docs/dynamic",
  DOCS_INLINE_HINT: "/docs/inline-hint",
  DOCS_INTERNATIONALIZATION: "/docs/internationalization",
  DOCS_ANALYTICS_TRACKING: "/docs/analytics",
  DOCS_TOURS: "/docs/tours",
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
  [paths.DOCS_ADVANCED]: DynamicContent,
  [paths.DOCS_INLINE_HINT]: InlineHint,
  [paths.DOCS_INTERNATIONALIZATION]: Internationalization,
  [paths.DOCS_ANALYTICS_TRACKING]: AnalyticsTracking,
  [paths.DOCS_TOURS]: Tours,
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
    meta: {
      description:
        "Comprehensive documentation for Hintorium - the ultimate tooltips and inline hints library for building accessible and customizable UIs.",
      "og:title": "Documentation | Hintorium",
      "og:description":
        "Learn how to use Hintorium: installation, API, styling, and advanced examples for building accessible and reusable tooltips and inline hints.",
      "og:image": "/og-docs.png",
      "twitter:title": "Documentation | Hintorium",
      "twitter:description":
        "Learn how to use Hintorium: installation, API, styling, and advanced examples for building accessible and reusable tooltips and inline hints.",
      "twitter:image": "/og-docs.png",
    },
  },

  ...getAllDocPaths().map(createDocRoute),
];
