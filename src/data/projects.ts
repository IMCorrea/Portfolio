import { asset } from '../lib/asset';
import type { Tone } from './skills';

export type ProjectCategory = 'pessoal' | 'corp';
export type ProjectVisual =
  | { kind: 'image'; src: string; alt: string; width: number; height: number }
  | { kind: 'card' }
  | { kind: 'browser'; domain: string }
  | { kind: 'icon'; icon: 'receipt' | 'portal' | 'wallet' | 'plug' | 'scale' | 'cart' };

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  url?: string;
  urlLabel?: string;
  tone: Tone;
  wide?: boolean;
  visual: ProjectVisual;
}

export const categoryLabel: Record<ProjectCategory, string> = {
  pessoal: 'Pessoal',
  corp: 'Corporativo',
};

/**
 * Os 11 projetos do portfólio original. A categoria segue a classificação
 * publicada (data-cat). Projetos corporativos têm repositório privado e,
 * por isso, não possuem link público — abrem um painel de detalhes.
 */
export const projects: Project[] = [
  {
    id: 'dashboard-power-bi',
    number: '01',
    title: 'Dashboard Power BI',
    description: 'Protótipo de dashboard e layout para análise de vendas e indicadores do varejo.',
    category: 'pessoal',
    tags: ['Power BI', 'DAX', 'Figma'],
    tone: 'pink',
    wide: true,
    visual: { kind: 'image', src: asset('assets/img/dashboard.webp'), alt: 'Ilustração de dashboard de dados', width: 1200, height: 1200 },
  },
  {
    id: 'cartao-credito',
    number: '02',
    title: 'Cartão de Crédito Interativo',
    description: 'Formulário com cartão que se atualiza em tempo real enquanto o usuário digita.',
    category: 'pessoal',
    tags: ['HTML', 'CSS', 'JavaScript'],
    tone: 'yellow',
    visual: { kind: 'card' },
  },
  {
    id: 'calculadora-io',
    number: '03',
    title: 'Calculadora IO',
    description: 'Aplicação front-end simples, responsiva e direta ao ponto.',
    category: 'pessoal',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://imcorrea.github.io/calculadoraio/',
    urlLabel: 'imcorrea.github.io',
    tone: 'mint',
    visual: { kind: 'image', src: asset('assets/img/calculadora.webp'), alt: 'Captura de tela da Calculadora IO', width: 479, height: 442 },
  },
  {
    id: 'site-profissional',
    number: '04',
    title: 'Site Profissional',
    description: 'Site profissional com presença digital e apresentação de serviços.',
    category: 'pessoal',
    tags: ['WordPress', 'SEO', 'Web'],
    url: 'https://conversiax.com.br/',
    urlLabel: 'conversiax.com.br',
    tone: 'sky',
    visual: { kind: 'browser', domain: 'conversiax.com.br' },
  },
  {
    id: 'portfolio-v01',
    number: '05',
    title: 'Portfólio v01',
    description: 'Primeira versão do portfólio, publicada na Vercel.',
    category: 'pessoal',
    tags: ['HTML', 'CSS', 'Vercel'],
    url: 'https://imcorrea-github-io.vercel.app',
    urlLabel: 'imcorrea-github-io.vercel.app',
    tone: 'cream',
    visual: { kind: 'image', src: asset('assets/img/github.webp'), alt: 'Banner do GitHub usado no Portfólio v01', width: 719, height: 397 },
  },
  {
    id: 'universo-fiscal',
    number: '06',
    title: 'Universo Fiscal',
    description: 'Central de rotinas e informações fiscais para apoiar o time e a operação.',
    category: 'corp',
    tags: ['Fiscal', 'Dados', 'Web'],
    tone: 'yellow',
    visual: { kind: 'icon', icon: 'receipt' },
  },
  {
    id: 'universo-rc',
    number: '07',
    title: 'Universo RC',
    description: 'Portal interno que reúne ferramentas e acessos da empresa em um só lugar.',
    category: 'corp',
    tags: ['Portal', 'Web', 'Interno'],
    tone: 'mint',
    wide: true,
    visual: { kind: 'icon', icon: 'portal' },
  },
  {
    id: 'gestor-faturas',
    number: '08',
    title: 'Gestor de Faturas',
    description: 'Controle e acompanhamento de faturas, vencimentos e pagamentos.',
    category: 'corp',
    tags: ['Financeiro', 'Web', 'BD'],
    tone: 'pink',
    visual: { kind: 'icon', icon: 'wallet' },
  },
  {
    id: 'api-bravolt-winthor',
    number: '09',
    title: 'API Bravolt × Winthor',
    description: 'Integração via API entre a plataforma Bravolt e o ERP Winthor.',
    category: 'corp',
    tags: ['API', 'Winthor', 'Integração'],
    tone: 'sky',
    visual: { kind: 'icon', icon: 'plug' },
  },
  {
    id: 'universo-juridico',
    number: '10',
    title: 'Universo Jurídico',
    description: 'Organização de documentos e processos do setor jurídico.',
    category: 'corp',
    tags: ['Jurídico', 'Web', 'Interno'],
    tone: 'peach',
    visual: { kind: 'icon', icon: 'scale' },
  },
  {
    id: 'forca-vendas',
    number: '11',
    title: 'Força de Vendas',
    description: 'Ferramenta para a equipe comercial acompanhar pedidos, metas e clientes.',
    category: 'corp',
    tags: ['Vendas', 'Dados', 'Mobile'],
    tone: 'cream',
    wide: true,
    visual: { kind: 'icon', icon: 'cart' },
  },
];
