import { useLanguage } from "~/context/LanguageContext";
import { ArrowRight } from "lucide-react";

export function Credentials() {
  const { t } = useLanguage();

  const certs = [
    "/images/certificates/Juara 1 Web Design - DovesDev.jpeg",
    "/images/certificates/Samsung Innovation Campus - Logic Test.jpg",
    "/images/certificates/UIUX Competition ISAC - DovesDev.jpg",
  ];

  return (
    <section id="credentials" className="section credentials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("credentials.label")}</h2>
        </div>
        <p className="credentials__desc">{t("credentials.desc")}</p>
        <div className="credentials__preview">
          {certs.map((src, i) => (
            <div key={i} className="cert-window" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="cert-window__header">
                <div className="cert-window__dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <span className="cert-window__title">certification.pdf</span>
              </div>
              <div className="cert-window__body">
                <img src={src} alt={`Certificate ${i + 1}`} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
        <a href="/certificates" className="btn btn--outline credentials__cta">
          {t("credentials.viewAll")}
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
