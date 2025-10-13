import { TooltipManager } from "./manager";
import type { TooltipOptions } from "./types";

export function initTooltip(options?: TooltipOptions): TooltipManager {
  console.info("🎨 Hintorium Tooltip Library Loaded!");

  const manager = new TooltipManager(options);

  return manager.init();
}
