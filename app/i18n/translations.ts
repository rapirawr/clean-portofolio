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
    "nav.stats": "Stats",

    // Hero
    "hero.greeting": "Hello, I'm",
    "hero.name": "Rafi Abdillah F",
    "hero.role": "Fullstack Developer",
    "hero.tagline": "Fullstack developer based in Indonesia. I build web apps that work well and look good.",
    "hero.cta.projects": "View Projects",
    "hero.cta.cv": "Download CV",
    "hero.cta.resume": "Resume",
    "hero.status": "Available for work",

    // About
    "about.label": "About",
    "about.title": "A developer who cares about the work",
    "about.titleHeader": "ABOUT ME",
    "about.description": "I'm a Fullstack Developer from Indonesia. I focus on building web apps that are fast, functional, and look good doing it.",
    "about.years": "Years Experience",
    "about.projectCount": "Projects Built",
    "about.certCount": "Certifications",
    "about.yearsCount": "3+ Years",
    "about.yearsLabel": "Experience",

    // Statement
    "statement.headText": "Build web app with",
    "statement.statEnabled": "Aesthetic",
    "statement.statDisabled": "Static",
    "statement.on": "design",
    "statement.ready": "I'm ready when you're ready",
    
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
    "projects.desc": "Explore my portfolio of web applications, mobile apps, and digital infrastructure projects built with modern technologies.",
    "projects.exploreCredentials": "Explore credentials",
    "projects.visitProject": "Visit Project",
    "projects.close": "Close",

    // Project descriptions
    "project1.title": "KAZE POS",
    "project1.category": "POS System",
    "project1.desc": "A Point of Sale system built for retail. Real-time inventory, multi-outlet support, and works offline.",
    "project2.title": "SIPS",
    "project2.category": "Infrastructure",
    "project2.desc": "A complaint management system for institutions. Handles large data volumes with role-based access and automated reports.",
    "project3.title": "HAJIKU",
    "project3.category": "E-Commerce",
    "project3.desc": "A food ordering app with real-time price comparison and automated ordering. Built mobile-first.",
    "project4.title": "AMSLE MAS BUDI",
    "project4.category": "UMKM Website",
    "project4.desc": "A simple website to showcase and promote the Amsle Mas Budi local business.",
    "project5.title": "CASIVO HOME",
    "project5.category": "IoT Dashboard",
    "project5.desc": "A smart home dashboard that centralizes IoT devices. Built with React and ESP32 over MQTT.",
    "project6.title": "CONVERTIFLY",
    "project6.category": "AI Image SaaS",
    "project6.desc": "A browser-based image tool with AI background removal, compression, and multi-format conversion. No upload needed.",

    // Credentials
    "credentials.label": "Credentials",
    "credentials.title": "Certification Archive",
    "credentials.desc": "A comprehensive collection of verified technical certifications, competition awards, and academic achievements.",
    "credentials.viewAll": "View Full Archive",

    // Stats
    "stats.label": "Developer Stats",
    "stats.githubTitle": "GitHub Profile",
    "stats.wakatimeTitle": "WakaTime Activity",
    "stats.repos": "Repositories",
    "stats.followers": "Followers",
    "stats.stars": "Total Stars",
    "stats.languages": "Top Languages",
    "stats.editors": "Preferred Editors",
    "stats.loading": "Syncing developer data...",
    "stats.weeklyHours": "Weekly Coding",
    "stats.mockIndicator": "Sample Data",
    "stats.liveIndicator": "Live",

    // Contact
    "contact.label": "Get in Touch",
    "contact.title": "Let's work together.",
    "contact.subtitle": "Have a project? I'm open to freelance work, collabs, and full-time roles.",
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
    "nav.stats": "Statistik",

    // Hero
    "hero.greeting": "Halo, Saya",
    "hero.name": "Rafi Abdillah F",
    "hero.role": "Fullstack Developer",
    "hero.tagline": "Fullstack developer asal Indonesia. Saya bikin web app yang fungsional dan enak dilihat.",
    "hero.cta.projects": "Lihat Proyek",
    "hero.cta.cv": "Unduh CV",
    "hero.cta.resume": "Resume",
    "hero.status": "Tersedia untuk bekerja",

    // About
    "about.label": "Tentang",
    "about.title": "Developer yang peduli sama hasil kerjanya",
    "about.titleHeader": "TENTANG SAYA",
    "about.description": "Saya Fullstack Developer dari Indonesia. Fokus bikin web app yang cepat, fungsional, dan tampilannya ga ngebosenin.",
    "about.years": "Tahun Pengalaman",
    "about.projectCount": "Proyek Selesai",
    "about.certCount": "Sertifikasi",
    "about.yearsCount": "3+ Tahun",
    "about.yearsLabel": "Pengalaman",

    // Statement
    "statement.headText": "Bangun web app dengan",
    "statement.statEnabled": "Estetik",
    "statement.statDisabled": "Statis",
    "statement.on": "desain",
    "statement.ready": "Saya siap kapanpun Anda siap",

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
    "projects.desc": "Jelajahi portofolio aplikasi web, mobile, dan proyek infrastruktur digital yang dibangun dengan teknologi modern.",
    "projects.exploreCredentials": "Jelajahi sertifikat",
    "projects.visitProject": "Kunjungi Proyek",
    "projects.close": "Tutup",

    // Project descriptions
    "project1.title": "KAZE POS",
    "project1.category": "Sistem Kasir",
    "project1.desc": "Sistem kasir untuk retail. Stok real-time, support multi-outlet, dan bisa jalan offline.",
    "project2.title": "SIPS",
    "project2.category": "Infrastruktur",
    "project2.desc": "Sistem pengaduan untuk institusi. Menangani data besar dengan akses berbasis peran dan laporan otomatis.",
    "project3.title": "HAJIKU",
    "project3.category": "E-Commerce",
    "project3.desc": "Aplikasi pemesanan makanan dengan perbandingan harga real-time dan pemesanan otomatis. Dibangun mobile-first.",
    "project4.title": "AMSLE MAS BUDI",
    "project4.category": "Website UMKM",
    "project4.desc": "Website sederhana untuk menampilkan dan mempromosikan bisnis lokal Amsle Mas Budi.",
    "project5.title": "CASIVO HOME",
    "project5.category": "Dashboard IoT",
    "project5.desc": "Dashboard rumah pintar yang memusatkan semua perangkat IoT. Dibangun dengan React dan ESP32 via MQTT.",
    "project6.title": "CONVERTIFLY",
    "project6.category": "SaaS Gambar AI",
    "project6.desc": "Tool pengolah gambar berbasis browser dengan AI background removal, kompresi, dan konversi multi-format. Tanpa upload ke server.",

    // Credentials
    "credentials.label": "Sertifikat",
    "credentials.title": "Arsip Sertifikasi",
    "credentials.desc": "Koleksi lengkap sertifikasi teknis terverifikasi, penghargaan kompetisi, dan pencapaian akademik.",
    "credentials.viewAll": "Lihat Semua Arsip",

    // Stats
    "stats.label": "Statistik Developer",
    "stats.githubTitle": "Profil GitHub",
    "stats.wakatimeTitle": "Aktivitas WakaTime",
    "stats.repos": "Repositori",
    "stats.followers": "Pengikut",
    "stats.stars": "Total Bintang",
    "stats.languages": "Bahasa Teratas",
    "stats.editors": "Editor Pilihan",
    "stats.loading": "Sinkronisasi data developer...",
    "stats.weeklyHours": "Coding Mingguan",
    "stats.mockIndicator": "Data Sampel",
    "stats.liveIndicator": "Live",

    // Contact
    "contact.label": "Hubungi Saya",
    "contact.title": "Yuk kerja bareng.",
    "contact.subtitle": "Ada proyek? Saya terbuka untuk freelance, kolaborasi, atau full-time.",
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
