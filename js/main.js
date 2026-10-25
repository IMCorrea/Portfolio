/* =========================================================
   Melk Corrêa — Portfólio
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Ano no rodapé
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Header + menu mobile ---------- */
  const header = $('#header');
  const burger = $('#burger');
  const navList = $('#nav-list');

  const onScrollHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
  onScrollHeader();

  function toggleMenu(open) {
    const isOpen = open ?? !navList.classList.contains('is-open');
    navList.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  burger.addEventListener('click', () => toggleMenu());
  $$('a', navList).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Texto digitando ---------- */
  const roles = ['Analista de Power BI', 'Dashboards & DAX', 'Infraestrutura & Redes', 'Banco de Dados & ETL'];
  const typedEl = $('#typed');
  if (reduceMotion) {
    typedEl.textContent = roles[0];
  } else {
    let r = 0, c = 0, forward = true;
    (function tick() {
      const word = roles[r];
      typedEl.textContent = word.slice(0, c);
      if (forward && c === word.length) { forward = false; return setTimeout(tick, 1400); }
      if (!forward && c === 0) { forward = true; r = (r + 1) % roles.length; }
      c += forward ? 1 : -1;
      setTimeout(tick, forward ? 70 : 35);
    })();
  }

  /* ---------- Reveal + contadores ---------- */
  function countUp(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const pad = n => String(n).padStart(2, '0');
    if (reduceMotion) { el.textContent = pad(target) + suffix; return; }
    const start = performance.now();
    const dur = 1400;
    (function step(now) {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = pad(Math.round(target * (1 - Math.pow(1 - p, 3)))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      $$('[data-count]', entry.target).forEach(countUp);
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(el => revealObs.observe(el));

  /* ---------- Seção ativa (nav + side dots) ---------- */
  const sections = $$('main section[id]');
  const dots = $('.side-dots');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      $$('[data-dot]').forEach(d => d.classList.toggle('is-active', d.dataset.dot === id));
      $$('.nav__list a').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
      dots.classList.toggle('on-light', entry.target.classList.contains('section--light'));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => sectionObs.observe(s));

  /* ---------- Parallax leve + objeto 3D ---------- */
  const parallaxEls = $$('[data-parallax]');
  const orbObj = $('.orb__obj');
  const orb = $('#orb');
  let ticking = false;

  function onScroll() {
    onScrollHeader();
    if (reduceMotion || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      parallaxEls.forEach(el => {
        el.style.translate = `0 ${y * Number(el.dataset.parallax)}px`;
      });
      if (orb) {
        const rect = orb.getBoundingClientRect();
        const progress = 1 - (rect.top + rect.height / 2) / window.innerHeight;
        orbObj.style.setProperty('--ry', `${-30 + progress * 70}deg`);
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Projetos: trilho + filtro ---------- */
  const track = $('#projects-track');
  const prev = $('#proj-prev');
  const next = $('#proj-next');
  const step = () => (track.querySelector('.pcard:not(.is-hidden)')?.offsetWidth || 230) + 22;

  function updateArrows() {
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  }
  prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
  next.addEventListener('click', () => track.scrollBy({ left: step() }));
  track.addEventListener('scroll', updateArrows, { passive: true });
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: step() }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -step() }); }
  });
  window.addEventListener('resize', updateArrows);
  updateArrows();

  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    $$('.filter').forEach(b => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    $$('.pcard', track).forEach(card => card.classList.toggle('is-hidden', f !== 'all' && card.dataset.cat !== f));
    track.scrollTo({ left: 0 });
    updateArrows();
  }));

  /* ---------- Carrossel de certificados ---------- */
  const cards = $$('.ccard');
  const dotsWrap = $('#cert-dots');
  let current = 1;
  let autoplay;

  cards.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Certificado ${i + 1}`);
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
  });

  function go(i) {
    current = (i + cards.length) % cards.length;
    cards.forEach((card, idx) => {
      let pos = idx - current;
      // loop circular para 3+ itens
      if (pos > cards.length / 2) pos -= cards.length;
      if (pos < -cards.length / 2) pos += cards.length;
      card.style.setProperty('--pos', pos);
      card.style.setProperty('--abs', Math.abs(pos));
      card.classList.toggle('is-current', pos === 0);
      card.setAttribute('aria-hidden', String(pos !== 0));
      card.tabIndex = pos === 0 ? 0 : -1;
    });
    $$('button', dotsWrap).forEach((d, idx) => d.setAttribute('aria-selected', String(idx === current)));
  }
  go(current);

  $('#cert-prev').addEventListener('click', () => { go(current - 1); restart(); });
  $('#cert-next').addEventListener('click', () => { go(current + 1); restart(); });
  $('#cert-carousel').addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(current + 1);
    if (e.key === 'ArrowLeft') go(current - 1);
  });

  function restart() {
    clearInterval(autoplay);
    if (!reduceMotion) autoplay = setInterval(() => go(current + 1), 5000);
  }
  restart();
  $('#cert-carousel').addEventListener('mouseenter', () => clearInterval(autoplay));
  $('#cert-carousel').addEventListener('mouseleave', restart);

  /* ---------- Modal ---------- */
  const modal = $('#modal');
  const modalImg = $('#modal-img');
  let lastFocus;

  function openModal(card) {
    lastFocus = document.activeElement;
    modalImg.src = card.dataset.img;
    modalImg.alt = card.dataset.title;
    $('#modal-title').textContent = card.dataset.title;
    $('#modal-details').textContent = card.dataset.details;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#modal-close').focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    lastFocus?.focus();
  }
  cards.forEach((card, idx) => card.addEventListener('click', () => {
    if (idx !== current) { go(idx); restart(); return; }
    openModal(card);
  }));
  $('#modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!modal.hidden) closeModal();
      if (navList.classList.contains('is-open')) toggleMenu(false);
    }
  });

  /* ---------- Contador de visitas ----------
     Usa a API gratuita Abacus (https://abacus.jasoncameron.dev).
     Conta 1 visita por sessão do navegador; nas demais páginas da sessão só lê o valor. */
  const COUNTER = 'https://abacus.jasoncameron.dev';
  const NAMESPACE = 'imcorrea-portfolio';
  const KEY = 'visitas';

  (async function visits() {
    let counted = false;
    try { counted = sessionStorage.getItem('visit-counted') === '1'; } catch (_) {}
    // não conta acessos feitos durante o desenvolvimento local
    if (['localhost', '127.0.0.1', ''].includes(location.hostname)) counted = true;
    const url = `${COUNTER}/${counted ? 'get' : 'hit'}/${NAMESPACE}/${KEY}`;
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const { value } = await res.json();
      if (typeof value !== 'number') return;
      try { sessionStorage.setItem('visit-counted', '1'); } catch (_) {}
      const formatted = value.toLocaleString('pt-BR');
      $('#visits-count').textContent = formatted;
      $('#badge-visits-count').textContent = formatted;
      $('#visits').hidden = false;
      $('#badge-visits').hidden = false;
    } catch (_) {
      // sem rede ou serviço fora do ar: o contador simplesmente não aparece
    }
  })();
});
