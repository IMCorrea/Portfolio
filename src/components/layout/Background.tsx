import { useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useSectionMotion } from '../../hooks/useSectionMotion';

/** Fundo com grandes formas diagonais, com parallax muito discreto ligado ao scroll. */
export function Background() {
  const ref = useRef<HTMLDivElement>(null);

  useSectionMotion(ref, (root) => {
    const shapes = root.querySelectorAll<HTMLElement>('[data-depth]');
    shapes.forEach((shape) => {
      gsap.to(shape, {
        yPercent: Number(shape.dataset.depth),
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      });
    });
  });

  return (
    <div className="backdrop" ref={ref} aria-hidden="true">
      <div className="backdrop__shape backdrop__shape--sky" data-depth="-6" />
      <div className="backdrop__shape backdrop__shape--peach" data-depth="4" />
      <div className="backdrop__shape backdrop__shape--coral" data-depth="-3" />
      <div className="backdrop__shape backdrop__shape--pink" data-depth="6" />
    </div>
  );
}
