import { FileDown, Globe, Mail } from 'lucide-react';
import type { SocialKey } from '../../data/socialLinks';
import { BrandIcon } from './BrandIcon';

export function SocialIcon({ name, size = 18 }: { name: SocialKey; size?: number }) {
  switch (name) {
    case 'email':
      return <Mail size={size} aria-hidden="true" />;
    case 'resume':
      return <FileDown size={size} aria-hidden="true" />;
    case 'site':
      return <Globe size={size} aria-hidden="true" />;
    default:
      return <BrandIcon name={name} size={size} />;
  }
}
