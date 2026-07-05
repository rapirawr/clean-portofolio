import { useLanguage } from "~/context/LanguageContext";
import Lanyard from "~/components/Lanyard";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-futuristic reveal">
      {/* Angled background line */}
      <svg className="about-f__bg-line" preserveAspectRatio="none" viewBox="0 0 1000 100">
        <path d="M0,80 L380,80 L480,20 L1000,20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <path className="about-f__neon-line" d="M0,80 L380,80 L480,20 L1000,20" fill="none" stroke="var(--accent)" strokeWidth="2" />
      </svg>
      
      <div className="container about-f__container">
        {/* Left Side */}
        <div className="about-f__content">
          <h2 className="about-f__title">
            {t("about.titleHeader").split(" ").map((word, i, arr) => (
              <span key={i}>{word}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>

          <div className="about-f__card">
            <h3 className="about-f__card-val"><br />{t("about.yearsCount")}</h3>
            <span className="about-f__card-label">{t("about.yearsLabel")}</span>
            <p className="about-f__card-desc">
              {t("about.description")}
            </p>
          </div>
        </div>
        
        {/* Right Side — Lanyard */}
        <div className="about-f__visual">
          <Lanyard
            position={[0, 0, 13]}
            gravity={[0, -40, 0]}
            fov={15}
            frontImage="/images/hero.webp"
            backImage="/images/logo2.png"
            imageFit="cover"
          />
        </div>
      </div>
    </section>
  );
}
