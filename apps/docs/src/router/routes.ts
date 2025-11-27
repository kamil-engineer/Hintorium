import Docs from "../pages/Docs";
import Home from "./../pages/Home";

export interface RouteWithParams {
  path: string;
  view: (params: Record<string, any>) => HTMLElement;
  title?: string;
}

export interface RouteWithoutParams {
  path: string;
  view: () => HTMLElement;
  title?: string;
}

export type Route = RouteWithParams | RouteWithoutParams;

export const paths = {
  HOME: "/",
  DOCS: "/docs",
};

export const routes: Route[] = [
  { path: paths.HOME, view: Home, title: "Home | Hintorium" },
  { path: paths.DOCS, view: Docs, title: "Docs | Hintorium" },
];
