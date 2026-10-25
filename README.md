# Melk Corrêa — Portfólio

Portfólio de **Melquizedeque (Melk) Corrêa** — Analista de Power BI, Infraestrutura em TI e Banco de Dados.

🔗 **Acesse:** [imcorrea.github.io/Portfolio](https://imcorrea.github.io/Portfolio/)

## Seções

- **Início** — apresentação, mockups de dashboard e infraestrutura
- **Sobre** — resumo profissional e números
- **Habilidades** — Power BI, DAX, ETL, SQL, Infraestrutura, Segurança
- **Projetos** — pessoais (com link) e corporativos (repositórios privados), com filtro
- **Trajetória** — formação e experiência em linha do tempo
- **Certificados** — carrossel com visualização ampliada
- **Contato** — WhatsApp e e-mail
- **Contador de visitas** — no rodapé e no topo da página

## Tecnologias

HTML, CSS e JavaScript puros — sem build. Ícones [Bootstrap Icons](https://icons.getbootstrap.com/),
fontes Inter e Fraunces (Google Fonts) e contador de visitas pela API gratuita
[Abacus](https://abacus.jasoncameron.dev).

## Estrutura

```
index.html
css/style.css
js/main.js
assets/img/…              fotos, certificados e imagens dos projetos
assets/curriculo-melk-correa.pdf
```

## Rodando localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
npx serve .
```

Acessos em `localhost` não somam no contador de visitas.

## Como editar

- **Projetos:** em `index.html`, seção `#projetos`. Cards pessoais usam `data-cat="pessoal"`, corporativos `data-cat="corp"`.
- **Certificados:** adicione um `<button class="ccard">` na seção `#certificados` e a imagem em `assets/img/`.
- **Contador:** constantes `NAMESPACE` e `KEY` no fim de `js/main.js`.

## Contato

- E-mail: melkcorrea4@gmail.com
- WhatsApp: (93) 99209-0196
- LinkedIn: [IMelkC](https://www.linkedin.com/in/IMelkC)
- GitHub: [IMCorrea](https://github.com/IMCorrea)

## Licença

MIT
