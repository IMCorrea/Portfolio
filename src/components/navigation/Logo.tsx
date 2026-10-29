import { Code } from 'lucide-react';
import { handleAnchorClick } from './NavLinks';

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a href="#inicio" className="logo" onClick={(e) => handleAnchorClick(e, 'inicio', onNavigate)} aria-label="MelkC — voltar ao início">
      <span className="logo__mark" aria-hidden="true">
        <Code size={18} strokeWidth={2.5} />
      </span>
      <span className="logo__text" aria-hidden="true">
        Melk<b>C</b>
      </span>
    </a>
  );
}
