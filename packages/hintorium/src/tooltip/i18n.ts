/**
 * Supported base languages.
 */

export type BaseLanguage = "en" | "pl";

/**
 * A flat record of translation key → text for one language.
 */

export type LanguagePack = Record<string, string>;

/**
 * A map of all language packs for all supported languages.
 */

export type Translations = Record<string, LanguagePack>;

/**
 * A lightweight internationalization (i18n) manager for Hintorium.
 * - Handles translations per language.
 * - Supports fallback language.
 * - Emits events on language change.
 * - Can auto-detect language from <html lang="..."> or browser settings.
 */

export class HintoriumI18n {
  private static instance: HintoriumI18n | null = null;

  private currentLang = "en";
  private fallbackLang = "en";
  private translations: Translations = {};
  private supportedLangs: Set<string> = new Set(["en", "pl"]);
  private loadingPromises: Map<string, Promise<void>> = new Map();

  /** Returns the global singleton instance */
  static getInstance(): HintoriumI18n {
    if (!this.instance) {
      this.instance = new HintoriumI18n();
    }
    return this.instance;
  }

  /**
   * Sets the current active language.
   * Emits a change event if language was updated.
   */

  setLanguage(lang: string): void {
    if (!this.supportedLangs.has(lang)) {
      console.warn(`[HintoriumI18n] Unsupported language: ${lang}`);
      return;
    }

    if (this.currentLang !== lang) {
      this.currentLang = lang;
    }
  }

  /**
   * Sets the fallback language used when a translation key is missing.
   */
  setFallbackLanguage(lang: string): void {
    if (!this.supportedLangs.has(lang)) {
      console.warn(`[HintoriumI18n] Unsupported fallback language: ${lang}`);
      return;
    }
    this.fallbackLang = lang;
  }

  /**
   * Loads multiple language files at once.
   * @param langs - Array of language configurations
   * @returns Promise that resolves when all translations are loaded
   */
  async loadMultipleTranslations(
    langs: Array<{ lang: string; url: string }>
  ): Promise<void> {
    await Promise.all(
      langs.map(({ lang, url }) => this.loadTranslations(lang, url))
    );
  }

  /**
   * Loads translations from an external file (JSON).
   * @param lang - Language code
   * @param url - URL to the JSON file
   * @returns Promise that resolves when translations are loaded
   */
  async loadTranslations(lang: string, url: string): Promise<void> {
    // Prevent duplicate loading
    if (this.loadingPromises.has(lang)) {
      return this.loadingPromises.get(lang);
    }

    const loadPromise = (async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to load translations: ${response.statusText}`
          );
        }
        const pack: LanguagePack = await response.json();

        this.setTranslations(lang, pack);
      } catch (error) {
        console.error(
          `[HintoriumI18n] Error loading translations for ${lang}:`,
          error
        );
        throw error;
      } finally {
        this.loadingPromises.delete(lang);
      }
    })();

    this.loadingPromises.set(lang, loadPromise);
    return loadPromise;
  }

  /**
   * Returns the fallback language.
   */
  getFallbackLanguage(): string {
    return this.fallbackLang;
  }

  /**
   * Returns the currently active language.
   */

  getLanguage(): string {
    return this.currentLang;
  }

  /** Dynamically adds a supported language (e.g. "fr", "de", "ar"). */
  addLanguage(lang: string): void {
    if (!this.supportedLangs.has(lang)) {
      this.supportedLangs.add(lang);
    }
  }

  /**
   * Returns the list of supported languages.
   */
  getSupportedLanguages(): string[] {
    return Array.from(this.supportedLangs);
  }

  /** Adds or merges translations for a given language. */
  setTranslations(lang: string, pack: LanguagePack): void {
    this.addLanguage(lang);
    this.translations[lang] = {
      ...(this.translations[lang] || {}),
      ...pack,
    };
  }

  /**
   * Translates a key.
   * - Looks up the current language first.
   * - Falls back to the fallback language.
   * - Falls back to `fallback` param or the key itself if not found.
   */
  t(key: string, fallback?: string): string {
    const lang = this.currentLang;
    const pack = this.translations[lang];
    const fallbackPack = this.translations[this.fallbackLang];

    const resolveNested = (obj: any, path: string) => {
      return path.split(".").reduce((acc, part) => acc?.[part], obj);
    };

    if (!pack) {
      return fallbackPack?.[key] || fallback || key;
    }

    const text =
      resolveNested(pack, key) ||
      resolveNested(fallbackPack, key) ||
      pack[key] ||
      fallback ||
      key;

    return text;
  }

  /** Detects browser or document language. */
  detectLanguage(): string {
    const htmlLang =
      document.documentElement.lang ||
      document.body.lang ||
      navigator.language ||
      "en";
    const normalized = htmlLang.split("-")[0].toLowerCase();
    if (this.supportedLangs.has(normalized)) {
      this.currentLang = normalized;
    }
    return this.currentLang;
  }
}

export const I18n = HintoriumI18n.getInstance();
