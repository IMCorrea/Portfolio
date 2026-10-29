import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/profile';
import { socialLinks } from '../../data/socialLinks';
import { pauseScroll, resumeScroll } from '../../lib/lenis';
import { SocialIcon } from '../ui/SocialIcon';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';

/** Barra compacta + gaveta para telas pequenas. */
export function MobileNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => {
    resumeScroll();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    pauseScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      resumeScroll();
    };
  }, [open]);

  return (
    <div className="mobilebar">
      <div className="mobilebar__inner">
        <Logo onNavigate={close} />
        <motion.button
          ref={toggleRef}
          type="button"
          className="icon-btn mobilebar__toggle"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.94 }}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-drawer"
            className="drawer"
            aria-label="Seções do portfólio"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.22, ease: [0.77, 0, 0.175, 1] } }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
          >
            <NavLinks active={active} layoutId="drawer-active" onNavigate={close} />
            <div className="drawer__foot">
              <a className="drawer__mail" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <ul className="drawer__social">
                {socialLinks
                  .filter((l) => ['whatsapp', 'linkedin', 'github', 'instagram'].includes(l.key))
                  .map((l) => (
                    <li key={l.key}>
                      <a className="icon-btn" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                        <SocialIcon name={l.key} />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
