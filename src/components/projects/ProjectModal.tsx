import { Lock, Mail } from 'lucide-react';
import { categoryLabel, type Project } from '../../data/projects';
import { profile } from '../../data/profile';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ProjectVisual } from './ProjectVisual';

/** Painel interno para projetos sem URL pública. */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const p = project;
  const note =
    p?.category === 'corp'
      ? 'Projeto corporativo de uso interno. O código e as telas são privados, por isso não há link público — posso apresentar os detalhes em uma conversa.'
      : 'Protótipo sem link público disponível no momento.';

  return (
    <Modal open={!!p} onClose={onClose} labelledBy="project-modal-title" className="project-modal">
      {p && (
        <div className={`project-modal__inner tone-${p.tone}`}>
          <div className="project-modal__media">
            <ProjectVisual project={p} />
          </div>
          <div className="project-modal__body">
            <p className="pcard__meta">
              <span className="pcard__num">{p.number}</span>
              <span className="pcard__cat">{categoryLabel[p.category]}</span>
            </p>
            <h3 id="project-modal-title" className="project-modal__title">
              {p.title}
            </h3>
            <p className="project-modal__desc">{p.description}</p>
            <ul className="tags">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="project-modal__note">
              <Lock size={14} aria-hidden="true" /> {note}
            </p>
            <Button href={`mailto:${profile.email}?subject=${encodeURIComponent(`Sobre o projeto ${p.title}`)}`} icon={<Mail size={18} aria-hidden="true" />}>
              Conversar sobre este projeto
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
