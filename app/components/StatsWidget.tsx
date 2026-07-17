import { useEffect, useState } from "react";
import { useLanguage } from "~/context/LanguageContext";
import { Code, Star, Users, Laptop, Clock, Activity } from "lucide-react";

const Github = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


interface GithubData {
  username: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  stars: number;
  languages: { name: string; percentage: number }[];
}

interface WakaTimeData {
  totalHours: string;
  range: string;
  languages: { name: string; percent: number }[];
  editors: { name: string; percent: number }[];
  isMock: boolean;
}

interface StatsResponse {
  github: GithubData;
  wakatime: WakaTimeData;
}

export function StatsWidget() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load developer stats", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="section stats reveal">
        <div className="container">
          <div className="stats__loading">
            <div className="stats__spinner"></div>
            <p>{t("stats.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!stats) return null;

  return (
    <section id="stats" className="section stats reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("stats.label")}</h2>
        </div>

        <div className="stats__grid">
          {/* GitHub Card */}
          <div className="stats-card stats-card--github">
            <div className="stats-card__header">
              <div className="stats-card__title-wrap">
                <Github size={20} className="stats-card__icon text-accent" />
                <h3 className="stats-card__title">{t("stats.githubTitle")}</h3>
              </div>
              <span className="stats-card__badge stats-card__badge--live">
                {t("stats.liveIndicator")}
              </span>
            </div>

            <div className="stats-card__profile">
              {stats.github.avatarUrl ? (
                <img
                  src={stats.github.avatarUrl}
                  alt={stats.github.username}
                  className="stats-card__avatar"
                />
              ) : (
                <div className="stats-card__avatar-placeholder">
                  <Github size={24} />
                </div>
              )}
              <div className="stats-card__user-info">
                <h4 className="stats-card__username">@{stats.github.username}</h4>
                <a
                  href={`https://github.com/${stats.github.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stats-card__link"
                >
                  github.com/{stats.github.username}
                </a>
              </div>
            </div>

            <div className="stats-card__metrics">
              <div className="stats-card__metric">
                <Code size={18} className="stats-card__metric-icon" />
                <span className="stats-card__metric-value">{stats.github.publicRepos}</span>
                <span className="stats-card__metric-label">{t("stats.repos")}</span>
              </div>
              <div className="stats-card__metric">
                <Star size={18} className="stats-card__metric-icon" />
                <span className="stats-card__metric-value">{stats.github.stars}</span>
                <span className="stats-card__metric-label">{t("stats.stars")}</span>
              </div>
              <div className="stats-card__metric">
                <Users size={18} className="stats-card__metric-icon" />
                <span className="stats-card__metric-value">{stats.github.followers}</span>
                <span className="stats-card__metric-label">{t("stats.followers")}</span>
              </div>
            </div>

            {stats.github.languages.length > 0 && (
              <div className="stats-card__languages">
                <h4 className="stats-card__sub-title">{t("stats.languages")}</h4>
                <div className="stats-card__bars">
                  {stats.github.languages.map((lang) => (
                    <div key={lang.name} className="stats-bar-item">
                      <div className="stats-bar-item__info">
                        <span>{lang.name}</span>
                        <span>{lang.percentage}%</span>
                      </div>
                      <div className="stats-bar-item__progress-bg">
                        <div
                          className="stats-bar-item__progress-fill"
                          style={{ width: `${lang.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* WakaTime Card */}
          <div className="stats-card stats-card--wakatime">
            <div className="stats-card__header">
              <div className="stats-card__title-wrap">
                <Activity size={20} className="stats-card__icon text-accent" />
                <h3 className="stats-card__title">{t("stats.wakatimeTitle")}</h3>
              </div>
              <span
                className={`stats-card__badge ${
                  stats.wakatime.isMock ? "stats-card__badge--mock" : "stats-card__badge--live"
                }`}
              >
                {stats.wakatime.isMock ? t("stats.mockIndicator") : t("stats.liveIndicator")}
              </span>
            </div>

            <div className="stats-card__waka-summary">
              <div className="stats-card__waka-summary-item">
                <Clock size={28} className="stats-card__waka-large-icon text-accent" />
                <div>
                  <span className="stats-card__waka-value">{stats.wakatime.totalHours}</span>
                  <span className="stats-card__waka-label">
                    {t("stats.weeklyHours")} ({stats.wakatime.range})
                  </span>
                </div>
              </div>
            </div>

            <div className="stats-card__waka-details">
              {/* Languages */}
              <div className="stats-card__section">
                <h4 className="stats-card__sub-title">{t("stats.languages")}</h4>
                <div className="stats-card__bars">
                  {stats.wakatime.languages.map((lang) => (
                    <div key={lang.name} className="stats-bar-item">
                      <div className="stats-bar-item__info">
                        <span>{lang.name}</span>
                        <span>{lang.percent}%</span>
                      </div>
                      <div className="stats-bar-item__progress-bg">
                        <div
                          className="stats-bar-item__progress-fill"
                          style={{ width: `${lang.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editors */}
              <div className="stats-card__section">
                <h4 className="stats-card__sub-title">{t("stats.editors")}</h4>
                <div className="stats-card__bars">
                  {stats.wakatime.editors.map((editor) => (
                    <div key={editor.name} className="stats-bar-item">
                      <div className="stats-bar-item__info">
                        <span>{editor.name}</span>
                        <span>{editor.percent}%</span>
                      </div>
                      <div className="stats-bar-item__progress-bg">
                        <div
                          className="stats-bar-item__progress-fill"
                          style={{ width: `${editor.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
