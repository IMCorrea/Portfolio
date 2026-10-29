import { FileDown, Send } from 'lucide-react';
import { profile } from '../../data/profile';
import { Logo } from './Logo';
import { NavLinks, handleAnchorClick } from './NavLinks';

/** Reinterpretação da sidebar verde-menta da referência: marca, seções e indicador ativo. */
export function Sidebar({ active }: { active: string }) {
  return (
    <aside className="sidebar" data-anim="sidebar">
      <Logo />
      <nav className="sidebar__nav" aria-label="Seções do portfólio">
        <NavLinks active={active} layoutId="sidebar-active" />
      </nav>
      <div className="sidebar__foot">
        <a className="nav-link nav-link--quiet" href={profile.resume} download data-tip="Baixar currículo">
          <span className="nav-link__icon">
            <FileDown size={18} aria-hidden="true" />
          </span>
          <span className="nav-link__label">Baixar CV</span>
        </a>
        <a className="nav-link nav-link--quiet" href="#contato" onClick={(e) => handleAnchorClick(e, 'contato')} data-tip="Vamos conversar">
          <span className="nav-link__icon">
            <Send size={18} aria-hidden="true" />
          </span>
          <span className="nav-link__label">Vamos conversar</span>
        </a>
      </div>
    </aside>
  );
}
