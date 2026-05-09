import { Navbar } from "~/components/Navbar";
import { Hero } from "~/components/Hero";
import { Statement } from "~/components/Statement";
import { About } from "~/components/About";
import { Experience } from "~/components/Experience";
import { Skills } from "~/components/Skills";
import { Projects } from "~/components/Projects";
import { Credentials } from "~/components/Credentials";
import { Contact } from "~/components/Contact";
import { Footer } from "~/components/Footer";

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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
