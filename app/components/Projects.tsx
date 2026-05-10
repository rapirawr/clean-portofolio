import { useState } from "react";
import { useLanguage } from "~/context/LanguageContext";
import { ArrowUpRight, ExternalLink, X, LayoutTemplate, Server, ShoppingCart, Briefcase, Cpu, ImageIcon } from "lucide-react";

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
    iconColor: "#3b82f6", // Blue (React)
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
    iconColor: "#ef4444", // Red (Laravel)
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
    iconColor: "#f97316", // Orange (HTML)
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
    iconColor: "#eab308", // Yellow (JS)
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
    iconColor: "#0ea5e9", // Light Blue (IoT)
  },
  {
    titleKey: "project6.title",
    categoryKey: "project6.category",
    descKey: "project6.desc",
    tech: "Next.js / WebAssembly / AI",
    image: "/images/projects/convertifly/convertifly.png",
    gallery: ["/images/projects/convertifly/convertifly.png", "/images/projects/convertifly/convertifly1.png", "/images/projects/convertifly/convertifly2.png"],
    link: "https://convertifly-xyz.vercel.app/",
    icon: ImageIcon,
    iconColor: "#8b5cf6", // Purple (AI)
  },
];

export function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section projects-archive reveal">
      <div className="container">
        <div className="projects-layout">
          {/* Left Side: Text and CTA */}
          <div className="projects-content">
            <h2 className="projects-title">{t("projects.label")}</h2>
            <p className="projects-desc">
              Explore my portfolio of web applications, mobile apps, and digital infrastructure projects built with modern technologies.
            </p>
            <a href="#credentials" className="btn btn--outline projects-btn">
              Explore credentials <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Right Side: Stacked Rows (Laravel style) */}
          <div className="projects-stack-container">
            <div className="projects-stack">
              {projects.map((project, i) => {
                const Icon = project.icon;
                const offset = (projects.length - 1 - i) * 24; 

                if (i === projects.length - 1) {
                  return (
                    <div
                      key={i}
                      className="project-ide-window"
                      style={{ marginLeft: `${offset}px`, zIndex: projects.length - i }}
                      onClick={() => setSelectedProject(project)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
                    >
                      <div className="project-ide-header">
                        <div className="project-row__tab" style={{ background: 'var(--bg)', borderTopLeftRadius: '12px' }}>
                          <Icon size={18} style={{ color: project.iconColor }} />
                          <span className="project-row__name">{t(project.titleKey)}</span>
                        </div>
                        <div className="project-row__info">
                          <span className="project-row__tech">{project.tech}</span>
                        </div>
                      </div>
                      <div className="project-ide-content">
                        <div className="project-ide-pills">
                          <div className="project-ide-pill" style={{ width: '60px' }}></div>
                          <div className="project-ide-pill" style={{ width: '90px' }}></div>
                          <div className="project-ide-pill" style={{ width: '50px' }}></div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className="project-row"
                    style={{ marginLeft: `${offset}px`, zIndex: projects.length - i }}
                    onClick={() => setSelectedProject(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
                  >
                    <div className="project-row__tab">
                      <Icon size={18} style={{ color: project.iconColor }} />
                      <span className="project-row__name">{t(project.titleKey)}</span>
                    </div>
                    <div className="project-row__info">
                      <span className="project-row__tech">{project.tech}</span>
                    </div>
                  </div>
                );
              })}
            </div>
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
                      Visit Project
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button className="btn btn--outline project-modal__btn" onClick={() => setSelectedProject(null)}>
                    Close
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
