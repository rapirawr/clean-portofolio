import { useLanguage } from "~/context/LanguageContext";
import { ArrowDown } from "lucide-react";
import { SpiralDots } from "~/components/SpiralDots";
import { Magnetic } from "~/components/Magnetic";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <div className="hero__gradient" />
        <div className="hero__grid" />
        <SpiralDots />
      </div>
      <div className="hero__content">
        <div className="hero__badge reveal-text">
          <span className="hero__badge-dot" />
          {t("hero.status")}
        </div>
        
        <div className="hero__typography">
          <div className="hero__greeting-wrap">
             <span className="hero__greeting-line"></span>
             <p className="hero__greeting">{t("hero.greeting")}</p>
          </div>
          
          <h1 className="hero__name">
            <span className="name-main">{t("hero.name")}</span>
            <span className="name-styled">Developer.</span>
          </h1>
          
          <div className="hero__description">
            <p className="hero__tagline">
              ENGINEERING <span className="serif-text">HIGH-FIDELITY</span> <br />
              DIGITAL EXPERIENCES <br />
              THROUGH <span className="accent-text">CODE</span> AND <span className="accent-text">DESIGN</span>.
            </p>
          </div>
        </div>

        <div className="hero__actions">
          <Magnetic strength={0.3}>
            <a href="#projects" className="btn btn--primary" onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
              {t("hero.cta.projects")}
              <ArrowDown size={16} />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href="/cv" target="_blank" className="btn btn--outline">
              View CV
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
