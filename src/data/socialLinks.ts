import { profile } from './profile';

export type SocialKey = 'email' | 'whatsapp' | 'linkedin' | 'github' | 'instagram' | 'resume' | 'site';

export interface SocialLink {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
  external: boolean;
}

/** Destinos recuperados do portfólio original. */
export const socialLinks: SocialLink[] = [
  { key: 'email', label: 'E-mail', handle: profile.email, href: `mailto:${profile.email}`, external: false },
  { key: 'whatsapp', label: 'WhatsApp', handle: '+55 93 99209-0196', href: 'https://wa.me/5593992090196', external: true },
  { key: 'linkedin', label: 'LinkedIn', handle: '/in/IMelkC', href: 'https://www.linkedin.com/in/IMelkC', external: true },
  { key: 'github', label: 'GitHub', handle: '@IMCorrea', href: 'https://github.com/IMCorrea', external: true },
  { key: 'instagram', label: 'Instagram', handle: '@IMelkC', href: 'https://instagram.com/IMelkC', external: true },
  { key: 'resume', label: 'Currículo', handle: 'PDF · download', href: profile.resume, external: false },
  { key: 'site', label: 'Site profissional', handle: 'conversiax.com.br', href: 'https://conversiax.com.br/', external: true },
];

export const githubRepos = 'https://github.com/IMCorrea?tab=repositories';

export const linkByKey = (key: SocialKey) => socialLinks.find((l) => l.key === key)!;
