import { TooltipManager } from "./manager";

export function initTooltip(): TooltipManager {
  console.info("🎨 Hintorium Tooltip Library Loaded!");

  const manager = new TooltipManager();

  return manager.init();
}
