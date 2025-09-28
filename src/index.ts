import "./styles/style.css";
import { initTooltip } from "./tooltip";

export { initTooltip };

if (import.meta.env.DEV) {
  console.log("Hintorium dev mode");

  initTooltip();
}
