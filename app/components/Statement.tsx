import { useState } from "react";
import { useLanguage } from "~/context/LanguageContext";

export function Statement() {
  const { locale } = useLanguage();
  const [isToggled, setIsToggled] = useState(false);

  return (
    <section className="section statement reveal">
      <div className="container">
        <h2 className="statement__heading">
          {locale === "en" ? (
            <>
              Building web apps with a<br />
              {isToggled ? "premium-enabled" : "standard-ready"}{" "}
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
              {" "}aesthetic
            </>
          ) : (
            <>
              Membangun aplikasi web dengan<br />
              pendekatan{" "}
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
              {" "}{isToggled ? "premium-enabled" : "standard-ready"}
            </>
          )}
        </h2>
        
        <p className="statement__subtitle" style={{ 
          opacity: isToggled ? 0 : 1, 
          transform: isToggled ? 'translateY(10px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          visibility: isToggled ? 'hidden' : 'visible'
        }}>
          {locale === "en" ? "Im ready when you're ready" : "Kami siap kapanpun Anda siap"}
        </p>
      </div>
    </section>
  );
}
