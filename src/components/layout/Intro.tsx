import { Code } from 'lucide-react';
import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { finishIntro, shouldPlayIntro } from '../../lib/intro';
import { pauseScroll, resumeScroll } from '../../lib/lenis';

/**
 * Entrada breve (~1,3s): monograma, formas geométricas e indicador de
 * carregamento. Exibida uma vez por sessão e nunca com movimento reduzido.
 */
export function Intro() {
  const [visible] = useState(shouldPlayIntro);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!visible) {
        finishIntro();
        return;
      }
      pauseScroll();
      const counter = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: () => {
          resumeScroll();
          setDone(true);
        },
      });

      tl.from('.intro__shape', { scale: 0.6, autoAlpha: 0, rotate: -20, duration: 0.6, stagger: 0.05 })
        .from('.intro__mark', { yPercent: 40, autoAlpha: 0, duration: 0.55 }, 0.05)
        .from('.intro__letter', { yPercent: 110, duration: 0.6, stagger: 0.035 }, 0.12)
        .to(
          counter,
          {
            v: 100,
            duration: 0.85,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0.1,
        )
        .to('.intro__bar i', { scaleX: 1, duration: 0.85, ease: 'power2.inOut' }, 0.1)
        // A interface começa a aparecer enquanto o painel sai.
        .add(() => finishIntro(), 0.95)
        .to('.intro__content', { yPercent: -30, autoAlpha: 0, duration: 0.4, ease: 'power3.in' }, 0.95)
        .to(ref.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'expo.inOut' }, 1.0);

      return () => resumeScroll();
    },
    { scope: ref },
  );

  if (!visible || done) return null;

  return (
    <div className="intro" ref={ref} role="status" aria-label="Carregando portfólio">
      <div className="intro__content">
        <div className="intro__shapes" aria-hidden="true">
          <span className="intro__shape intro__shape--yellow" />
          <span className="intro__shape intro__shape--pink" />
          <span className="intro__shape intro__shape--mint" />
          <span className="intro__shape intro__shape--sky" />
        </div>
        <div className="intro__brand" aria-hidden="true">
          <span className="intro__mark">
            <Code size={28} strokeWidth={2.5} />
          </span>
          <span className="intro__word">
            {'MelkC'.split('').map((c, i) => (
              <span className="intro__mask" key={i}>
                <span className={`intro__letter ${c === 'C' ? 'is-accent' : ''}`}>{c}</span>
              </span>
            ))}
          </span>
        </div>
        <div className="intro__meta" aria-hidden="true">
          <span>dados · bi · ia generativa</span>
          <span>
            <span ref={countRef}>000</span>%
          </span>
        </div>
        <div className="intro__bar" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  );
}
