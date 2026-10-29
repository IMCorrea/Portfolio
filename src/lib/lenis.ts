import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis: Lenis | null = null;

/**
 * Inicia o Lenis usando o ticker do GSAP como único loop de frames
 * (sem requestAnimationFrame próprio). Toque continua com rolagem nativa.
 * Com movimento reduzido, a rolagem nativa é mantida.
 */
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {};

  const instance = new Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 1 });
  lenis = instance;

  instance.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}

export const pauseScroll = () => {
  lenis?.stop();
  document.documentElement.classList.add('is-locked');
};

/** Idempotente: start() do Lenis reinicia o estado e cancelaria uma rolagem em andamento. */
export const resumeScroll = () => {
  if (lenis?.isStopped) lenis.start();
  document.documentElement.classList.remove('is-locked');
};

/** Distância a compensar no topo (barra fixa do mobile), lida do scroll-margin-top da seção. */
const topOffset = (el: HTMLElement) => parseFloat(getComputedStyle(el).scrollMarginTop) || 0;

export function scrollToElement(el: HTMLElement, onDone?: () => void) {
  const offset = -topOffset(el);
  if (lenis) {
    // force: a navegação pode partir do menu mobile enquanto a rolagem ainda está pausada.
    lenis.scrollTo(el, { offset, duration: 1.15, force: true, onComplete: onDone });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  onDone?.();
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/**
 * Navega até uma seção preservando o comportamento esperado:
 * atualiza o histórico (#hash) e move o foco para a seção, sem salto extra.
 */
export function navigateTo(id: string, { push = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  if (push && location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
  scrollToElement(el, () => {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });
}
