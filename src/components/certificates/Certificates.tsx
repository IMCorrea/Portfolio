import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { certificates } from '../../data/certificates';
import { revealLines, revealUp } from '../../lib/animations';
import { prefersReducedMotion } from '../../lib/gsap';
import { useSectionMotion } from '../../hooks/useSectionMotion';
import { SectionHeader } from '../ui/SectionHeader';
import { CertificateLightbox } from './CertificateLightbox';

/**
 * Galeria horizontal: rolagem nativa com scroll-snap (toque), arraste com
 * mouse, setas, indicadores e teclado. Clique abre o certificado ampliado.
 */
export function Certificates() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const slides = () => [...(trackRef.current?.querySelectorAll<HTMLElement>('.cert-slide') ?? [])];

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const target = slides()[Math.max(0, Math.min(index, certificates.length - 1))];
    if (!track || !target) return;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  // Slide ativo = o mais próximo da borda esquerda visível.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = slides();
        const distances = items.map((s) => Math.abs(s.offsetLeft - track.offsetLeft - track.scrollLeft));
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        setActive(atEnd ? items.length - 1 : distances.indexOf(Math.min(...distances)));
      });
    };
    track.addEventListener('scroll', update, { passive: true });
    return () => {
      track.removeEventListener('scroll', update);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Arraste com mouse (o toque usa a rolagem nativa).
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const track = trackRef.current!;
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: track.scrollLeft };
  };
  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.down || !track) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      track.classList.add('is-dragging');
      track.setPointerCapture(e.pointerId);
    }
    if (d.moved) track.scrollLeft = d.startLeft - dx;
  };
  const endDrag = (e: PointerEvent) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.down || !track) return;
    d.down = false;
    if (d.moved) {
      track.classList.remove('is-dragging');
      if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
      const dx = e.clientX - d.startX;
      goTo(active + (Math.abs(dx) > 60 ? (dx < 0 ? 1 : -1) : 0));
      // Libera o clique depois que o evento de clique do arraste for ignorado.
      setTimeout(() => (d.moved = false), 0);
    }
  };

  useSectionMotion(ref, (root) => {
    revealLines(root.querySelector('.section-header')!);
    revealUp(root.querySelectorAll('.section-header [data-reveal]'), root);
    revealUp(root.querySelectorAll('.cert-slide > *'), root.querySelector('.certs')!, { x: 120, y: 0, duration: 1.1, stagger: 0.06 });
    revealUp(root.querySelector('.certs__controls'), root.querySelector('.certs')!, { delay: 0.4 });
  });

  return (
    <section id="certificados" className="section certificates" ref={ref} aria-labelledby="certificados-title">
      <SectionHeader index="05" kicker="Diploma & certificados" title={['Aprender é', 'um hábito diário.']} titleId="certificados-title" highlight={1}>
        <p>Arraste ou use as setas. Clique em um certificado para vê-lo em tamanho real.</p>
      </SectionHeader>

      <div className="certs" role="region" aria-roledescription="carrossel" aria-label="Diploma e certificados">
        <div
          className="certs__track"
          ref={trackRef}
          tabIndex={0}
          aria-label="Lista de certificados — use as setas do teclado para navegar"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              goTo(active + 1);
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault();
              goTo(active - 1);
            }
          }}
        >
          {certificates.map((c, i) => (
            <figure key={c.id} className={`cert-slide ${i === active ? 'is-active' : ''}`} aria-roledescription="slide" aria-label={`${i + 1} de ${certificates.length}: ${c.title}`}>
              <button
                type="button"
                className={`cert-card tone-${c.tone}`}
                onClick={() => !drag.current.moved && setOpen(i)}
                aria-haspopup="dialog"
                data-cursor="Ampliar"
              >
                <span className="cert-card__img">
                  <img src={c.src} alt={`${c.title} — ${c.issuer}, ${c.year}`} width={c.width} height={c.height} loading="lazy" decoding="async" draggable={false} />
                  <span className="cert-card__zoom" aria-hidden="true">
                    <ZoomIn size={18} /> Ampliar
                  </span>
                </span>
              </button>
              <figcaption className="cert-card__caption">
                <span className="cert-card__badge" aria-hidden="true">
                  {c.initials}
                </span>
                <span>
                  <b>{c.title}</b>
                  <small>
                    {c.issuer} · {c.year}
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="certs__controls">
          <p className="certs__counter" aria-live="polite">
            <b>{String(active + 1).padStart(2, '0')}</b> / {String(certificates.length).padStart(2, '0')}
          </p>
          <div className="certs__dots">
            {certificates.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`certs__dot ${i === active ? 'is-active' : ''}`}
                aria-label={`Ir para ${c.title}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => goTo(i)}
              >
                {i === active && <motion.span layoutId="cert-dot" className="certs__dot-fill" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
              </button>
            ))}
          </div>
          <div className="certs__arrows">
            <motion.button type="button" className="icon-btn" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Certificado anterior" whileTap={{ scale: 0.92 }}>
              <ArrowLeft size={18} aria-hidden="true" />
            </motion.button>
            <motion.button
              type="button"
              className="icon-btn"
              onClick={() => goTo(active + 1)}
              disabled={active === certificates.length - 1}
              aria-label="Próximo certificado"
              whileTap={{ scale: 0.92 }}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>

      <CertificateLightbox index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}
