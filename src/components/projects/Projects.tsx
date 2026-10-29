import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { projects, type Project, type ProjectCategory } from '../../data/projects';
import { githubRepos } from '../../data/socialLinks';
import { Flip, gsap, prefersReducedMotion, ScrollTrigger } from '../../lib/gsap';
import { revealLines, revealUp } from '../../lib/animations';
import { useSectionMotion } from '../../hooks/useSectionMotion';
import { PROJECT_FOCUS_EVENT } from '../navigation/Search';
import { BrandIcon } from '../ui/BrandIcon';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

type Filter = 'all' | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'pessoal', label: 'Pessoais' },
  { id: 'corp', label: 'Corporativos' },
];

const visibleFor = (f: Filter) => (f === 'all' ? projects : projects.filter((p) => p.category === f));
const countFor = (f: Filter) => visibleFor(f).length;

/** O cartão do GitHub ocupa as células que sobram na última linha da grade. */
function ctaSpan(f: Filter) {
  const used = visibleFor(f).reduce((n, p) => n + (p.wide ? 2 : 1), 0);
  return { '--span-lg': 3 - (used % 3), '--span-md': 2 - (used % 2) } as CSSProperties;
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const changeFilter = useCallback(
    (next: Filter) => {
      if (next === filter) return;
      const cells = gridRef.current?.querySelectorAll('.project-cell');
      if (cells && !prefersReducedMotion()) flipState.current = Flip.getState(cells);
      setFilter(next);
    },
    [filter],
  );

  // Transição real de layout ao filtrar: GSAP Flip anima as células.
  useLayoutEffect(() => {
    const state = flipState.current;
    // A grade mudou de altura: gatilhos de entrada precisam das novas posições.
    if (!state || !gridRef.current) {
      ScrollTrigger.refresh();
      return;
    }
    flipState.current = null;
    const flip = Flip.from(state, {
      onComplete: () => ScrollTrigger.refresh(),
      targets: gridRef.current.querySelectorAll('.project-cell'),
      duration: 0.75,
      ease: 'expo.inOut',
      absolute: true,
      scale: false,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.5, delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.94, duration: 0.3, ease: 'power2.in' }),
    });
    return () => {
      flip.progress(1).kill();
    };
  }, [filter]);

  // Busca → projeto: mostra todos e destaca o cartão encontrado.
  useEffect(() => {
    const onFocus = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      changeFilter('all');
      setFlash(id);
    };
    window.addEventListener(PROJECT_FOCUS_EVENT, onFocus);
    return () => window.removeEventListener(PROJECT_FOCUS_EVENT, onFocus);
  }, [changeFilter]);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 2200);
    return () => clearTimeout(t);
  }, [flash]);

  useSectionMotion(ref, (root) => {
    revealLines(root.querySelector('.section-header')!);
    revealUp(root.querySelectorAll('.section-header [data-reveal]'), root);
    revealUp(root.querySelector('.projects__bar'), root.querySelector('.projects__bar')!);
    gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.pcard-enter')).forEach((el, i) => {
      gsap.from(el, {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    });
  });

  const closeModal = useCallback(() => setSelected(null), []);
  const visibleCount = countFor(filter);

  return (
    <section id="projetos" className="section projects" ref={ref} aria-labelledby="projetos-title">
      <SectionHeader
        index="03"
        kicker="Projetos em destaque"
        title={['Soluções digitais', 'que geram impacto.']}
        titleId="projetos-title"
        highlight={1}
        aside={
          <Button href={githubRepos} external variant="secondary" icon={<ArrowUpRight size={18} aria-hidden="true" />}>
            Ver todos no GitHub
          </Button>
        }
      >
        <p>Cada projeto é uma história de curiosidade, aprendizado e atenção aos detalhes — dos dashboards às interfaces web.</p>
      </SectionHeader>

      <div className="projects__bar">
        <div className="filters" role="group" aria-label="Filtrar projetos">
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button key={f.id} type="button" className={`filter ${active ? 'is-active' : ''}`} aria-pressed={active} onClick={() => changeFilter(f.id)}>
                {active && <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 480, damping: 38 }} />}
                <span className="filter__label">{f.label}</span>
                <span className="filter__count">{String(countFor(f.id)).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>
        <p className="projects__count" aria-live="polite">
          <b>{String(visibleCount).padStart(2, '0')}</b> / {String(projects.length).padStart(2, '0')} projetos
        </p>
      </div>

      <ul className="project-grid" ref={gridRef}>
        {projects.map((p) => {
          const hidden = filter !== 'all' && p.category !== filter;
          return (
            <li
              key={p.id}
              className={`project-cell ${p.wide ? 'is-wide' : ''} ${hidden ? 'is-hidden' : ''} ${flash === p.id ? 'is-flash' : ''}`}
              data-flip-id={p.id}
              aria-hidden={hidden || undefined}
            >
              <div className="pcard-enter">
                <ProjectCard project={p} onOpen={setSelected} />
              </div>
            </li>
          );
        })}
        <li className="project-cell project-cell--cta" data-flip-id="cta" style={ctaSpan(filter)}>
          <div className="pcard-enter">
            <a className="pcard pcard--cta tone-yellow" href={githubRepos} target="_blank" rel="noopener noreferrer" data-cursor="GitHub ↗">
              <span className="pcard--cta__icon" aria-hidden="true">
                <BrandIcon name="github" size={30} />
              </span>
              <span className="pcard--cta__text">
                <b>Mais no GitHub</b>
                <span>Repositórios públicos e experimentos.</span>
              </span>
              <span className="pcard__arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </li>
      </ul>

      <ProjectModal project={selected} onClose={closeModal} />
    </section>
  );
}
