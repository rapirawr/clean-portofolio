import { useLanguage } from "~/context/LanguageContext";
import { ArrowLeft, X, ZoomIn } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function CertificatesPage() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<any>(null);

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

  return (
    <div className="page-container certificates-page">
      <header className="page-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
        <h1 className="page-title">{t("credentials.title")}</h1>
        <p className="page-subtitle">{t("credentials.desc")}</p>
      </header>

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
