import { ArrowUpRight, Plus } from 'lucide-react';
import { categoryLabel, type Project } from '../../data/projects';
import { ProjectVisual } from './ProjectVisual';

interface Props {
  project: Project;
  onOpen: (p: Project) => void;
}

/**
 * Cartão com "link esticado": o título contém o link/botão real e uma
 * camada ::after cobre o cartão. Com URL, abre o projeto em nova aba;
 * sem URL, abre o painel de detalhes.
 */
export function ProjectCard({ project: p, onOpen }: Props) {
  const footLabel = p.url ? p.urlLabel : p.category === 'corp' ? 'Projeto interno · privado' : 'Ver detalhes';

  return (
    <article className={`pcard tone-${p.tone}`} data-cursor={p.url ? 'Abrir ↗' : 'Detalhes'}>
      <div className="pcard__media">
        <ProjectVisual project={p} />
      </div>
      <div className="pcard__body">
        <div className="pcard__meta">
          <span className="pcard__num">{p.number}</span>
          <span className="pcard__cat">{categoryLabel[p.category]}</span>
        </div>
        <h3 className="pcard__title">
          {p.url ? (
            <a className="pcard__link" href={p.url} target="_blank" rel="noopener noreferrer">
              {p.title}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          ) : (
            <button type="button" className="pcard__link" onClick={() => onOpen(p)} aria-haspopup="dialog">
              {p.title}
              <span className="sr-only"> — ver detalhes</span>
            </button>
          )}
        </h3>
        <p className="pcard__desc">{p.description}</p>
        <ul className="tags" aria-label="Tecnologias e categorias">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="pcard__foot" aria-hidden="true">
          <span>{footLabel}</span>
          <span className="pcard__arrow">{p.url ? <ArrowUpRight size={18} /> : <Plus size={18} />}</span>
        </div>
      </div>
    </article>
  );
}
