import { gsap } from './gsap';

type Targets = gsap.TweenTarget;

/** Propriedades limpas ao fim das entradas, devolvendo o controle ao CSS (hover, estados). */
const CLEAR = 'transform,translate,rotate,scale,opacity,visibility';

interface EnterVars extends gsap.TweenVars {
  x?: number;
  y?: number;
  scale?: number;
  start?: string;
}

/**
 * Entrada acionada pelo scroll. Usa fromTo com valores finais explícitos
 * (não depende do estilo computado no momento da criação) e limpa as
 * propriedades ao terminar.
 */
export function revealUp(targets: Targets, trigger: Element, vars: EnterVars = {}) {
  const { x = 0, y = 28, scale = 1, start = 'top 80%', ...timing } = vars;
  gsap.fromTo(
    targets,
    { x, y, scale, autoAlpha: 0 },
    {
      x: 0,
      y: 0,
      scale: 1,
      autoAlpha: 1,
      duration: 0.9,
      stagger: 0.07,
      clearProps: CLEAR,
      scrollTrigger: { trigger, start, once: true },
      ...timing,
    },
  );
}

/** Revela títulos marcados com .line > .line__inner, linha por linha. */
export function revealLines(scope: Element, trigger: Element = scope) {
  const lines = scope.querySelectorAll('.line__inner');
  if (!lines.length) return;
  gsap.fromTo(
    lines,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 1.05,
      stagger: 0.08,
      clearProps: 'transform',
      scrollTrigger: { trigger, start: 'top 82%', once: true },
    },
  );
}

/** Revelação de imagem por clip-path (de baixo para cima). */
export function revealClip(targets: Targets, trigger: Element, vars: gsap.TweenVars = {}) {
  gsap.fromTo(
    targets,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: 'expo.inOut',
      clearProps: 'clipPath',
      scrollTrigger: { trigger, start: 'top 78%', once: true },
      ...vars,
    },
  );
}
