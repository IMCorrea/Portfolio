import { motion } from 'motion/react';
import type { ReactNode, MouseEventHandler } from 'react';

type Variant = 'primary' | 'secondary' | 'yellow' | 'ghost';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
  download?: boolean | string;
  className?: string;
  ariaLabel?: string;
  cursor?: string;
}

const SHADOW = '4px 4px 0px #111111';
const SHADOW_HOVER = '6px 6px 0px #111111';
const SHADOW_TAP = '0px 0px 0px #111111';

/**
 * Botão neo-brutalista. O Motion controla deslocamento e sombra (hover/tap);
 * entradas de seção animam sempre um elemento pai, nunca este.
 */
export function Button({ children, href, onClick, variant = 'primary', icon, external, download, className = '', ariaLabel, cursor }: Props) {
  const common = {
    className: `btn btn--${variant} ${className}`,
    style: { boxShadow: SHADOW },
    whileHover: { x: -2, y: -2, boxShadow: SHADOW_HOVER },
    whileTap: { x: 4, y: 4, boxShadow: SHADOW_TAP },
    transition: { type: 'spring' as const, stiffness: 520, damping: 32 },
    'aria-label': ariaLabel,
    'data-cursor': cursor,
  };
  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="btn__icon">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        {...common}
        href={href}
        onClick={onClick}
        download={download}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" {...common} onClick={onClick}>
      {content}
    </motion.button>
  );
}
