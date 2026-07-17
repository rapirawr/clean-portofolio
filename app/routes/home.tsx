import type { MetaFunction } from "react-router";
import { Navbar } from "~/components/Navbar";
import { Hero } from "~/components/Hero";
import { Statement } from "~/components/Statement";
import { About } from "~/components/About";
import { Experience } from "~/components/Experience";
import { Skills } from "~/components/Skills";
import { Projects } from "~/components/Projects";
import { Credentials } from "~/components/Credentials";
import { StatsWidget } from "~/components/StatsWidget";
import { Contact } from "~/components/Contact";
import { Footer } from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Rafi Abdillah F | Fullstack Developer Portfolio" },
    { name: "description", content: "Portfolio of Rafi Abdillah F, fullstack developer based in Bondowoso, Indonesia. Building modern web, IoT, and custom software systems." },
    { property: "og:title", content: "Rafi Abdillah F | Fullstack Developer Portfolio" },
    { property: "og:description", content: "Portfolio of Rafi Abdillah F, fullstack developer based in Bondowoso, Indonesia. Building modern web, IoT, and custom software systems." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rapirawr.my.id" },
    { property: "og:image", content: "https://rapirawr.my.id/images/favicon.png" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Credentials />
        <StatsWidget />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
