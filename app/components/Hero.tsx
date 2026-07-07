import { useLanguage } from "~/context/LanguageContext";
import { ArrowDown } from "lucide-react";
import { SpiralDots } from "./SpiralDots";
import { Magnetic } from "~/components/Magnetic";
import TextPressure from "~/components/TextPressure";


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
          <div className="hero__name-pressure">
            <TextPressure
              text={t("hero.name")}
              flex
              alpha={false}
              stroke={false}
              weight
              width
              italic
              scale
              textColor="var(--text)"
              strokeColor="var(--accent)"
              minFontSize={36}
            />
          </div>
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
