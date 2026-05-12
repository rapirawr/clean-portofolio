import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ThemeProvider } from "~/context/ThemeContext";
import { LanguageProvider } from "~/context/LanguageContext";
import { Loader } from "~/components/Loader";
import { useEffect } from "react";
import Lenis from "lenis";

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
        <title>Rafi Abdillah F — Fullstack Developer</title>
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global Scroll Progress & Reveal Observer
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const progress = document.querySelector('.scroll-progress') as HTMLElement;
      if (progress) progress.style.transform = `scaleX(${scrollPercent / 100})`;
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--active');
        }
      });
    }, { threshold: 0.1 });

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
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="scroll-progress" />
        <Loader />
        <Outlet />
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
