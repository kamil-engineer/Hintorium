import "./style.css";
import "hintorium-core/dist/hintorium-core.css";
import { initTooltip } from "hintorium-core";

import { setupSwipper } from "./logic/swipper";
import { Router } from "./router/router";
import { routes } from "./router/routes";
import { handleMobileNavigation } from "./logic/mobile-navigation";

const router = new Router({
  routes,
  transitionDuration: 300,
  onRouteChange: (path, context) => {
    console.log("Route changed:", path, context);
  },
});

router.afterRender(() => {
  handleMobileNavigation();
});

document.addEventListener("DOMContentLoaded", () => {
  router.mount();
  initTooltip();
  setupSwipper();
});
