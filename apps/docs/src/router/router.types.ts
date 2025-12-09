export type RouteParams = {
  [key: string]: string;
};

export type QueryParams = {
  [key: string]: string;
};

export type RouteContext = {
  params: RouteParams;
  query: QueryParams;
  hash: string;
};

export type Route = {
  path: string;
  view: (context: RouteContext) => HTMLElement;
  title?: string | ((context: RouteContext) => string | Promise<string>);
  beforeEnter?: (context: RouteContext) => boolean | Promise<boolean>;
  afterEnter?: (context: RouteContext) => void | Promise<void>;
  beforeLeave?: () => boolean | Promise<boolean>;
  meta?: Record<string, any>;
  layout?: (content: HTMLElement, context: RouteContext) => HTMLElement;
};

export type RouterConfig = {
  routes: Route[];
  notFoundView?: (context: RouteContext) => HTMLElement;
  notFoundTitle?: string;
  onRouteChange?: (path: string, context: RouteContext) => void;
  transitionDuration?: number;
};
