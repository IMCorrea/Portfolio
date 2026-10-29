import { prefersReducedMotion } from './gsap';

const KEY = 'melkc:intro-seen';

let resolve!: () => void;
/** Resolve quando a intro termina (ou imediatamente, se ela não for exibida). */
export const introDone = new Promise<void>((r) => (resolve = r));

export function shouldPlayIntro() {
  if (prefersReducedMotion()) return false;
  try {
    return sessionStorage.getItem(KEY) !== '1';
  } catch {
    return true;
  }
}

export function finishIntro() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* armazenamento indisponível: a intro apenas volta a aparecer */
  }
  resolve();
}
