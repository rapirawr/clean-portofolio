import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ThemeProvider } from "~/context/ThemeContext";
import { LanguageProvider } from "~/context/LanguageContext";
import { Loader } from "~/components/Loader";
import { GamepadCursor } from "~/components/GamepadCursor";
import { useEffect } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { trackMetricsMiddleware } from "~/middleware/trackMetrics.server";

export const middleware = [trackMetricsMiddleware];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital@1&display=swap",
  },
  { rel: "icon", type: "image/png", href: "/images/favicon.png" },
  { rel: "apple-touch-icon", href: "/images/favicon.png" },
  { rel: "manifest", href: "/manifest.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Rafi Abdillah F | Fullstack Developer</title>
        <meta name="description" content="Portfolio of Rafi Abdillah F. Building modern web, UI/UX, and digital projects." />
        <meta name="theme-color" content="#0a0a0a" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Lenis emit scroll event yang sync — gunakan ini untuk scroll progress
    // agar tidak bentrok antara window.scrollY dan Lenis virtual scroll position
    const progressEl = document.querySelector('.scroll-progress') as HTMLElement | null;

    lenis.on('scroll', ({ progress }: { progress: number }) => {
      if (progressEl) progressEl.style.transform = `scaleX(${progress})`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--active');
          // Stop observing once revealed — tidak perlu terus aktif
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Initial scan
    const scanReveals = () => {
      document.querySelectorAll('.reveal:not(.reveal--observed)').forEach(el => {
        revealObserver.observe(el);
        el.classList.add('reveal--observed');
      });
    };

    scanReveals();
    
    // MutationObserver to catch elements added after mount (like Footer)
    const mutationObserver = new MutationObserver(() => {
      scanReveals();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const location = useLocation();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="scroll-progress" />
        <Loader />
        <GamepadCursor />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main style={{ padding: "4rem 2rem", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>{message}</h1>
      <p style={{ opacity: 0.7 }}>{details}</p>
      {stack && (
        <pre style={{ marginTop: "2rem", textAlign: "left", overflow: "auto", fontSize: "0.8rem" }}>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
