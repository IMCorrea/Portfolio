import { ArrowDown, ArrowRight, FileDown, Mail } from 'lucide-react';
import { useRef } from 'react';
import { profile } from '../../data/profile';
import { linkByKey } from '../../data/socialLinks';
import { experience } from '../../data/experience';
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap';
import { introDone } from '../../lib/intro';
import { handleAnchorClick } from '../navigation/NavLinks';
import { Button } from '../ui/Button';
import { SocialIcon } from '../ui/SocialIcon';
import { SplitTitle } from '../ui/SplitTitle';
import { InfraWidget } from './InfraWidget';
import { SalesWidget } from './SalesWidget';

const floatingTags = ['Power BI', 'SQL', 'Python', 'LLMs', 'ETL', 'DAX'];
const current = experience.find((e) => e.current)!;

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const chrome = [document.querySelector('[data-anim="sidebar"]'), document.querySelector('[data-anim="topbar"]')].filter(Boolean);
        const counters = q('[data-count]') as HTMLElement[];

        const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
        tl.from(q('.hero__deco'), { scale: 0.7, autoAlpha: 0, rotate: -12, duration: 0.9, stagger: 0.06 })
          .from(chrome, { autoAlpha: 0, x: -16, duration: 0.7, stagger: 0.08 }, 0.05)
          .from(q('[data-hero="role"]'), { autoAlpha: 0, y: 12, duration: 0.6 }, 0.15)
          .from(q('.hero__title .line__inner'), { yPercent: 110, duration: 1.1, stagger: 0.09 }, 0.2)
          .fromTo(
            q('[data-hero="clip"]'),
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' },
            0.3,
          )
          .from(q('[data-hero="clip"] img'), { scale: 1.25, duration: 1.6 }, 0.3)
          .from(q('[data-hero="fade"]'), { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.55)
          .from(q('[data-hero="tag"]'), { autoAlpha: 0, scale: 0.85, y: 10, duration: 0.6, stagger: 0.06 }, 0.75)
          .from(q('[data-hero="cta"]'), { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.08 }, 0.7)
          .from(q('[data-hero="widget"]'), { autoAlpha: 0, y: 36, duration: 0.9, stagger: 0.1 }, 0.85)
          .fromTo(q('[data-hero="line"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, 1.05)
          .from(q('[data-hero="area"]'), { autoAlpha: 0, duration: 0.8 }, 1.5)
          .from(q('[data-hero="bar"]'), { scaleY: 0, transformOrigin: 'bottom', duration: 0.7, stagger: 0.04 }, 1.1)
          .from(q('[data-hero="tick"]'), { scaleY: 0.2, autoAlpha: 0, duration: 0.4, stagger: 0.015 }, 1.1);

        counters.forEach((el) => {
          const end = Number(el.dataset.count);
          const obj = { v: 0 };
          tl.to(obj, { v: end, duration: 1.2, ease: 'power2.out', onUpdate: () => (el.textContent = String(Math.round(obj.v))) }, 1.0);
        });

        let cancelled = false;
        introDone.then(() => {
          if (!cancelled) tl.play();
        });
        return () => {
          cancelled = true;
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section id="inicio" className="section hero" ref={ref} aria-labelledby="hero-title">
      <span className="hero__deco hero__deco--a" aria-hidden="true" />
      <span className="hero__deco hero__deco--b" aria-hidden="true" />
      <span className="hero__deco hero__deco--c" aria-hidden="true" />

      <div className="hero__grid">
        <div className="hero__intro">
          <p className="hero__role" data-hero="role">
            <span className="hero__role-mark" aria-hidden="true">
              &lt;/&gt;
            </span>
            {profile.role}
          </p>
          <SplitTitle as="h1" id="hero-title" lines={profile.headlineLines} highlight={1} className="hero__title" />
          <p className="hero__lead" data-hero="fade">
            {profile.lead}
          </p>
          <div className="hero__ctas">
            <span data-hero="cta">
              <Button
                href="#projetos"
                onClick={(e) => handleAnchorClick(e, 'projetos')}
                icon={<ArrowRight size={18} aria-hidden="true" />}
              >
                Ver meus projetos
              </Button>
            </span>
            <span data-hero="cta">
              <Button href={profile.resume} download variant="secondary" icon={<FileDown size={18} aria-hidden="true" />}>
                Baixar currículo
              </Button>
            </span>
          </div>
          <p className="hero__available" data-hero="fade">
            <span className="status-dot" aria-hidden="true" />
            {profile.available}
          </p>
        </div>

        <figure className="hero__portrait">
          <div className="portrait-card">
            <div className="portrait-card__frame" data-hero="clip">
              <img src={profile.photo} alt="Retrato de Melk Corrêa" width={880} height={880} />
            </div>
            <figcaption className="portrait-card__caption">
              <div>
                <p className="portrait-card__name">{profile.name}</p>
                <a className="portrait-card__mail" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </div>
              <ul className="portrait-card__social">
                {(['linkedin', 'github', 'instagram'] as const).map((key) => {
                  const l = linkByKey(key);
                  return (
                    <li key={key}>
                      <a className="icon-btn icon-btn--sm" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                        <SocialIcon name={key} size={15} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </figcaption>
          </div>
          <ul className="float-tags" aria-label="Principais tecnologias">
            {floatingTags.map((t, i) => (
              <li key={t} className={`float-tag float-tag--${i}`} data-hero="tag">
                {t}
              </li>
            ))}
          </ul>
        </figure>

        <div className="hero__widgets">
          <SalesWidget />
          <InfraWidget />
          <article className="widget widget--now tone-yellow" data-hero="widget" aria-label="Resumo profissional">
            <p className="widget__label">Agora</p>
            <p className="now__role">{current.role}</p>
            <p className="now__org">@ {current.org}</p>
            <ul className="now__stats">
              {profile.stats.map((s) => (
                <li key={s.label}>
                  <b>
                    <span data-count={s.value}>{s.value}</span>
                    {s.suffix}
                  </b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
            <a className="now__link" href={`mailto:${profile.email}`}>
              <Mail size={15} aria-hidden="true" /> Falar comigo
            </a>
          </article>
        </div>
      </div>

      <a className="scroll-cue" href="#sobre" onClick={(e) => handleAnchorClick(e, 'sobre')} data-hero="fade">
        <ArrowDown size={16} aria-hidden="true" /> Role para explorar
      </a>
    </section>
  );
}
