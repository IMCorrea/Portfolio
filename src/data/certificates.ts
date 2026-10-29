import { asset } from '../lib/asset';
import type { Tone } from './skills';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  initials: string;
  year: string;
  src: string;
  width: number;
  height: number;
  tone: Tone;
}

/** Diploma e certificados publicados no portfólio original. */
export const certificates: Certificate[] = [
  { id: 'diploma', title: 'Diploma — Tecnólogo em ADS', issuer: 'Centro Universitário Fametro', initials: 'FM', year: '2026', src: asset('assets/img/diploma-ads.webp'), width: 1604, height: 1110, tone: 'yellow' },
  { id: 'banco-dados', title: 'Banco de Dados', issuer: 'Fundação Bradesco', initials: 'FB', year: '2024', src: asset('assets/img/cert-banco-de-dados.webp'), width: 800, height: 622, tone: 'pink' },
  { id: 'analise-gran', title: 'Análise de Dados e Inteligência', issuer: 'Gran Faculdade', initials: 'GF', year: '2024', src: asset('assets/img/cert-analise-de-dados.webp'), width: 1454, height: 1031, tone: 'mint' },
  { id: 'google-dados', title: 'Análise de Dados (Google)', issuer: 'Google', initials: 'G', year: '2025', src: asset('assets/img/cert-google-dados.webp'), width: 1600, height: 838, tone: 'sky' },
];
