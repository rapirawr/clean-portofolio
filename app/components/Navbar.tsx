import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "~/context/LanguageContext";
import { useTheme } from "~/context/ThemeContext";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X, ArrowUpRight } from "lucide-react";
import GooeyNav from "./GooeyNav";

const navItems = [
  { key: "nav.home", href: "#hero" },
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/rapirawr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rafi-abdillah-f-9517a1329/" },
  { label: "Instagram", href: "https://instagram.com/rapikerenbgt" },
];

// Threshold: jika di-drag lebih dari ini (px), sheet akan tutup
const DRAG_CLOSE_THRESHOLD = 120;
// Threshold velocity: jika flick cepat ke bawah, langsung tutup
const VELOCITY_THRESHOLD = 0.5;

export function Navbar() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Drag state
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    isDragging: false,
    startY: 0,
    currentY: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
  });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Use IntersectionObserver to track which section is in view
    const observers: IntersectionObserver[] = [];

    navItems.forEach((item, idx) => {
      const el = document.querySelector(item.href);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (isClickScrolling.current) return;
          if (entry.isIntersecting) {
            setActiveIndex(idx);
          }
        },
        {
          // Section triggers when it enters the top 30% of viewport
          rootMargin: "-10% 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);


  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Reset drag offset ketika sheet dibuka/ditutup
  useEffect(() => {
    if (!mobileOpen) {
      setDragOffset(0);
      dragState.current.isDragging = false;
    }
  }, [mobileOpen]);

  const closeSheet = useCallback(() => {
    setMobileOpen(false);
    setDragOffset(0);
  }, []);

  // ─── Touch handlers ───────────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragState.current = {
      isDragging: true,
      startY: touch.clientY,
      currentY: touch.clientY,
      lastY: touch.clientY,
      lastTime: Date.now(),
      velocity: 0,
    };
    setIsDragging(true);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragState.current.isDragging) return;

    const touch = e.touches[0];
    const now = Date.now();
    const dt = now - dragState.current.lastTime;

    // Hitung velocity (px/ms)
    if (dt > 0) {
      dragState.current.velocity =
        (touch.clientY - dragState.current.lastY) / dt;
    }

    dragState.current.lastY = touch.clientY;
    dragState.current.lastTime = now;
    dragState.current.currentY = touch.clientY;

    const delta = touch.clientY - dragState.current.startY;

    // Hanya izinkan drag ke bawah (delta positif)
    // Kalau drag ke atas, berikan rubber-band resistance kecil
    if (delta < 0) {
      setDragOffset(delta * 0.1);
    } else {
      setDragOffset(delta);
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!dragState.current.isDragging) return;

    dragState.current.isDragging = false;
    setIsDragging(false);

    const delta = dragState.current.currentY - dragState.current.startY;
    const velocity = dragState.current.velocity;

    // Tutup jika drag cukup jauh ATAU flick cepat ke bawah
    if (delta > DRAG_CLOSE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
      closeSheet();
    } else {
      // Snap kembali ke posisi semula
      setDragOffset(0);
    }
  }, [closeSheet]);

  // ─── Nav click ────────────────────────────────────────────────────
  const handleNavClick = useCallback((href: string, index?: number) => {
    closeSheet();

    // Disable scroll spy temporarily
    isClickScrolling.current = true;
    if (index !== undefined) setActiveIndex(index);

    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1200); // Wait for smooth scroll to finish

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [closeSheet]);

  // Hitung opacity backdrop berdasarkan drag (makin ke bawah makin transparan)
  const backdropOpacity = mobileOpen
    ? Math.max(0, 1 - dragOffset / 300)
    : 0;

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`} id="navbar">
        <div className="navbar__inner">
          <a href="#hero" className="navbar__logo" onClick={() => handleNavClick("#hero")}>
            <img
              src={resolvedTheme === "light" ? "/images/logo2.png" : "/images/logo.png"}
              alt="Rafi Abdillah"
              width={32}
              height={32}
            />
          </a>

          <div className="navbar__links">
            <GooeyNav
              activeIndex={activeIndex}
              items={navItems.map((item) => ({
                label: t(item.key),
                href: item.href,
              }))}
              onItemClick={(e, item, idx) => {
                e.preventDefault();
                handleNavClick(item.href, idx);
              }}
            />
          </div>

          <div className="navbar__actions">
            <div className="navbar__desktop-controls">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — Draggable Bottom Sheet */}
      <div
        className={`mobile-menu ${mobileOpen ? "mobile-menu--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop — opacity ikut drag */}
        <div
          className="mobile-menu__backdrop"
          style={{ opacity: backdropOpacity }}
          onClick={closeSheet}
        />

        {/* Sheet */}
        <div
          ref={sheetRef}
          className={`mobile-menu__sheet ${isDragging ? "mobile-menu__sheet--dragging" : ""}`}
          style={{
            transform: mobileOpen
              ? `translateY(${Math.max(0, dragOffset)}px)`
              : "translateY(100%)",
          }}
        >
          {/* ── Drag Handle Area — zona sentuh untuk drag ── */}
          <div
            ref={handleRef}
            className="mobile-menu__drag-area"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="mobile-menu__handle" />
          </div>

          {/* Header */}
          <div className="mobile-menu__header">
            <div className="mobile-menu__brand">
              <img
                src={resolvedTheme === "light" ? "/images/logo2.png" : "/images/logo.png"}
                alt="Rafi Abdillah"
                width={28}
                height={28}
                className="mobile-menu__brand-logo"
              />
              <span className="mobile-menu__brand-name">Rafi Abdillah</span>
            </div>
            <button
              className="mobile-menu__close"
              onClick={closeSheet}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav Card */}
          <div className="mobile-menu__card">
            {navItems.map((item, i) => (
              <a
                key={item.key}
                href={item.href}
                className="mobile-menu__item"
                style={{ animationDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, navItems.findIndex(n => n.key === item.key));
                }}
              >
                <span className="mobile-menu__item-label">{t(item.key)}</span>
                <ArrowUpRight size={16} className="mobile-menu__item-icon" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="mailto:rabdillahf09@gmail.com"
            className="mobile-menu__cta"
            onClick={closeSheet}
          >
            {t("contact.label") || "Contact"}
          </a>

          {/* Social Card — horizontal */}
          <div className="mobile-menu__social-row">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu__social-btn"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>

          {/* Controls at bottom */}
          <div className="mobile-menu__controls">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
