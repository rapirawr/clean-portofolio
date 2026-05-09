import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, type Theme } from "~/context/ThemeContext";
import { useLanguage } from "~/context/LanguageContext";

const themeOptions: { value: Theme; icon: typeof Sun }[] = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Theme switcher">
      {themeOptions.map(({ value, icon: Icon }) => (
        <button
          key={value}
          className={`theme-switcher__btn ${theme === value ? "theme-switcher__btn--active" : ""}`}
          onClick={() => setTheme(value)}
          aria-label={t(`theme.${value}`)}
          title={t(`theme.${value}`)}
          role="radio"
          aria-checked={theme === value}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}
