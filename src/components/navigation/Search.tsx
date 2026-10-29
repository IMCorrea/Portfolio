import { AnimatePresence, motion } from 'motion/react';
import { CornerDownLeft, Search as SearchIcon } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { sections } from '../../data/navigation';
import { projects } from '../../data/projects';
import { skillAreas, skillGroups } from '../../data/skills';
import { navigateTo } from '../../lib/lenis';

interface Entry {
  id: string;
  label: string;
  type: 'Seção' | 'Projeto' | 'Habilidade';
  keywords: string;
  go: () => void;
}

export const PROJECT_FOCUS_EVENT = 'portfolio:focus-project';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

const entries: Entry[] = [
  ...sections.map((s) => ({
    id: `s-${s.id}`,
    label: s.label,
    type: 'Seção' as const,
    keywords: s.label,
    go: () => navigateTo(s.id),
  })),
  ...projects.map((p) => ({
    id: `p-${p.id}`,
    label: p.title,
    type: 'Projeto' as const,
    keywords: `${p.title} ${p.tags.join(' ')} ${p.description}`,
    go: () => {
      navigateTo('projetos');
      window.dispatchEvent(new CustomEvent(PROJECT_FOCUS_EVENT, { detail: p.id }));
    },
  })),
  ...[...skillAreas.map((a) => a.title), ...skillGroups.flatMap((g) => g.items)].map((name) => ({
    id: `k-${name}`,
    label: name,
    type: 'Habilidade' as const,
    keywords: name,
    go: () => navigateTo('habilidades'),
  })),
];

/** Busca do portfólio: encontra seções, projetos e habilidades e navega até eles. */
export function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const listId = `${uid}-results`;

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return entries.filter((e) => normalize(e.keywords).includes(q)).slice(0, 7);
  }, [query]);

  useEffect(() => setCursor(0), [query]);

  // Atalho "/" para focar a busca.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(t.tagName) && !t.isContentEditable) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const select = (entry: Entry) => {
    entry.go();
    setQuery('');
    setOpen(false);
  };

  const showList = open && query.trim().length > 0;

  return (
    <div className="search" role="search">
      <label htmlFor={`${uid}-input`} className="sr-only">
        Buscar no portfólio
      </label>
      <SearchIcon size={16} className="search__icon" aria-hidden="true" />
      <input
        ref={inputRef}
        id={`${uid}-input`}
        className="search__input"
        type="search"
        autoComplete="off"
        placeholder="Buscar no portfólio…"
        value={query}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && results[cursor] ? `${listId}-${cursor}` : undefined}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setCursor((c) => Math.min(c + 1, results.length - 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setCursor((c) => Math.max(c - 1, 0));
          } else if (e.key === 'Enter' && results[cursor]) {
            e.preventDefault();
            select(results[cursor]);
            inputRef.current?.blur();
          } else if (e.key === 'Escape') {
            setQuery('');
            setOpen(false);
          }
        }}
      />
      <kbd className="search__kbd" aria-hidden="true">
        /
      </kbd>

      <AnimatePresence>
        {showList && (
          <motion.ul
            id={listId}
            role="listbox"
            className="search__results"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            {results.length === 0 && <li className="search__empty">Nada encontrado para “{query}”.</li>}
            {results.map((r, i) => (
              <li
                key={r.id}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === cursor}
                className={`search__option ${i === cursor ? 'is-active' : ''}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(r);
                }}
                onMouseEnter={() => setCursor(i)}
              >
                <span className="search__type">{r.type}</span>
                <span className="search__label">{r.label}</span>
                {i === cursor && <CornerDownLeft size={14} aria-hidden="true" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
