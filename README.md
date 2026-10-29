# MelkC — Portfólio v2

Portfólio de **Melquizedeque Corrêa (Melk)** — Desenvolvedor Pleno · Dados, BI & IA Generativa.

Direção de arte neo-brutalista em tons pastel (bordas pretas, sombras sólidas, tipografia monoespaçada), com animações em GSAP, microinterações em Motion e rolagem suave com Lenis.

## Stack

- React 18 + TypeScript + Vite
- GSAP (Timeline, ScrollTrigger, Flip) + `@gsap/react`
- Motion for React (hover/tap, filtros, menu, modais)
- Lenis (rolagem suave, integrada ao ticker do GSAP)
- Lucide React (ícones) · CSS próprio com tokens

## Rodando localmente

Requisitos: Node 20+.

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # build de produção em dist/
npm run preview   # serve o build localmente
```

## Publicação no GitHub Pages

O workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) faz o build e publica a cada push na branch `main`.

1. Envie o projeto para um repositório no GitHub (branch `main`).
2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. O site fica em `https://<usuario>.github.io/<repositorio>/`.

O `base: './'` do Vite deixa o build independente do nome do repositório.

## Onde editar o conteúdo

Todo o conteúdo profissional fica em [src/data/](src/data/):

| Arquivo | Conteúdo |
| --- | --- |
| `profile.ts` | Nome, headline, textos, e-mail, indicadores |
| `skills.ts` | Áreas de conhecimento, ferramentas e fluxo de dados |
| `projects.ts` | Os 11 projetos, categorias, links e mídias |
| `experience.ts` | Trajetória profissional e acadêmica |
| `certificates.ts` | Diploma e certificados |
| `socialLinks.ts` | E-mail, WhatsApp, LinkedIn, GitHub, Instagram, currículo, site |

Imagens e currículo ficam em [public/assets/](public/assets/).

## Estrutura

```
src/
  components/   navigation, layout, hero, about, skills, projects,
                experience, certificates, contact, footer, ui
  data/         conteúdo do portfólio
  hooks/        useSectionMotion, useActiveSection, useVisits
  lib/          gsap.ts, lenis.ts, animations.ts, intro.ts
  styles/       tokens, global, components, sections, animations
```

## Acessibilidade e movimento

- HTML semântico, link "Pular para o conteúdo", foco visível e navegação por teclado.
- Modais com foco preso, fechamento por `Esc` e retorno do foco.
- Com `prefers-reduced-motion`, a intro, o Lenis e as animações de entrada são desativados e todo o conteúdo fica visível.
- Os dashboards do hero são ilustrativos e estão marcados como **dados demonstrativos**.
