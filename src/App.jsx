import { CodingStats } from "./components/CodingStats.jsx";
import { Contact } from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Intro from "./components/Intro.jsx";
import Navbar from "./components/Navbar.jsx";
import { Projects } from "./components/Projects.jsx";
import Services from "./components/Services.jsx";
import { Skills } from "./components/Skills.jsx";
import Testimonials from "./components/Testimonials.jsx";
import { SmoothScrollProvider } from "./lib/SmoothScroll.jsx";

export default function App() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>
        <Hero />
        <Intro />

        {/* Skills / Projects / Coding Stats render on a light theme,
            matching the reference layout, while the rest of the page
            stays dark. */}
        <div id="work" className="light bg-background text-foreground">
          <Skills />
          <Projects />
          <CodingStats />
        </div>

        <Testimonials />
        <Services />

        <div className="light bg-background text-foreground">
          <Contact />
        </div>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
