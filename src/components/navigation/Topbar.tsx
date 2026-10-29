import { Eye } from 'lucide-react';
import { profile } from '../../data/profile';
import { useVisits } from '../../hooks/useVisits';
import { handleAnchorClick } from './NavLinks';
import { Search } from './Search';

/** Barra superior inspirada no cabeçalho do dashboard: status, busca, visitas e avatar. */
export function Topbar() {
  const visits = useVisits();
  return (
    <div className="topbar" data-anim="topbar">
      <p className="topbar__path" aria-hidden="true">
        <span>~/</span>melkc<span>/</span>portfolio<span className="topbar__caret" />
      </p>
      <Search />
      <div className="topbar__right">
        {visits !== null && (
          <p className="visits" title="Visitas ao portfólio">
            <Eye size={15} aria-hidden="true" />
            <b>{visits.toLocaleString('pt-BR')}</b>
            <span className="sr-only">visitas</span>
          </p>
        )}
        <a href="#sobre" className="avatar" onClick={(e) => handleAnchorClick(e, 'sobre')} aria-label="Sobre Melk Corrêa">
          <img src={profile.photo} alt="" width={40} height={40} />
        </a>
      </div>
    </div>
  );
}
