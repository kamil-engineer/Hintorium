import { useState, useEffect } from "react";
import { I18n } from "hintorium-core";

/**
 * Hook for internationalization (i18n)
 * Provides translation functions and language management
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t, language, setLanguage } = useI18n();
 *
 *   return (
 *     <div>
 *       <h1>{t('hintorium.tour.next')}</h1>
 *       <button onClick={() => setLanguage('pl')}>Polski</button>
 *       <button onClick={() => setLanguage('en')}>English</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useHintoriumI18n() {
  const [language, setLanguageState] = useState(I18n.getLanguage());

  useEffect(() => {
    I18n.detectLanguage();
    setLanguageState(I18n.getLanguage());
  }, []);

  const setLanguage = (lang: string) => {
    I18n.setLanguage(lang);
    setLanguageState(lang);
  };

  const t = (key: string, fallback?: string) => {
    return I18n.t(key, fallback);
  };

  return {
    language,
    setLanguage,
    t,
    supportedLanguages: I18n.getSupportedLanguages(),
  };
}
