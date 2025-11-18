import "./style.css";
import "hintorium-core/dist/hintorium-core.css";
import { initTooltip } from "hintorium-core";

import { initRouter } from "./router/router";

document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  initTooltip();
});
