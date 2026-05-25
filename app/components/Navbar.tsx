import { useState, useEffect } from "react";
import { useLanguage } from "~/context/LanguageContext";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";

const navItems = [
  { key: "nav.home", href: "#hero" },
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
];

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`} id="navbar">
        <div className="navbar__inner">
          <a href="#hero" className="navbar__logo" onClick={() => handleNavClick("#hero")}>
            <img src="/images/logo.png" alt="Rafi Abdillah" width={32} height={32} />
          </a>

          <ul className="navbar__links">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="navbar__link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <div className="navbar__desktop-controls">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__overlay" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu__panel">
          <ul className="mobile-menu__links">
            {navItems.map((item, i) => (
              <li key={item.key} style={{ animationDelay: `${i * 60}ms` }}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__footer">
            <div className="mobile-menu__controls">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
