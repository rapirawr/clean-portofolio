import { useLanguage } from "~/context/LanguageContext";
import { Code2, MonitorPlay, Layers, Paintbrush } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-futuristic reveal">
      {/* Angled background line */}
      <svg className="about-f__bg-line" preserveAspectRatio="none" viewBox="0 0 1000 100">
        <path d="M0,80 L380,80 L480,20 L1000,20" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      
      <div className="container about-f__container">
        {/* Left Side */}
        <div className="about-f__content">
          {/* <div className="about-f__header">
            <span className="about-f__number">05</span>
            <span className="about-f__label"> ABOUT ME</span>
          </div> */}
          
          <h2 className="about-f__title">
            ABOUT <br/> ME
          </h2>

          <div className="about-f__card">
            <h3 className="about-f__card-val">3+ Years</h3>
            <span className="about-f__card-label">Experience</span>
            <p className="about-f__card-desc">
              {t("about.description")}
            </p>
          </div>
        </div>
        
        {/* Right Side */}
        <div className="about-f__visual">
          {/* Main portrait image (you can use hero.webp or a similar one) */}
          <img src="/images/hero.webp" alt="Rafi Abdillah" className="about-f__img" />
        </div>
      </div>

      {/* Bottom Orange Angled Bar */}
      {/* <div className="about-f__bottom-bar"> */}
        {/* <div className="about-f__bottom-inner">
          <div className="about-f__logo"><Code2 size={24} /> React.js</div>
          <div className="about-f__logo"><MonitorPlay size={24} /> Remix</div>
          <div className="about-f__logo"><Layers size={24} /> Laravel</div>
          <div className="about-f__logo"><Paintbrush size={24} /> Tailwind</div>
        </div> */}
      {/* </div> */}
    </section>
  );
}
