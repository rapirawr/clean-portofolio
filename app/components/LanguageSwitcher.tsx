import { useLanguage } from "~/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="lang-switcher">
      <Globe size={14} className="lang-switcher__icon" />
      <button
        className={`lang-switcher__btn ${locale === "en" ? "lang-switcher__btn--active" : ""}`}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
      <span className="lang-switcher__sep">/</span>
      <button
        className={`lang-switcher__btn ${locale === "id" ? "lang-switcher__btn--active" : ""}`}
        onClick={() => setLocale("id")}
      >
        ID
      </button>
    </div>
  );
}
