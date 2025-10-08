export class TooltipValidator {
  static isValidTooltipElements(elements: NodeListOf<HTMLElement>): boolean {
    const valid = elements.length > 0;
    
    if (!valid) {
      console.warn(
        "⚠️ No valid tooltip elements found. Please ensure elements have the correct data attributes."
      );
    }
    return valid;
  }
}
