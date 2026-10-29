import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { certificates } from '../../data/certificates';
import { Modal } from '../ui/Modal';

interface Props {
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}

/** Ampliação acessível: Escape fecha, ←/→ navegam, foco preso no modal. */
export function CertificateLightbox({ index, onClose, onChange }: Props) {
  const cert = index !== null ? certificates[index] : null;
  const total = certificates.length;
  const go = (delta: number) => index !== null && onChange((index + delta + total) % total);

  return (
    <Modal
      open={index !== null}
      onClose={onClose}
      labelledBy="cert-lightbox-title"
      className="lightbox"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      {cert && (
        <>
          <div className="lightbox__stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={cert.id}
                src={cert.src}
                alt={`${cert.title} — ${cert.issuer}, ${cert.year}`}
                width={cert.width}
                height={cert.height}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              />
            </AnimatePresence>
          </div>
          <div className="lightbox__bar">
            <div>
              <h3 id="cert-lightbox-title" className="lightbox__title">
                {cert.title}
              </h3>
              <p className="lightbox__meta">
                {cert.issuer} · {cert.year} · {index! + 1}/{total}
              </p>
            </div>
            <div className="certs__arrows">
              <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Certificado anterior">
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Próximo certificado">
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
