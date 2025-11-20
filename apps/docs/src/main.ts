import "./style.css";
import "hintorium-core/dist/hintorium-core.css";
import { initTooltip } from "hintorium-core";

import { initRouter } from "./router/router";
import { setupSwipper } from "./logic/swipper";

document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  initTooltip();
  setupSwipper();
});
