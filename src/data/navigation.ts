export type NavIcon = 'home' | 'user' | 'skills' | 'projects' | 'route' | 'award' | 'mail';

export const sections: { id: string; label: string; icon: NavIcon }[] = [
  { id: 'inicio', label: 'Início', icon: 'home' },
  { id: 'sobre', label: 'Sobre', icon: 'user' },
  { id: 'habilidades', label: 'Habilidades', icon: 'skills' },
  { id: 'projetos', label: 'Projetos', icon: 'projects' },
  { id: 'trajetoria', label: 'Trajetória', icon: 'route' },
  { id: 'certificados', label: 'Certificados', icon: 'award' },
  { id: 'contato', label: 'Contato', icon: 'mail' },
];
