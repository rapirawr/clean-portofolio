import { useLanguage } from "~/context/LanguageContext";
import { LayoutTemplate, PenTool, Box, Server, Database, Terminal, Smartphone, Cpu, Gamepad2 } from "lucide-react";

interface Skill {
  icon: typeof LayoutTemplate;
  name: string;
  detail: string;
}

interface SkillCategory {
  titleKey: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    titleKey: "skills.frontend",
    skills: [
      { icon: LayoutTemplate, name: "Frontend Core", detail: "React / CSS / JS" },
      { icon: PenTool, name: "Figma", detail: "Prototyping / UX" },
      { icon: Box, name: "Blender", detail: "3D Modeling" },
    ],
  },
  {
    titleKey: "skills.backend",
    skills: [
      { icon: Server, name: "Laravel & Python", detail: "MVC / API / Scripts" },
      { icon: Database, name: "MySQL", detail: "Relational Design" },
      { icon: Terminal, name: "Linux", detail: "Bash / Server Mgmt" },
    ],
  },
  {
    titleKey: "skills.systems",
    skills: [
      { icon: Smartphone, name: "Flutter", detail: "Cross-Platform UI" },
      { icon: Cpu, name: "IoT & Embedded", detail: "ESP32 / Sensors" },
      { icon: Gamepad2, name: "Roblox Studio", detail: "Luau / Game Engine" },
    ],
  },
];

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section skills reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t("skills.label")}</span>
        </div>
        <div className="skills__grid">
          {categories.map((cat) => (
            <div key={cat.titleKey} className="skill-category">
              <h3 className="skill-category__title">{t(cat.titleKey)}</h3>
              <div className="skill-category__items">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <skill.icon size={20} className="skill-item__icon" />
                    <div className="skill-item__info">
                      <span className="skill-item__name">{skill.name}</span>
                      <span className="skill-item__detail">{skill.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
