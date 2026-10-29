import { Quote } from 'lucide-react';
import { useRef } from 'react';
import { profile } from '../../data/profile';
import { gsap } from '../../lib/gsap';
import { revealClip, revealLines, revealUp } from '../../lib/animations';
import { useSectionMotion } from '../../hooks/useSectionMotion';
import { SectionHeader } from '../ui/SectionHeader';

const focusAreas = ['Desenvolvimento de software', 'Engenharia de dados', 'Pipelines de ETL', 'Power BI', 'IA Generativa', 'Python & SQL', 'Infraestrutura de TI'];

export function About() {
  const ref = useRef<HTMLElement>(null);

  useSectionMotion(ref, (root) => {
    revealLines(root.querySelector('.section-header')!);
    revealUp(root.querySelectorAll('.section-header [data-reveal]'), root);
    revealClip(root.querySelector('.about__photo')!, root.querySelector('.about__media')!);
    gsap.from(root.querySelector('.about__photo img'), {
      scale: 1.2,
      duration: 1.6,
      scrollTrigger: { trigger: root.querySelector('.about__media'), start: 'top 78%', once: true },
    });
    revealUp(root.querySelectorAll('.about__text > *'), root.querySelector('.about__text')!);
    revealUp(root.querySelectorAll('.facts__row'), root.querySelector('.facts')!, { x: -16, y: 0, stagger: 0.06 });
    revealUp(root.querySelectorAll('.focus-chips li'), root.querySelector('.focus-chips')!, { y: 12, scale: 0.94, stagger: 0.04 });
    gsap.from(root.querySelector('.about__quote'), {
      rotate: -4,
      y: 40,
      autoAlpha: 0,
      duration: 1.1,
      scrollTrigger: { trigger: root.querySelector('.about__quote'), start: 'top 88%', once: true },
    });
    // Parallax sutil do retrato.
    gsap.to(root.querySelector('.about__frame'), {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
  });

  return (
    <section id="sobre" className="section about" ref={ref} aria-labelledby="sobre-title">
      <SectionHeader index="01" kicker="Sobre mim" title={['Dados são meu meio.', 'Resolver problemas', 'é meu superpoder.']} titleId="sobre-title" highlight={2} />

      <div className="about__grid">
        <div className="about__media">
          <div className="about__frame">
            <div className="about__photo">
              <img src={profile.photo} alt="Retrato de Melquizedeque Corrêa, o Melk" width={880} height={880} loading="lazy" />
            </div>
            <span className="about__stamp" aria-hidden="true">
              Melk<b>C</b>
            </span>
          </div>
          <blockquote className="about__quote tone-lilac">
            <Quote size={22} aria-hidden="true" />
            <p>{profile.motto}</p>
          </blockquote>
        </div>

        <div className="about__text">
          <p className="about__lead">{profile.about}</p>
          <p className="about__summary">{profile.summary}</p>
          <dl className="facts">
            {profile.facts.map((f) => (
              <div key={f.label} className="facts__row">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="focus-chips" aria-label="Áreas de atuação">
            {focusAreas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
