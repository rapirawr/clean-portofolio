import { useState } from "react";
import { useLanguage } from "~/context/LanguageContext";

export function Statement() {
  const { t } = useLanguage();
  const [isToggled, setIsToggled] = useState(false);

  return (
    <section className="section statement reveal">
      <div className="container">
        <h2 className="statement__heading">
          {isToggled ? t("statement.premiumEnabled") : t("statement.standardReady")}{" "}
          <button
            className={`inline-toggle ${isToggled ? "inline-toggle--active" : ""}`}
            onClick={() => setIsToggled(!isToggled)}
            aria-label="Toggle aesthetic"
          >
            <span className="inline-toggle__glow"></span>
            <span className="inline-toggle__track">
              <span className="inline-toggle__thumb"></span>
            </span>
          </button>
          {" "}{t("statement.aesthetic")}
        </h2>
        
        <p className="statement__subtitle" style={{ 
          opacity: isToggled ? 0 : 1, 
          transform: isToggled ? 'translateY(10px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          visibility: isToggled ? 'hidden' : 'visible'
        }}>
          {t("statement.ready")}
        </p>
      </div>
    </section>
  );
}
