import { MotionConfig } from 'motion/react';
import { useEffect } from 'react';
import { About } from './components/about/About';
import { Certificates } from './components/certificates/Certificates';
import { Contact } from './components/contact/Contact';
import { Experience } from './components/experience/Experience';
import { Footer } from './components/footer/Footer';
import { Hero } from './components/hero/Hero';
import { Background } from './components/layout/Background';
import { Cursor } from './components/layout/Cursor';
import { Intro } from './components/layout/Intro';
import { MobileNav } from './components/navigation/MobileNav';
import { Sidebar } from './components/navigation/Sidebar';
import { Topbar } from './components/navigation/Topbar';
import { Projects } from './components/projects/Projects';
import { Skills } from './components/skills/Skills';
import { sections } from './data/navigation';
import { useActiveSection } from './hooks/useActiveSection';
import { ScrollTrigger } from './lib/gsap';
import { introDone } from './lib/intro';
import { navigateTo } from './lib/lenis';

const sectionIds = sections.map((s) => s.id);

export default function App() {
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    // Respeita um #hash inicial e os botões voltar/avançar do navegador.
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (id && document.getElementById(id)) navigateTo(id, { push: false });
    };
    introDone.then(fromHash);
    window.addEventListener('popstate', fromHash);

    // Recalcula gatilhos depois que fontes e imagens alteram o layout.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('popstate', fromHash);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Intro />
      <Background />
      <Cursor />
      <MobileNav active={active} />

      <div className="shell">
        <Sidebar active={active} />
        <div className="shell__main">
          <Topbar />
          <main id="conteudo" tabIndex={-1}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certificates />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}
