import Docs from "../pages/Docs";
import Home from "./../pages/Home";
import type { Route } from "./router.types";

export const paths = {
  HOME: "/",
  DOCS: "/docs",
};

export const routes: Route[] = [
  {
    path: paths.HOME,
    view: Home,
    title: "Hintorium - Tooltips & Inline Hints Library",
  },
  { path: paths.DOCS, view: Docs, title: "Docs | Hintorium" },
];
