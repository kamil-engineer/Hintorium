import Docs, { DocsLayout } from "../pages/Docs";
import { Motivation } from "../pages/docs/Motivation";
import Home from "./../pages/Home";
import type { Route } from "./router.types";

export const paths = {
  HOME: "/",
  DOCS: "/docs",
  MOTIVATION: "/docs/motivation",
};

export const routes: Route[] = [
  {
    path: paths.HOME,
    view: Home,
    title: "Hintorium - Tooltips & Inline Hints Library",
  },
  { path: paths.DOCS, view: Docs, title: "Docs | Hintorium" },
  {
    path: paths.MOTIVATION,
    view: Motivation,
    title: (ctx) => {
      return ctx.hash;
    },
    layout: DocsLayout,
  },
];
