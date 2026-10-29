import { Briefcase, GraduationCap } from 'lucide-react';
import { useRef } from 'react';
import { experience } from '../../data/experience';
import { gsap } from '../../lib/gsap';
import { revealLines, revealUp } from '../../lib/animations';
import { useSectionMotion } from '../../hooks/useSectionMotion';
import { SectionHeader } from '../ui/SectionHeader';

export function Experience() {
  const ref = useRef<HTMLElement>(null);

  useSectionMotion(ref, (root) => {
    revealLines(root.querySelector('.section-header')!);
    revealUp(root.querySelectorAll('.section-header [data-reveal]'), root);

    const list = root.querySelector('.timeline')!;
    // A linha da trajetória acompanha o progresso da rolagem.
    gsap.fromTo(
      list.querySelector('.timeline__progress'),
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 } },
    );

    list.querySelectorAll<HTMLElement>('.timeline__item').forEach((item) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 82%', once: true } });
      tl.from(item.querySelector('.timeline__marker'), { scale: 0.4, rotate: 45, autoAlpha: 0, duration: 0.6 })
        .from(item.querySelector('.timeline__period'), { x: -20, autoAlpha: 0, duration: 0.7 }, 0.05)
        .fromTo(item.querySelector('.timeline__body'), { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.9, clearProps: 'transform,opacity,visibility' }, 0.1);
    });
  });

  return (
    <section id="trajetoria" className="section experience" ref={ref} aria-labelledby="trajetoria-title">
      <SectionHeader index="04" kicker="Trajetória" title={['A jornada', 'que me formou.']} titleId="trajetoria-title" highlight={1}>
        <p>Da infraestrutura de TI à análise de dados e ao desenvolvimento — cada etapa somou uma camada à forma como resolvo problemas.</p>
      </SectionHeader>

      <div className="timeline">
        <span className="timeline__line" aria-hidden="true">
          <i className="timeline__progress" />
        </span>
        <ol className="timeline__list">
        {experience.map((item) => {
          const Icon = item.kind === 'Formação' ? GraduationCap : Briefcase;
          return (
            <li key={`${item.period}-${item.org}`} className={`timeline__item ${item.current ? 'is-current' : ''}`}>
              <span className="timeline__marker" aria-hidden="true" />
              <p className="timeline__period">
                <time>{item.period}</time>
                {item.current && <span className="timeline__now">Atual</span>}
              </p>
              <div className="timeline__body">
              <article className={`timeline__card tone-${item.tone}`}>
                <header className="timeline__head">
                  <span className="timeline__icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="timeline__role">{item.role}</h3>
                    <p className="timeline__org">{item.org}</p>
                  </div>
                  <span className="timeline__kind">{item.kind}</span>
                </header>
                <p className="timeline__desc">{item.description}</p>
              </article>
              </div>
            </li>
          );
        })}
        </ol>
      </div>
    </section>
  );
}
