import type {
  RouterConfig,
  Route,
  QueryParams,
  RouteContext,
  RouteParams,
} from "./router.types";

export class Router {
  private routerMountSelector = "#app";

  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private appElement: HTMLElement | null = null;
  private notFoundView: (context: RouteContext) => HTMLElement;
  private notFoundTitle: string;
  private transitionDuration: number;
  private isNavigating = false;
  private afterRenderCallbacks: Array<() => void> = [];

  constructor(config: RouterConfig) {
    this.routes = config.routes;
    this.notFoundView = config.notFoundView || this.defaultNotFoundView;
    this.notFoundTitle = config.notFoundTitle || "404 Not Found";
    this.transitionDuration = config.transitionDuration || 300;
  }

  private async executeAfterRenderCallbacks(): Promise<void> {
    for (const callback of this.afterRenderCallbacks) {
      try {
        callback();
      } catch (error) {
        console.error("Error in afterRender callback:", error);
      }
    }
  }

  private async animateTransition(newNode: HTMLElement): Promise<void> {
    if (!this.appElement) return;

    const oldNode = this.appElement.firstChild as HTMLElement | null;

    return new Promise((resolve) => {
      if (oldNode) {
        oldNode.style.transition = `opacity ${this.transitionDuration}ms`;
        oldNode.style.opacity = "0";

        setTimeout(() => {
          this.appElement!.innerHTML = "";
          newNode.style.opacity = "0";
          this.appElement!.appendChild(newNode);

          requestAnimationFrame(() => {
            newNode.style.transition = `opacity ${this.transitionDuration}ms`;
            newNode.style.opacity = "1";

            setTimeout(() => {
              resolve();
            }, this.transitionDuration);
          });
        }, this.transitionDuration);
      } else {
        newNode.style.opacity = "0";
        this.appElement!.appendChild(newNode);

        requestAnimationFrame(() => {
          newNode.style.transition = `opacity ${this.transitionDuration}ms`;
          newNode.style.opacity = "1";

          setTimeout(() => {
            resolve();
          }, this.transitionDuration);
        });
      }
    });
  }

  private pathToRegex(path: string): RegExp {
    return new RegExp("^" + path.replace(/:\w+/g, "([^/]+)") + "$");
  }

  private getQueryParams(search: string): QueryParams {
    const query: QueryParams = {};
    const params = new URLSearchParams(search);
    params.forEach((value, key) => (query[key] = value));
    return query;
  }

  private getParams(route: Route, path: string): RouteParams {
    const values = path.match(this.pathToRegex(route.path));
    const keys = Array.from(route.path.matchAll(/:(\w+)/g)).map(
      (match) => match[1]
    );
    const params: RouteParams = {};

    if (values) {
      keys.forEach((key, i) => {
        params[key] = values[i + 1];
      });
    }

    return params;
  }

  private defaultNotFoundView(): HTMLElement {
    const div = document.createElement("div");
    div.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h1>404</h1>
        <p>Strona nie została znaleziona</p>
        <a href="/">Powrót do strony głównej</a>
      </div>
    `;
    return div;
  }

  private handleLinkClick = (e: MouseEvent): void => {
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
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
      return;
    }

    e.preventDefault();
    this.navigate(href);
  };

  private handlePopState = (): void => {
    this.navigate(
      window.location.pathname + window.location.search + window.location.hash
    );
  };

  public async navigate(pathWithQuery: string, replace = false): Promise<void> {
    if (this.isNavigating) return;
    this.isNavigating = true;

    try {
      if (this.currentRoute?.beforeLeave) {
        const canLeave = await this.currentRoute.beforeLeave();
        if (!canLeave) {
          this.isNavigating = false;
          return;
        }
      }

      const [pathAndSearch, hash = ""] = pathWithQuery.split("#");
      const [path, search = ""] = pathAndSearch.split("?");

      const route = this.routes.find((r) =>
        this.pathToRegex(r.path).test(path)
      );
      const query = this.getQueryParams(search);

      const context: RouteContext = {
        params: route ? this.getParams(route, path) : {},
        query,
        hash,
      };

      if (route?.beforeEnter) {
        const canEnter = await route.beforeEnter(context);
        if (!canEnter) {
          this.isNavigating = false;
          return;
        }
      }

      let element: HTMLElement;
      let title: string;

      if (route) {
        element = route.view(context);

        if (typeof route.title === "function") {
          title = await route.title(context);
        } else {
          title = route.title || "Home";
        }

        this.currentRoute = route;
      } else {
        element = this.notFoundView(context);
        title = this.notFoundTitle;
        this.currentRoute = null;
      }

      await this.animateTransition(element);
      document.title = title;

      const fullPath = hash ? `${pathWithQuery}` : pathWithQuery;
      if (replace) {
        window.history.replaceState(null, "", fullPath);
      } else {
        window.history.pushState(null, "", fullPath);
      }

      window.scrollTo(0, 0);
      if (hash) {
        requestAnimationFrame(() => {
          const target = document.getElementById(hash);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        });
      }

      if (route?.afterEnter) {
        await route.afterEnter(context);
      }

      await this.executeAfterRenderCallbacks();
    } finally {
      this.isNavigating = false;
    }
  }

  public mount(): void {
    this.appElement = document.querySelector(this.routerMountSelector);

    if (!this.appElement) {
      throw new Error(
        `Element with selector "${this.routerMountSelector}" not found`
      );
    }

    document.body.addEventListener("click", this.handleLinkClick);
    window.addEventListener("popstate", this.handlePopState);

    this.navigate(
      window.location.pathname + window.location.search + window.location.hash,
      true
    );
  }

  public afterRender(callback: () => void): void {
    this.afterRenderCallbacks.push(callback);
  }
}
