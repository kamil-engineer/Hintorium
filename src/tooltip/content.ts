export type TooltipContentSource =
  | string
  | HTMLElement
  | (() => string | HTMLElement)
  | (() => Promise<string | HTMLElement>);

export class TooltipContent {
  private readonly LOADING_HTML =
    '<span class="hintorium-loading">⏳ Loading...</span>';
  private readonly ERROR_HTML =
    '<span class="hintorium-error">⚠️ Failed to load content</span>';

  private content: TooltipContentSource;

  private static cache = new Map<string, string>();

  constructor(content: TooltipContentSource) {
    this.content = content;
  }

  /**
   * Render the tooltip content.
   * Supports string, HTMLElement, sync callback, or async callback.
   */
  async render(): Promise<string | HTMLElement> {
    try {
      if (this.content instanceof HTMLElement) {
        return this.content;
      }

      if (typeof this.content === "string") {
        return this.sanitizeHTML(this.content);
      }

      let result: string | HTMLElement = this.LOADING_HTML;

      const resolved = await this.resolveDynamicContent(this.content);

      if (resolved instanceof HTMLElement) {
        result = resolved;
      } else {
        result = this.sanitizeHTML(resolved ?? "");
      }

      return result;
    } catch {
      return this.ERROR_HTML;
    }
  }

  /**
   * Resolves dynamic tooltip content (callback, promise, or URL fetch).
   */
  private async resolveDynamicContent(
    content: TooltipContentSource
  ): Promise<string | HTMLElement> {
    let result: string | HTMLElement;

    if (typeof content === "function") {
      const output = content();
      result = output instanceof Promise ? await output : output;
    } else {
      result = content;
    }

    if (typeof result === "string" && this.isURL(result)) {
      if (TooltipContent.cache.has(result)) {
        return TooltipContent.cache.get(result)!;
      }
      try {
        const response = await fetch(result);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        const safe = this.sanitizeHTML(text);
        TooltipContent.cache.set(result, safe);
        return safe;
      } catch {
        return this.ERROR_HTML;
      }
    }

    return result;
  }

  /**
   * Simple URL validator.
   */
  private isURL(value: string): boolean {
    return /^https?:\/\//i.test(value);
  }

  /**
   * Sanitizes HTML string manually.
   * Removes <script>, <iframe>, <object>, <embed>, <link>, <meta>
   * and dangerous inline event handlers (onmouseover, onclick, etc.).
   *
   * @param html - Raw HTML to sanitize.
   * @returns Safe HTML string.
   */
  private sanitizeHTML(html: string): string {
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // Dangerous tags
    const dangerousTags = [
      "script",
      "iframe",
      "object",
      "embed",
      "link",
      "meta",
    ];
    dangerousTags.forEach((tag) =>
      temp.querySelectorAll(tag).forEach((el) => el.remove())
    );

    // Remove inline event handlers and risky attributes
    temp.querySelectorAll("*").forEach((el) => {
      [...el.attributes].forEach((attr) => {
        const name = attr.name.toLowerCase();
        if (name.startsWith("on")) el.removeAttribute(attr.name);
        if (["srcdoc", "srcset", "formaction"].includes(name)) {
          el.removeAttribute(attr.name);
        }
      });
    });

    // Prevent javascript: URLs
    temp.querySelectorAll("a, area, iframe").forEach((el) => {
      const href = el.getAttribute("href");
      if (href && href.trim().toLowerCase().startsWith("javascript:")) {
        el.removeAttribute("href");
      }
    });

    return temp.innerHTML;
  }
}
