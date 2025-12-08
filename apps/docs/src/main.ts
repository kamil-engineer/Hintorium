import "./style.css";
import "hintorium-core/dist/hintorium-core.css";
import { initTooltip } from "hintorium-core";

import { setupSwipper } from "./logic/swipper";
import { Router } from "./router/router";
import { routes } from "./router/routes";
import { handleMobileNavigation } from "./logic/mobile-navigation";
import { copyPage } from "./logic/copy-page";
import { dynamicProgressBar } from "./logic/progress";

const router = new Router({
  routes,
});

router.afterRender(() => {
  handleMobileNavigation();
  copyPage();
  dynamicProgressBar();
});

document.addEventListener("DOMContentLoaded", () => {
  router.mount();
  initTooltip();
  setupSwipper();
});
