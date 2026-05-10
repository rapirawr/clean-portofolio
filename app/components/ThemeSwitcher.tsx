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

  const handleThemeChange = (newTheme: Theme, e: React.MouseEvent) => {
    // If View Transition API is not supported or user prefers reduced motion
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add("view-transitioning");
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove("view-transitioning");
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Theme switcher">
      {themeOptions.map(({ value, icon: Icon }) => (
        <button
          key={value}
          className={`theme-switcher__btn ${theme === value ? "theme-switcher__btn--active" : ""}`}
          onClick={(e) => handleThemeChange(value, e)}
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
