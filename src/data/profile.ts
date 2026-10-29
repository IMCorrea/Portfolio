import { asset } from '../lib/asset';

export const profile = {
  fullName: 'Melquizedeque Corrêa',
  name: 'Melk Corrêa',
  brand: 'MelkC',
  role: 'Desenvolvedor Pleno · Dados, BI & IA Generativa',
  headline: 'Transformando dados em decisões que movem negócios.',
  headlineLines: ['Transformando', 'dados em decisões', 'que movem negócios.'],
  lead: 'Desenvolvimento, engenharia de dados, Business Intelligence e IA Generativa para transformar problemas complexos em soluções úteis.',
  summary:
    'Desenvolvo aplicações, pipelines de ETL e dashboards em Power BI, e aplico IA Generativa para automatizar rotinas — com a base sólida de quem vem da infraestrutura de TI.',
  about:
    'Sou Melquizedeque Corrêa — o Melk. Tecnólogo em Análise e Desenvolvimento de Sistemas, atuo com desenvolvimento de software, engenharia e análise de dados. Construo pipelines de ETL, dashboards em Power BI e automações com IA Generativa, unindo visão de negócio, Python e SQL e a vivência em infraestrutura de TI.',
  motto: 'O céu não é o limite, é apenas o começo.',
  email: 'melkcorrea4@gmail.com',
  available: 'Disponível para novas oportunidades',
  photo: asset('assets/img/foto.webp'),
  resume: asset('assets/curriculo-melk-correa.pdf'),
  site: 'https://imcorrea.github.io/Portfolio/',
  /** Indicadores publicados no portfólio original. */
  stats: [
    { value: 3, suffix: '+', label: 'anos em TI' },
    { value: 3, suffix: '', label: 'certificações' },
    { value: 11, suffix: '+', label: 'projetos' },
  ],
  facts: [
    { label: 'Nome', value: 'Melquizedeque Corrêa' },
    { label: 'Formação', value: 'Tecnólogo em ADS · Fametro' },
    { label: 'Atual', value: 'Desenvolvedor Pleno · Rodrigues Colchões' },
    { label: 'Foco', value: 'Dados, BI & IA Generativa' },
    { label: 'Base', value: 'Infraestrutura de TI' },
  ],
} as const;
