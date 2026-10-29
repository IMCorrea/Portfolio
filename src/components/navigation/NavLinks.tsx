import { motion } from 'motion/react';
import type { MouseEvent } from 'react';
import { sections } from '../../data/navigation';
import { navigateTo } from '../../lib/lenis';
import { NavGlyph } from './NavGlyph';

interface Props {
  active: string;
  layoutId: string;
  onNavigate?: () => void;
}

/** Intercepta o clique simples para rolar suavemente; mantém ctrl/cmd+clique. */
export function handleAnchorClick(e: MouseEvent<HTMLElement>, id: string, after?: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  after?.();
  navigateTo(id);
}

export function NavLinks({ active, layoutId, onNavigate }: Props) {
  return (
    <ul className="nav-list">
      {sections.map((s, i) => {
        const isActive = active === s.id;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`nav-link ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={(e) => handleAnchorClick(e, s.id, onNavigate)}
              data-tip={s.label}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  className="nav-link__pill"
                  transition={{ type: 'spring', stiffness: 460, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <span className="nav-link__icon">
                <NavGlyph name={s.icon} />
              </span>
              <span className="nav-link__label">{s.label}</span>
              <span className="nav-link__num" aria-hidden="true">
                {String(i).padStart(2, '0')}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
