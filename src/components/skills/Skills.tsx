import { BrainCircuit, ChartColumn, Database, Server, Sigma, Terminal } from 'lucide-react';
import { useRef } from 'react';
import { dataPipeline, skillAreas, skillGroups, type SkillIcon } from '../../data/skills';
import { gsap } from '../../lib/gsap';
import { revealLines, revealUp } from '../../lib/animations';
import { useSectionMotion } from '../../hooks/useSectionMotion';
import { SectionHeader } from '../ui/SectionHeader';

const icons = {
  chart: ChartColumn,
  sigma: Sigma,
  brain: BrainCircuit,
  database: Database,
  server: Server,
  terminal: Terminal,
} satisfies Record<SkillIcon, unknown>;

export function Skills() {
  const ref = useRef<HTMLElement>(null);

  useSectionMotion(ref, (root) => {
    revealLines(root.querySelector('.section-header')!);
    revealUp(root.querySelectorAll('.section-header [data-reveal]'), root);
    revealUp(root.querySelectorAll('.area-card-wrap'), root.querySelector('.areas')!, { y: 40, stagger: 0.08 });

    // Pipeline: a linha se desenha e as etapas acendem em sequência.
    const pipe = root.querySelector('.pipeline')!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: pipe, start: 'top 80%', once: true } });
    tl.from(pipe.querySelector('.pipeline__rail i'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'power2.inOut' }).from(
      pipe.querySelectorAll('.pipeline__step'),
      { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.16 },
      0.1,
    );

    revealUp(root.querySelectorAll('.tool-group'), root.querySelector('.toolbox')!, { stagger: 0.1 });
    revealUp(root.querySelectorAll('.tool-chip'), root.querySelector('.toolbox')!, { y: 10, scale: 0.92, stagger: 0.02, delay: 0.2 });
  });

  return (
    <section id="habilidades" className="section skills" ref={ref} aria-labelledby="habilidades-title">
      <SectionHeader index="02" kicker="Minhas habilidades" title={['Técnica', 'com propósito.']} titleId="habilidades-title" highlight={1}>
        <p>Combino análise de dados e infraestrutura para entregar soluções confiáveis, rápidas e prontas para crescer.</p>
      </SectionHeader>

      <ul className="areas">
        {skillAreas.map((area, i) => {
          const Icon = icons[area.icon];
          return (
            <li key={area.title} className="area-card-wrap">
              <article className={`area-card tone-${area.tone}`}>
                <span className="area-card__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="area-card__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="area-card__title">{area.title}</h3>
                <p className="area-card__level">{area.level}</p>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="pipeline" role="group" aria-labelledby="pipeline-title">
        <p className="pipeline__title" id="pipeline-title">
          <span className="kicker__index">→</span> Do dado à decisão
        </p>
        <div className="pipeline__rail" aria-hidden="true">
          <i />
        </div>
        <ol className="pipeline__steps">
          {dataPipeline.map((p, i) => (
            <li key={p.step} className="pipeline__step">
              <span className="pipeline__node" aria-hidden="true">
                {i + 1}
              </span>
              <b>{p.step}</b>
              <span>{p.detail}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="toolbox">
        {skillGroups.map((g) => (
          <div key={g.title} className="tool-group">
            <h3 className="tool-group__title">{g.title}</h3>
            <ul className="tool-group__list">
              {g.items.map((item) => (
                <li key={item} className="tool-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
