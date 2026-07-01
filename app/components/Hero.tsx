import { useLanguage } from "~/context/LanguageContext";
import { ArrowDown } from "lucide-react";
import { SpiralDots } from "./SpiralDots";
import { Magnetic } from "~/components/Magnetic";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <div className="hero__gradient" />
        <SpiralDots />
      </div>
      <div className="hero__content">
        <div className="hero__header reveal-text">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            {t("hero.status")}
          </div>
          <span className="hero__sep" style={{ color: "var(--accent)" }}>/</span>
          <p className="hero__greeting">{t("hero.greeting")}</p>
        </div>
        
        <div className="hero__typography">
          <h1 className="hero__name">
            <span className="name-main">{t("hero.name")}</span>
            {/* <span className="name-styled">Developer.</span> */}
          </h1>
          
          {/* <div className="hero__description">
            <p className="hero__tagline">
              ENGINEERING <span className="serif-text">HIGH-FIDELITY</span> <br />
              DIGITAL EXPERIENCES
            </p>
          </div> */}
        </div>

        <div className="hero__actions">
          <Magnetic strength={0.2}>
            <a href="#projects" className="btn btn--primary" onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
              {t("hero.cta.projects")}
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href="/cv" target="_blank" className="btn btn--outline">
              {t("hero.cta.resume")}
            </a>
          </Magnetic>
        </div>
      </div>
      <div className="hero__scroll">
        <ArrowDown size={18} className="hero__scroll-icon" />
      </div>
    </section>
  );
}
