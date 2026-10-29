import { Award, FolderKanban, House, Layers, Mail, Route, UserRound } from 'lucide-react';
import type { NavIcon } from '../../data/navigation';

const icons = {
  home: House,
  user: UserRound,
  skills: Layers,
  projects: FolderKanban,
  route: Route,
  award: Award,
  mail: Mail,
} satisfies Record<NavIcon, unknown>;

export function NavGlyph({ name, size = 18 }: { name: NavIcon; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={2} aria-hidden="true" />;
}
