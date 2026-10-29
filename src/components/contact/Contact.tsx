import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useRef, useState } from 'react';
import { profile } from '../../data/profile';
import { linkByKey, socialLinks } from '../../data/socialLinks';
import { gsap } from '../../lib/gsap';
import { revealLines, revealUp } from '../../lib/animations';
import { useSectionMotion } from '../../hooks/useSectionMotion';
import { BrandIcon } from '../ui/BrandIcon';
import { Button } from '../ui/Button';
import { SocialIcon } from '../ui/SocialIcon';
import { SplitTitle } from '../ui/SplitTitle';

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const whatsapp = linkByKey('whatsapp');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  useSectionMotion(ref, (root) => {
    const card = root.querySelector('.contact__card')!;
    gsap.from(card, { y: 60, autoAlpha: 0, duration: 1.1, scrollTrigger: { trigger: root, start: 'top 80%', once: true } });
    revealLines(card, root);
    revealUp(root.querySelectorAll('.contact__card [data-reveal]'), root, { delay: 0.3 });
    gsap.from(root.querySelectorAll('.contact__shape'), {
      scale: 0.6,
      rotate: -25,
      autoAlpha: 0,
      duration: 1.2,
      stagger: 0.1,
      scrollTrigger: { trigger: root, start: 'top 75%', once: true },
    });
    revealUp(root.querySelectorAll('.link-tile-wrap'), root.querySelector('.contact__links')!, { stagger: 0.06 });
  });

  return (
    <section id="contato" className="section contact" ref={ref} aria-labelledby="contato-title">
      <div className="contact__grid">
        <div className="contact__card tone-yellow">
          <span className="contact__shape contact__shape--a" aria-hidden="true" />
          <span className="contact__shape contact__shape--b" aria-hidden="true" />
          <span className="contact__shape contact__shape--c" aria-hidden="true" />

          <p className="kicker" data-reveal>
            <span className="kicker__index">06</span>
            <span className="kicker__rule" aria-hidden="true" />
            Vamos trabalhar juntos
          </p>
          <SplitTitle lines={['Tem um projeto', 'em mente?']} id="contato-title" className="contact__title" />
          <p className="contact__text" data-reveal>
            Estou sempre aberto a conversar sobre novos projetos, ideias ou oportunidades de fazer parte da sua equipe.
          </p>

          <div className="contact__email" data-reveal>
            <a href={`mailto:${profile.email}`} className="contact__email-link">
              {profile.email}
            </a>
            <motion.button type="button" className="icon-btn" onClick={copyEmail} aria-label="Copiar e-mail" whileTap={{ scale: 0.92 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'ok' : 'copy'}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.14 }}
                  style={{ display: 'grid' }}
                >
                  {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'E-mail copiado' : ''}
            </span>
          </div>

          <div className="contact__ctas" data-reveal>
            <Button href={`mailto:${profile.email}`} icon={<Mail size={18} aria-hidden="true" />}>
              Enviar e-mail
            </Button>
            <Button href={whatsapp.href} external variant="secondary" icon={<BrandIcon name="whatsapp" size={18} />}>
              Vamos conversar
            </Button>
          </div>
        </div>

        <ul className="contact__links" aria-label="Links profissionais">
          {socialLinks.map((l) => (
            <li key={l.key} className="link-tile-wrap">
              <a
                className={`link-tile link-tile--${l.key}`}
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...(l.key === 'resume' ? { download: true } : {})}
              >
                <span className="link-tile__icon">
                  <SocialIcon name={l.key} size={20} />
                </span>
                <span className="link-tile__text">
                  <b>{l.label}</b>
                  <small>{l.handle}</small>
                </span>
                <ArrowUpRight size={18} className="link-tile__arrow" aria-hidden="true" />
                {l.external && <span className="sr-only"> (abre em nova aba)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
