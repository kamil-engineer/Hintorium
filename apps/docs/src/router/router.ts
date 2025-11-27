import { handleMobileNavigation } from "../logic/mobile-navigation";

import NotFound from "./../pages/NotFound";
import { type Route, routes } from "./routes";

const app = document.getElementById("app");

function pathToRegex(path: string) {
  return new RegExp("^" + path.replace(/:\w+/g, "([^/]+)") + "$");
}

function getParams(route: Route, path: string) {
  const values = path.match(pathToRegex(route.path));
  const keys = Array.from(route.path.matchAll(/:(\w+)/g)).map(
    (match) => match[1]
  );
  const params: Record<string, string> = {};
  if (values) {
    keys.forEach((key, i) => {
      params[key] = values[i + 1];
    });
  }
  return params;
}

function getQueryParams(search: string): Record<string, string> {
  const query: Record<string, string> = {};
  const params = new URLSearchParams(search);
  params.forEach((value, key) => (query[key] = value));
  return query;
}

function animateRender(newNode: HTMLElement) {
  if (!app) return;

  const oldNode = app.firstChild as HTMLElement | null;
  if (oldNode) {
    oldNode.style.transition = "opacity 0.15s";
    oldNode.style.opacity = "0";
    setTimeout(() => {
      app.innerHTML = "";
      newNode.style.opacity = "0";
      app.appendChild(newNode);
      requestAnimationFrame(() => {
        newNode.style.transition = "opacity 0.15s";
        newNode.style.opacity = "1";
      });
    }, 300);
  } else {
    newNode.style.opacity = "0";
    app.appendChild(newNode);
    requestAnimationFrame(() => {
      newNode.style.transition = "opacity 0.15s";
      newNode.style.opacity = "1";
    });
  }
}

export function render(pathWithQuery: string) {
  if (!app) return;

  const [pathAndSearch, hash] = pathWithQuery.split("#");
  const [path, search] = pathAndSearch.split("?");
  const route = routes.find((r) => pathToRegex(r.path).test(path));

  const query = getQueryParams(search || "");

  if (route) {
    const params = getParams(route, path);
    const element = route.view({ ...params, query });
    animateRender(element);
    document.title = route.title || "Home";
  } else {
    animateRender(NotFound());
    document.title = "404 Not Found";
  }

  window.scrollTo(0, 0);

  if (hash) {
    requestAnimationFrame(() => {
      const target = document.getElementById(hash); 
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }

  requestAnimationFrame(() => {
    handleMobileNavigation();
  });
}

function handleLinkClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target) return;

  const anchor = target.closest("a") as HTMLAnchorElement | null;
  if (!anchor || !anchor.href.startsWith(window.location.origin)) return;

  const href = anchor.getAttribute("href")!;

  const [path, hash] = href.split("#");

  if (path === window.location.pathname || !path) {
    e.preventDefault();
    if (hash) {
      const targetEl = document.getElementById(hash);
      console.log(targetEl);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
    return;
  }

  if (!hash) {
    e.preventDefault();
    window.history.pushState(null, "", href);
    render(href);
  }
}

export function initRouter() {
  document.body.addEventListener("click", handleLinkClick);
  window.addEventListener("popstate", () => {
    render(
      window.location.pathname + window.location.search + window.location.hash
    );
  });

  render(window.location.pathname);
}
