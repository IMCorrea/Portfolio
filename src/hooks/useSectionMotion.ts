import type { RefObject } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap';

/**
 * Executa animações GSAP com escopo no componente, apenas quando o usuário
 * não prefere movimento reduzido. Tudo é revertido no desmontar
 * (compatível com React Strict Mode).
 */
export function useSectionMotion<T extends HTMLElement>(
  scope: RefObject<T>,
  setup: (root: T) => void | (() => void),
  dependencies: unknown[] = [],
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => setup(root));
      return () => mm.revert();
    },
    { scope, dependencies },
  );
}
