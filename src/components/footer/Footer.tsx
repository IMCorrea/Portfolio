import { motion } from 'motion/react';
import { ArrowUp, Eye } from 'lucide-react';
import { useRef } from 'react';
import { sections } from '../../data/navigation';
import { profile } from '../../data/profile';
import { socialLinks } from '../../data/socialLinks';
import { gsap } from '../../lib/gsap';
import { scrollToTop } from '../../lib/lenis';
import { useSectionMotion } from '../../hooks/useSectionMotion';
import { useVisits } from '../../hooks/useVisits';
import { handleAnchorClick } from '../navigation/NavLinks';

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const visits = useVisits();
  const year = new Date().getFullYear();

  useSectionMotion(ref, (root) => {
    // Encerramento: formas deslizam suavemente enquanto o rodapé entra.
    root.querySelectorAll<HTMLElement>('.footer__shape').forEach((shape, i) => {
      gsap.fromTo(
        shape,
        { y: 80 + i * 30, rotate: i % 2 ? 18 : -18 },
        { y: 0, rotate: 0, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: 0.8 } },
      );
    });
    gsap.from(root.querySelectorAll('.footer__word span'), {
      yPercent: 100,
      duration: 1.1,
      stagger: 0.05,
      scrollTrigger: { trigger: root, start: 'top 85%', once: true },
    });
  });

  return (
    <footer className="footer" ref={ref}>
      <span className="footer__shape footer__shape--a" aria-hidden="true" />
      <span className="footer__shape footer__shape--b" aria-hidden="true" />
      <span className="footer__shape footer__shape--c" aria-hidden="true" />

      <div className="footer__top">
        <div className="footer__brand">
          <p className="footer__word" aria-label="MelkC">
            {'MelkC'.split('').map((c, i) => (
              <span key={i} aria-hidden="true" className={c === 'C' ? 'is-accent' : ''}>
                {c}
              </span>
            ))}
          </p>
          <p className="footer__tagline">Dados · BI · IA Generativa</p>
          <a className="footer__mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>

        <nav className="footer__col" aria-label="Navegação do rodapé">
          <h2 className="footer__title">Navegação</h2>
          <ul>
            {sections.slice(1).map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="u-link" onClick={(e) => handleAnchorClick(e, s.id)}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__title">Conectar</h2>
          <ul>
            {socialLinks.map((l) => (
              <li key={l.key}>
                <a
                  href={l.href}
                  className="u-link"
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(l.key === 'resume' ? { download: true } : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {year} {profile.fullName}. Todos os direitos reservados.
        </p>
        {visits !== null && (
          <p className="footer__visits">
            <Eye size={14} aria-hidden="true" /> {visits.toLocaleString('pt-BR')} visitas
          </p>
        )}
        <motion.button type="button" className="to-top" onClick={scrollToTop} whileHover={{ y: -3 }} whileTap={{ scale: 0.94 }}>
          Voltar ao topo <ArrowUp size={16} aria-hidden="true" />
        </motion.button>
      </div>
    </footer>
  );
}
