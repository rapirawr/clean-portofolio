export type Locale = "en" | "id";

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.credentials": "Credentials",

    // Hero
    "hero.greeting": "Hello, I'm",
    "hero.name": "Rafi Abdillah F",
    "hero.role": "Fullstack Developer",
    "hero.tagline": "Building scalable, high-performance web applications with refined aesthetics.",
    "hero.cta.projects": "View Projects",
    "hero.cta.cv": "Download CV",
    "hero.cta.resume": "Resume",
    "hero.status": "Available for work",

    // About
    "about.label": "About",
    "about.title": "A developer who cares about craft",
    "about.titleHeader": "ABOUT ME",
    "about.description": "I am a Fullstack Developer dedicated to building scalable, high-performance web applications with refined aesthetics. Based in Indonesia, I focus on creating digital experiences that blend technical excellence with thoughtful design.",
    "about.years": "Years Experience",
    "about.projectCount": "Projects Built",
    "about.certCount": "Certifications",

    // Statement
    "statement.premiumEnabled": "premium-enabled",
    "statement.standardReady": "standard-ready",
    "statement.aesthetic": "aesthetic",
    "statement.ready": "Im ready when you're ready",

    // Experience
    "exp.label": "Experience & Education",
    "exp1.date": "2024 — Present",
    "exp1.title": "Software Engineering",
    "exp1.place": "SMKN 1 Bondowoso",
    "exp1.desc": "Focusing on software development, modern web architecture, and advanced programming logic.",
    "exp2.date": "2021 — 2024",
    "exp2.title": "Junior High School",
    "exp2.place": "SMP Negeri 3 Bondowoso",
    "exp2.desc": "Completed basic education with a focus on general studies.",
    "exp3.date": "2015 — 2021",
    "exp3.title": "Elementary School",
    "exp3.place": "SD Negeri Dabasah 4 Bondowoso",
    "exp3.desc": "Started academic journey and developed fundamental skills.",

    // Skills
    "skills.label": "Skills & Expertise",
    "skills.frontend": "Frontend & Design",
    "skills.backend": "Backend & Infrastructure",
    "skills.systems": "Systems & Mobile",

    // Projects
    "projects.label": "Featured Projects",
    "projects.viewAll": "View All Projects",
    "projects.visitSite": "Visit Site",
    "projects.viewDetails": "View Details",

    // Project descriptions
    "project1.title": "KAZE POS",
    "project1.category": "POS System",
    "project1.desc": "A premium Point of Sale system built for high-performance retail environments. Features real-time inventory tracking, multi-outlet management, and a sleek offline-first architecture.",
    "project2.title": "SIPS",
    "project2.category": "Infrastructure",
    "project2.desc": "An enterprise-grade complaint infrastructure. Designed to handle large volumes of data with institutional security protocols and automated reporting systems.",
    "project3.title": "HAJIKU",
    "project3.category": "E-Commerce",
    "project3.desc": "A food procurement ecosystem optimized for speed. Features real-time price comparisons, automated ordering, and a seamless mobile-first user experience.",
    "project4.title": "AMSLE MAS BUDI",
    "project4.category": "UMKM Website",
    "project4.desc": "A dedicated platform to showcase and promote the Amsle Mas Budi local business ecosystem.",
    "project5.title": "CASIVO HOME",
    "project5.category": "IoT Dashboard",
    "project5.desc": "The ultimate smart home dashboard. Centralizes all IoT devices into one beautiful, intuitive interface with automated scene control and energy monitoring.",
    "project6.title": "CONVERTIFLY",
    "project6.category": "AI Image SaaS",
    "project6.desc": "An advanced browser-based image processing suite featuring AI background removal, high-performance compression, and multi-format conversion.",

    // Credentials
    "credentials.label": "Credentials",
    "credentials.title": "Certification Archive",
    "credentials.desc": "A comprehensive collection of verified technical certifications, competition awards, and academic achievements.",
    "credentials.viewAll": "View Full Archive",

    // Contact
    "contact.label": "Get in Touch",
    "contact.title": "Let's build something extraordinary.",
    "contact.subtitle": "Have a project in mind? I'm available for freelance work, collaborations, and full-time opportunities.",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.subject": "Subject",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "Failed to send message. Please try again.",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.built": "Built with React Router & TypeScript",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
  },

  id: {
    // Nav
    "nav.home": "Beranda",
    "nav.about": "Profil",
    "nav.experience": "Pengalaman",
    "nav.skills": "Keahlian",
    "nav.projects": "Proyek",
    "nav.contact": "Kontak",
    "nav.credentials": "Sertifikat",

    // Hero
    "hero.greeting": "Halo, Saya",
    "hero.name": "Rafi Abdillah F",
    "hero.role": "Fullstack Developer",
    "hero.tagline": "Membangun aplikasi web yang skalabel dan berperforma tinggi dengan estetika yang halus.",
    "hero.cta.projects": "Lihat Proyek",
    "hero.cta.cv": "Unduh CV",
    "hero.cta.resume": "Resume",
    "hero.status": "Tersedia untuk bekerja",

    // About
    "about.label": "Tentang",
    "about.title": "Developer yang peduli pada kualitas",
    "about.titleHeader": "TENTANG SAYA",
    "about.description": "Saya adalah Fullstack Developer yang berdedikasi untuk membangun aplikasi web skalabel berperforma tinggi dengan estetika yang halus. Berbasis di Indonesia, saya fokus menciptakan pengalaman digital yang memadukan keunggulan teknis dengan desain yang cermat.",
    "about.years": "Tahun Pengalaman",
    "about.projectCount": "Proyek Selesai",
    "about.certCount": "Sertifikasi",

    // Statement
    "statement.premiumEnabled": "premium-enabled",
    "statement.standardReady": "standard-ready",
    "statement.aesthetic": "estetika",
    "statement.ready": "Kami siap kapanpun Anda siap",

    // Experience
    "exp.label": "Pengalaman & Pendidikan",
    "exp1.date": "2024 — Sekarang",
    "exp1.title": "Rekayasa Perangkat Lunak",
    "exp1.place": "SMKN 1 Bondowoso",
    "exp1.desc": "Fokus dalam pengembangan perangkat lunak, arsitektur web modern, dan logika pemrograman tingkat lanjut.",
    "exp2.date": "2021 — 2024",
    "exp2.title": "Sekolah Menengah Pertama",
    "exp2.place": "SMP Negeri 3 Bondowoso",
    "exp2.desc": "Menyelesaikan pendidikan dasar menengah dengan fokus pada studi umum.",
    "exp3.date": "2015 — 2021",
    "exp3.title": "Sekolah Dasar",
    "exp3.place": "SD Negeri Dabasah 4 Bondowoso",
    "exp3.desc": "Memulai perjalanan akademik dan mengembangkan keterampilan dasar.",

    // Skills
    "skills.label": "Keahlian & Spesialisasi",
    "skills.frontend": "Frontend & Desain",
    "skills.backend": "Backend & Infrastruktur",
    "skills.systems": "Sistem & Mobile",

    // Projects
    "projects.label": "Proyek Unggulan",
    "projects.viewAll": "Lihat Semua Proyek",
    "projects.visitSite": "Kunjungi Situs",
    "projects.viewDetails": "Lihat Detail",

    // Project descriptions
    "project1.title": "KAZE POS",
    "project1.category": "Sistem Kasir",
    "project1.desc": "Sistem Point of Sale yang dibangun untuk lingkungan ritel berperforma tinggi. Menampilkan pelacakan inventaris real-time, manajemen multi-outlet, dan arsitektur yang ramping.",
    "project2.title": "SIPS",
    "project2.category": "Infrastruktur",
    "project2.desc": "Infrastruktur pengaduan tingkat enterprise. Dirancang untuk menangani volume data besar dengan protokol keamanan institusional dan sistem pelaporan otomatis.",
    "project3.title": "HAJIKU",
    "project3.category": "E-Commerce",
    "project3.desc": "Ekosistem pengadaan makanan yang dioptimalkan untuk kecepatan. Menampilkan perbandingan harga real-time, pemesanan otomatis, dan pengalaman pengguna yang mulus.",
    "project4.title": "AMSLE MAS BUDI",
    "project4.category": "Website UMKM",
    "project4.desc": "Platform khusus untuk menampilkan dan mempromosikan ekosistem bisnis lokal Amsle Mas Budi.",
    "project5.title": "CASIVO HOME",
    "project5.category": "Dashboard IoT",
    "project5.desc": "Dashboard rumah pintar terbaik. Memusatkan semua perangkat IoT ke dalam satu antarmuka yang indah dan intuitif dengan kontrol skenario otomatis.",
    "project6.title": "CONVERTIFLY",
    "project6.category": "SaaS Gambar AI",
    "project6.desc": "Suite pemrosesan gambar berbasis browser canggih dengan penghapusan latar belakang bertenaga AI, kompresi performa tinggi, dan konversi multi-format.",

    // Credentials
    "credentials.label": "Sertifikat",
    "credentials.title": "Arsip Sertifikasi",
    "credentials.desc": "Koleksi lengkap sertifikasi teknis terverifikasi, penghargaan kompetisi, dan pencapaian akademik.",
    "credentials.viewAll": "Lihat Semua Arsip",

    // Contact
    "contact.label": "Hubungi Saya",
    "contact.title": "Mari bangun sesuatu yang luar biasa.",
    "contact.subtitle": "Punya proyek? Saya tersedia untuk freelance, kolaborasi, dan kesempatan penuh waktu.",
    "contact.name": "Nama Lengkap",
    "contact.email": "Alamat Email",
    "contact.subject": "Subjek",
    "contact.message": "Pesan Anda",
    "contact.send": "Kirim Pesan",
    "contact.sending": "Mengirim...",
    "contact.success": "Pesan berhasil dikirim!",
    "contact.error": "Gagal mengirim pesan. Silakan coba lagi.",

    // Footer
    "footer.rights": "Hak cipta dilindungi.",
    "footer.built": "Dibangun dengan React Router & TypeScript",

    // Theme
    "theme.light": "Terang",
    "theme.dark": "Gelap",
    "theme.system": "Sistem",
  },
};
