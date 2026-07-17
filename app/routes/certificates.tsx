import type { MetaFunction } from "react-router";
import { useLanguage } from "~/context/LanguageContext";
import { ArrowLeft, X, ZoomIn, Grid, Orbit } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import InfiniteMenu from "~/components/InfiniteMenu";

export const meta: MetaFunction = () => {
  return [
    { title: "Certifications | Rafi Abdillah F" },
    { name: "description", content: "Archive of verified technical certifications, awards, and achievements of Rafi Abdillah F." },
    { property: "og:title", content: "Certifications | Rafi Abdillah F" },
    { property: "og:description", content: "Archive of verified technical certifications, awards, and achievements of Rafi Abdillah F." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://rapirawr.my.id/images/favicon.png" },
  ];
};

export default function CertificatesPage() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "infinite">("grid");

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCert]);

  const allCerts = [
    {
      src: "/images/certificates/Juara 1 Web Design - DovesDev.jpeg",
      title: "Innovation & Technology Award",
      issuer: "INNOTECH COMPETITION",
      date: "2025",
      category: "awards"
    },
    {
      src: "/images/certificates/UIUX Competition ISAC - DovesDev.jpg",
      title: "UI/UX Design Excellence",
      issuer: "ISAC COMMUNITY",
      date: "2025",
      category: "awards"
    },
    {
      src: "/images/certificates/Samsung Innovation Campus - Logic Test.jpg",
      title: "SIC Batch 6 Completion",
      issuer: "SAMSUNG INNOVATION CAMPUS",
      date: "2024",
      category: "tech"
    },
    {
      src: "/images/certificates/Sertifikat Pelatihan TIK - Rafi Abdillah.jpg",
      title: "Python Programming Mastery",
      issuer: "LATIKA ACADEMY",
      date: "2025",
      category: "tech"
    },
    {
      src: "/images/certificates/Peserta Terbaik Pelatihan TIK - Rafi Abdillah.jpg",
      title: "Core Tech Fundamentals",
      issuer: "LATIKA COMPETITION",
      date: "2025",
      category: "awards"
    },
    {
      src: "/images/certificates/Mahavation PUSH - SMKN 1 Bondowoso.png",
      title: "IoT Innovation",
      issuer: "MAHAVATION 2025",
      date: "2025",
      category: "awards"
    },
    {
      src: "/images/certificates/Claude 101.jpg",
      title: "Claude 101",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Claude Code 101.jpg",
      title: "Claude Code",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Claude Code - In Action.jpg",
      title: "Claude Code in Action",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Claude Cowork - Introduction.jpg",
      title: "Claude Cowork",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/AI Fluency - Capabilities & Limitations.jpg",
      title: "AI Fluency: Capabilities",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/AI Fluency - For Educators.jpg",
      title: "AI Fluency: For Educators",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/AI Fluency - For Students.jpg",
      title: "AI Fluency: For Students",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/AI Fluency - Framework & Foundations.jpg",
      title: "AI Fluency: Foundations",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Model Context Protocol - Introduction.jpg",
      title: "MCP Introduction",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Teaching the AI Fluency Framework.jpg",
      title: "Teaching AI Fluency",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Claude with Amazon Bedrock.jpg",
      title: "Claude with Bedrock",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Introduction to Agent Skills.jpg",
      title: "Agent Skills",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Model Context Protocol - Advanced Topics.jpg",
      title: "MCP Advanced Topics",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/AI Fluency for Nonprofits.jpg",
      title: "AI for Nonprofits",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Claude with the Anthropic API.jpg",
      title: "Anthropic API",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Introduction to Subagents.jpg",
      title: "Subagents Intro",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    },
    {
      src: "/images/certificates/Claude with Vertex AI.jpg",
      title: "Claude with Vertex AI",
      issuer: "ANTHROPIC",
      date: "2026",
      category: "ai"
    }
  ];

  const menuItems = allCerts.map((cert) => ({
    image: cert.src,
    link: cert.src,
    title: cert.title,
    description: cert.issuer,
  }));

  return (
    <div className="page-container certificates-page">
      <header className="page-header" style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
          <Link to="/" className="back-link" style={{ margin: 0 }}>
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <div style={{ display: "flex", gap: "6px", background: "var(--card-bg)", padding: "4px", borderRadius: "100px", border: "1px solid var(--border)" }}>
            <button
              onClick={() => setViewMode("grid")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "100px",
                cursor: "pointer",
                background: viewMode === "grid" ? "var(--accent)" : "transparent",
                color: viewMode === "grid" ? "white" : "var(--text-secondary)",
                transition: "all 0.3s ease",
                border: "none"
              }}
            >
              <Grid size={15} />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode("infinite")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "100px",
                cursor: "pointer",
                background: viewMode === "infinite" ? "var(--accent)" : "transparent",
                color: viewMode === "infinite" ? "white" : "var(--text-secondary)",
                transition: "all 0.3s ease",
                border: "none"
              }}
            >
              <Orbit size={15} />
              <span>3D Sphere</span>
            </button>
          </div>
        </div>
        <h1 className="page-title" style={{ marginTop: 0 }}>{t("credentials.title")}</h1>
        <p className="page-subtitle">{t("credentials.desc")}</p>
      </header>

      {viewMode === "grid" ? (
        <div className="certificates-grid">
          {allCerts.map((cert, i) => (
            <div key={i} className="cert-window" onClick={() => setSelectedCert(cert)}>
              <div className="cert-window__header">
                <div className="cert-window__dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <span className="cert-window__title">certification_{i+1}.pdf</span>
              </div>
              <div className="cert-window__body">
                <div className="cert-flip-card">
                  <div className="cert-flip-inner">
                    <div className="cert-flip-front">
                      <div className="cert-info-main">
                        <span className="cert-category-tag">{cert.category.toUpperCase()}</span>
                        <h3 className="cert-title">{cert.title}</h3>
                        <div className="cert-meta">
                          <div className="meta-item">
                            <span className="label">ISSUER</span>
                            <span className="value">{cert.issuer}</span>
                          </div>
                          <div className="meta-item">
                            <span className="label">DATE</span>
                            <span className="value">{cert.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="cert-flip-back">
                      <img src={cert.src} alt={cert.title} />
                      <div className="cert-view-hint">
                        <ZoomIn size={20} />
                        <span>Click to enlarge</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ height: "650px", position: "relative", width: "100%", borderRadius: "16px", overflow: "hidden", background: "#050505", border: "1px solid var(--border)" }}>
          <InfiniteMenu items={menuItems} scale={1.0} />
        </div>
      )}

      {/* MODAL */}
      {selectedCert && (
        <div className="cert-full-modal" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCert(null)}>
              <X size={24} />
            </button>
            <div className="modal-window">
              <div className="modal-window-header">
                <div className="cert-window__dots">
                  <span className="dot" style={{background:'#ff5f56'}}></span>
                  <span className="dot" style={{background:'#ffbd2e'}}></span>
                  <span className="dot" style={{background:'#27c93f'}}></span>
                </div>
                <span className="modal-window-title">{selectedCert.title}</span>
              </div>
              <div className="modal-window-body">
                <img src={selectedCert.src} alt={selectedCert.title} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
