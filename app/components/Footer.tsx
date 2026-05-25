import { useLanguage } from "~/context/LanguageContext";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

// Lucide 1.0+ removed brand icons. Implementing custom SVG replacements.
const Github = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="footer">
      <div className="container footer__inner reveal">
        <div className="footer__main">
          <div className="footer__brand">
            <h2 className="footer__logo-dynamic">
              <span className="char">R</span>
              <span className="char">a</span>
              <span className="char">f</span>
              <span className="char">i</span>
              <span className="footer__logo-dot">.</span>
            </h2>
            <p className="footer__tagline">
              {t("hero.tagline") || "Fullstack developer based in Indonesia."}
            </p>
          </div>

          <div className="footer__socials-grid">
            <a href="https://github.com/rapirawr" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Github /> GitHub
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href="https://www.linkedin.com/in/rafi-abdillah-f-9517a1329/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Linkedin /> LinkedIn
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href="https://instagram.com/rapikerenbgt" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Instagram /> Instagram
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            © {new Date().getFullYear()} Rafi Abdillah F.
          </div>
          <div className="footer__meta">
            <span>{t("footer.rights")}</span>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{t("footer.built")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
