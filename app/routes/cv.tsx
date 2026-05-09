import { useLanguage } from "~/context/LanguageContext";
import { ArrowLeft, Mail, Phone, MapPin, Download, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router";

export default function CVPage() {
  const { t } = useLanguage();

  return (
    <div className="cv-page-wrapper">
      <header className="page-header no-print">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Kembali ke Beranda</span>
        </Link>
      </header>

      <button className="print-btn no-print" onClick={() => window.print()}>
        <Download size={18} />
        UNDUH CV (PDF)
      </button>

      <div className="cv-container">
        <header className="cv-header">
          <div className="cv-profile">
            <img src="/images/cv.jpg" alt="Rafi Abdillah F" className="cv-photo" />
            <div className="cv-name-meta">
              <h1>RAFI ABDILLAH F</h1>
              <p>Software Engineer</p>
            </div>
          </div>
          <div className="cv-contact">
            <a href="mailto:rabdillahf09@gmail.com" className="cv-contact-item">
              rabdillahf09@gmail.com
              <Mail size={14} />
            </a>
            <span className="cv-contact-item">
              082330927400
              <Phone size={14} />
            </span>
            <span className="cv-contact-item">
              Bondowoso, Jawa Timur, Indonesia
              <MapPin size={14} />
            </span>
            <a href="https://github.com/rapirawr" className="cv-contact-item">
              github.com/rapirawr
              <LinkIcon size={14} />
            </a>
          </div>
        </header>

        <div className="cv-body">
          <aside className="cv-sidebar">
            <section className="cv-section">
              <h2 className="cv-section-title">Keahlian</h2>
              
              <div className="cv-skill-group">
                <h4>Frontend</h4>
                <div className="cv-tags">
                  <span>HTML5/CSS3</span>
                  <span>JS ES6+</span>
                  <span>Tailwind</span>
                  <span>React/Remix</span>
                </div>
              </div>

              <div className="cv-skill-group">
                <h4>Backend</h4>
                <div className="cv-tags">
                  <span>Laravel</span>
                  <span>PHP</span>
                  <span>MySQL</span>
                  <span>Supabase</span>
                </div>
              </div>

              <div className="cv-skill-group">
                <h4>Mobile</h4>
                <div className="cv-tags">
                  <span>Flutter</span>
                  <span>Dart</span>
                </div>
              </div>

              <div className="cv-skill-group">
                <h4>Desain</h4>
                <div className="cv-tags">
                  <span>Figma</span>
                  <span>UI/UX</span>
                  <span>Blender</span>
                </div>
              </div>
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">Pendidikan</h2>
              <div className="cv-item">
                <div className="cv-item-title">Rekayasa Perangkat Lunak</div>
                <div className="cv-item-sub">SMK Negeri 1 Bondowoso</div>
                <div className="cv-item-date">2024 — Sekarang</div>
              </div>
              <div className="cv-item">
                <div className="cv-item-title">Sekolah Menengah Pertama</div>
                <div className="cv-item-sub">SMP Negeri 3 Bondowoso</div>
                <div className="cv-item-date">2021 — 2024</div>
              </div>
              <div className="cv-item">
                <div className="cv-item-title">Sekolah Dasar</div>
                <div className="cv-item-sub">SD Negeri Dabasah 4 Bondowoso</div>
                <div className="cv-item-date">2015 — 2021</div>
              </div>
            </section>
          </aside>

          <main className="cv-main">
            <section className="cv-section">
              <h2 className="cv-section-title">Tentang Saya</h2>
              <p className="cv-text">
                Perkenalkan nama saya Rafi Abdillah Fairuz, Saya adalah seorang pelajar di SMK Negeri 1 Bondowoso jurusan Rekayasa Perangkat Lunak. Saya memiliki ketertarikan di bidang teknologi informasi, khususnya dalam pengembangan web dan aplikasi mobile. Saya memiliki pengalaman dalam pengembangan web menggunakan Laravel dan PHP, serta pengembangan aplikasi mobile menggunakan Flutter dan Dart.
              </p>
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">Pengalaman Profesional</h2>
              <div className="cv-item">
                <div className="cv-item-header">
                  <h3 className="cv-item-title">Fullstack Developer</h3>
                  <span className="cv-item-date">2025 — Sekarang</span>
                </div>
                <div className="cv-item-sub">Proyek Digital Mandiri</div>
                <ul className="cv-list">
                  <li>Mengembangkan arsitektur aplikasi web kustom menggunakan PHP dan Laravel.</li>
                  <li>Mengoptimalkan database relasional untuk performa pencarian data yang cepat.</li>
                  <li>Memastikan keamanan sistem dan integrasi API yang mulus.</li>
                </ul>
              </div>
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">Proyek</h2>
              <div className="cv-project">
                <h4>KAZE POS</h4>
                <p>Sistem Point of Sale modern untuk manajemen inventaris dan transaksi secara real-time.</p>
              </div>
              <div className="cv-project">
                <h4>SIPS (Sistem Informasi Pengaduan Sekolah)</h4>
                <p>Membangun infrastruktur pelaporan sekolah berbasis cloud.</p>
              </div>
              <div className="cv-project">
                <h4>HAJIKU</h4>
                <p>Platform pengadaan food & beverage real-time.</p>
              </div>
              <div className="cv-project">
                <h4>CASIVO</h4>
                <p>Dashboard Digital Twin untuk monitoring sensor cerdas dan otomasi infrastruktur.</p>
              </div>
              <div className="cv-project">
                <h4>CONVERTIFLY</h4>
                <p>Website untuk mengkonversi berbagai format dokumen.</p>
              </div>
              <div className="cv-project">
                <h4>WEBSITE UMKM AMSLE MAS BUDI</h4>
                <p>Platform profil UMKM untuk meningkatkan visibilitas digital produk lokal.</p>
              </div>
            </section>
          </main>
        </div>

        <footer className="cv-footer">
          V.2026 // SYSTEM INTEGRATED // RAFI ABDILLAH F
        </footer>
      </div>
    </div>
  );
}
