import type { Tone } from './skills';

export interface ExperienceItem {
  period: string;
  role: string;
  org: string;
  kind: 'Trabalho' | 'Formação';
  description: string;
  current?: boolean;
  tone: Tone;
}

/** Trajetória conforme publicada no portfólio original. */
export const experience: ExperienceItem[] = [
  {
    period: '2023',
    role: 'Analista de Infraestrutura e Suporte Pleno',
    org: 'Faives',
    kind: 'Trabalho',
    description: 'Monitoramento de sistemas, servidores e redes, suporte técnico e projetos de infraestrutura e segurança.',
    tone: 'sky',
  },
  {
    period: '2023 — 2025',
    role: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    org: 'Centro Universitário Fametro',
    kind: 'Formação',
    description: 'Graduado, com colação de grau em abril de 2026. Programação, banco de dados e engenharia de software.',
    tone: 'pink',
  },
  {
    period: '2023 — 2026',
    role: 'Analista de Dados e Suporte Pleno',
    org: 'Supermercado e Emporium Rodrigues',
    kind: 'Trabalho',
    description:
      'Dashboards em Power BI, métricas em DAX, ETL com SQL, Excel e Winthor, IA Generativa na análise e administração de servidores e rede.',
    tone: 'mint',
  },
  {
    period: '2026 — Atual',
    role: 'Desenvolvedor Pleno',
    org: 'Rodrigues Colchões',
    kind: 'Trabalho',
    description: 'Aplicações e automações internas, IA Generativa, modelagem e otimização de SQL e integração de sistemas corporativos.',
    current: true,
    tone: 'yellow',
  },
];
