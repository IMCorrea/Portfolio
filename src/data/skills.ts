export type SkillIcon = 'chart' | 'sigma' | 'brain' | 'database' | 'server' | 'terminal';
export type Tone = 'yellow' | 'pink' | 'mint' | 'sky' | 'peach' | 'coral' | 'cream';

export interface SkillArea {
  title: string;
  level: string;
  icon: SkillIcon;
  tone: Tone;
}

/** Áreas de conhecimento, como publicadas no portfólio original. */
export const skillAreas: SkillArea[] = [
  { title: 'Power BI', level: 'Avançado', icon: 'chart', tone: 'yellow' },
  { title: 'DAX', level: 'Avançado', icon: 'sigma', tone: 'pink' },
  { title: 'IA Generativa', level: 'LLMs & automação', icon: 'brain', tone: 'mint' },
  { title: 'SQL & Bancos', level: 'SQL · MySQL · Oracle · Snowflake', icon: 'database', tone: 'sky' },
  { title: 'Infraestrutura', level: 'Servidores, redes & segurança', icon: 'server', tone: 'peach' },
  { title: 'Python', level: 'Automação & dados', icon: 'terminal', tone: 'coral' },
];

/** Todas as ferramentas listadas no original, organizadas por afinidade. */
export const skillGroups = [
  { title: 'Dados', items: ['ETL', 'Modelagem de dados', 'R', 'MySQL', 'MariaDB', 'Oracle', 'Snowflake'] },
  { title: 'Dev & IA', items: ['LLMs', 'JavaScript', 'TypeScript', 'WordPress', 'Figma'] },
  { title: 'Infra & Segurança', items: ['Segurança da informação', 'Docker', 'Linux', 'Grafana', 'Cloudflare'] },
  { title: 'ERP & Escritório', items: ['Winthor', 'RM', 'Pacote Office'] },
];

/** Fluxo de trabalho com dados, derivado das atividades descritas na trajetória. */
export const dataPipeline = [
  { step: 'Fontes', detail: 'Winthor · SQL · Excel' },
  { step: 'ETL', detail: 'SQL & Python' },
  { step: 'Modelo', detail: 'Modelagem de dados' },
  { step: 'Métricas', detail: 'DAX' },
  { step: 'Decisão', detail: 'Power BI + IA Generativa' },
];
