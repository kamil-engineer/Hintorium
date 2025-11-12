import "./style.css";
import { HintoriumTour } from "./tooltip/tour";
export { initTooltip } from "./tooltip";
export {
  type TooltipTheme,
  type TooltipAnimation,
  type TooltipOptions,
  type TooltipPosition,
} from "./tooltip/types";

export { Tooltip } from "./tooltip/tooltip";

new HintoriumTour({
  steps: [
    {
      target: "#menu",
      content: "This is the main menu of the application.",
      options: {
        theme: "gradient",
      },
    },
    {
      target: "#search",
      content: "This is the serach menu of the application.",
      options: {
        theme: "gradient",
      },
    },
    {
      target: "#save-btn",
      content: "Click this button to save your changes.",
      options: {
        theme: "gradient",
      },
    },
  ],
  localStorageKey: "hintorium_tour_examplee",
  auto: {
    enabled: true,
    delay: 3000,
  },
}).start();
