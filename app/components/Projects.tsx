import { useState, useEffect } from "react";
import { useLanguage } from "~/context/LanguageContext";
import { ArrowUpRight, ExternalLink, X, LayoutTemplate, Server, ShoppingCart, Briefcase, Cpu, ImageIcon } from "lucide-react";
import CardSwap, { Card } from "~/components/CardSwap";

interface Project {
  titleKey: string;
  categoryKey: string;
  descKey: string;
  tech: string;
  image: string;
  gallery: string[];
  link: string;
  icon: any;
  iconColor: string;
}

const projects: Project[] = [
  {
    titleKey: "project1.title",
    categoryKey: "project1.category",
    descKey: "project1.desc",
    tech: "React / Node.js / PostgreSQL",
    image: "/images/projects/kaze/kaze.png",
    gallery: ["/images/projects/kaze/kaze.png", "/images/projects/kaze/kaze1.png", "/images/projects/kaze/kaze2.png"],
    link: "https://web-kaze.vercel.app",
    icon: LayoutTemplate,
    iconColor: "#3b82f6",
  },
  {
    titleKey: "project2.title",
    categoryKey: "project2.category",
    descKey: "project2.desc",
    tech: "Laravel / Bootstrap / MySQL",
    image: "/images/projects/sips/sips.png",
    gallery: ["/images/projects/sips/sips.png", "/images/projects/sips/sips1.png", "/images/projects/sips/sips2.png"],
    link: "",
    icon: Server,
    iconColor: "#ef4444",
  },
  {
    titleKey: "project3.title",
    categoryKey: "project3.category",
    descKey: "project3.desc",
    tech: "HTML / CSS / Javascript",
    image: "/images/projects/hajiku/hajiku.png",
    gallery: ["/images/projects/hajiku/hajiku.png"],
    link: "https://hajiku.vercel.app/",
    icon: ShoppingCart,
    iconColor: "#f97316",
  },
  {
    titleKey: "project4.title",
    categoryKey: "project4.category",
    descKey: "project4.desc",
    tech: "HTML / CSS / JavaScript",
    image: "/images/projects/amsle/amsle.png",
    gallery: ["/images/projects/amsle/amsle.png", "/images/projects/amsle/amsle1.png", "/images/projects/amsle/amsle2.png"],
    link: "https://amsle-budi.vercel.app/",
    icon: Briefcase,
    iconColor: "#eab308",
  },
  {
    titleKey: "project5.title",
    categoryKey: "project5.category",
    descKey: "project5.desc",
    tech: "React / ESP32 / MQTT",
    image: "/images/projects/casivo/casivo.png",
    gallery: ["/images/projects/casivo/casivo.png"],
    link: "",
    icon: Cpu,
    iconColor: "#0ea5e9",
  },
  {
    titleKey: "project6.title",
    categoryKey: "project6.category",
    descKey: "project6.desc",
    tech: "HTML / CSS / JavaScript",
    image: "/images/projects/convertifly/convertifly.png",
    gallery: ["/images/projects/convertifly/convertifly.png", "/images/projects/convertifly/convertifly1.png", "/images/projects/convertifly/convertifly2.png"],
    link: "https://convertifly-xyz.vercel.app/",
    icon: ImageIcon,
    iconColor: "#8b5cf6",
  },
];

export function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="projects" className="section projects-archive reveal">
      <div className="container">
        <div className="projects-layout">
          {/* Left Side: Text and CTA */}
          <div className="projects-content">
            <h2 className="projects-title">{t("projects.label")}</h2>
            <p className="projects-desc">{t("projects.desc")}</p>
          </div>

          {/* Right Side: CardSwap stack */}
          <div className="projects-card-wrapper">
            <CardSwap
              width={isMobile ? 260 : 320}
              height={isMobile ? 160 : 200}
              cardDistance={isMobile ? 20 : 50}
              verticalDistance={isMobile ? 20 : 70}
              delay={4000}
              pauseOnHover
              skewAmount={isMobile ? 2 : 4}
              easing="elastic"
              onCardClick={(idx) => setSelectedProject(projects[idx])}
            >
              {projects.map((project, i) => {
                const Icon = project.icon;
                return (
                  <Card
                    key={i}
                    className="card-swap-card"
                    style={{ cursor: "pointer" }}
                  >
                    {/* Card header bar */}
                    <div className="card-swap-card__header">
                      <div className="card-swap-card__dots">
                        <span style={{ background: "#ef4444" }} />
                        <span style={{ background: "#f59e0b" }} />
                        <span style={{ background: "#22c55e" }} />
                      </div>
                      <div className="card-swap-card__title-row">
                        <Icon size={14} style={{ color: project.iconColor, flexShrink: 0 }} />
                        <span className="card-swap-card__name">{t(project.titleKey)}</span>
                      </div>
                    </div>

                    {/* Card image */}
                    <div className="card-swap-card__image">
                      <img src={project.image} alt={t(project.titleKey)} loading="lazy" />
                    </div>

                    {/* Card footer */}
                    <div className="card-swap-card__footer">
                      <span className="card-swap-card__tech">{project.tech}</span>
                      <span className="card-swap-card__category">{t(project.categoryKey)}</span>
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="project-modal__container" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal__close" onClick={() => setSelectedProject(null)} aria-label="Close">
              <X size={20} />
            </button>

            <div className="project-modal__layout">
              <div className="project-modal__visual">
                <div className="project-modal__gallery">
                  <img src={selectedProject.gallery[0]} alt={t(selectedProject.titleKey)} loading="lazy" />
                </div>
              </div>

              <div className="project-modal__body">
                <div className="project-modal__header">
                  <span className="project-modal__category">{t(selectedProject.categoryKey)}</span>
                  <h2 className="project-modal__title">{t(selectedProject.titleKey)}</h2>
                </div>

                <div className="project-modal__details">
                  <p className="project-modal__desc">{t(selectedProject.descKey)}</p>
                  <div className="project-modal__tags">
                    {selectedProject.tech.split(" / ").map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="project-modal__actions">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary project-modal__btn"
                    >
                      {t("projects.visitProject")}
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button className="btn btn--outline project-modal__btn" onClick={() => setSelectedProject(null)}>
                    {t("projects.close")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
