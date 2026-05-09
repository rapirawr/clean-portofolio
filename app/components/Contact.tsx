import { useState, type FormEvent } from "react";
import { useLanguage } from "~/context/LanguageContext";
import { Send, Mail, MapPin, Clock } from "lucide-react";

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission (replace with actual emailjs or API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="section contact reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t("contact.label")}</span>
          <h2 className="section-title">{t("contact.title")}</h2>
          <p className="section-subtitle">{t("contact.subtitle")}</p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__info-item">
              <Mail size={18} />
              <a href="mailto:rabdillahf09@gmail.com">rabdillahf09@gmail.com</a>
            </div>
            <div className="contact__info-item">
              <MapPin size={18} />
              <span>Bondowoso, Indonesia</span>
            </div>
            <div className="contact__info-item">
              <Clock size={18} />
              <span>GMT+7 (WIB)</span>
            </div>

            <div className="contact__socials">
              <a href="https://github.com/rapirawr" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/rafi-abdillah-f-9517a1329/" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                LinkedIn
              </a>
              <a href="https://instagram.com/rapikerenbgt" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                Instagram
              </a>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t("contact.name")}</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t("contact.email")}</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t("contact.subject")}</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t("contact.message")}</label>
              <textarea id="message" name="message" rows={5} required />
            </div>
            <button
              type="submit"
              className="btn btn--primary contact__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? t("contact.sending") : t("contact.send")}
              <Send size={16} />
            </button>
            {status === "success" && <p className="contact__status contact__status--success">{t("contact.success")}</p>}
            {status === "error" && <p className="contact__status contact__status--error">{t("contact.error")}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
