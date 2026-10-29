import type { ElementType } from 'react';

interface Props {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  id?: string;
  /** Índice da linha a destacar com marca-texto. */
  highlight?: number;
}

/**
 * Título com quebras de linha intencionais. Cada linha fica em uma máscara
 * (.line) para a revelação vertical feita pelo GSAP. O texto completo
 * permanece legível para leitores de tela.
 */
export function SplitTitle({ lines, as: Tag = 'h2', className = '', id, highlight }: Props) {
  return (
    <Tag className={`split-title ${className}`} id={id} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span className="line" key={i} aria-hidden="true">
          <span className={`line__inner ${i === highlight ? 'is-marked' : ''}`}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
