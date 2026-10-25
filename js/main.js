/* =========================================================
   Melk Corrêa — Portfólio
   Módulos pequenos e reaproveitáveis; só transform/opacity animados.
   ========================================================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  $('#year').textContent = new Date().getFullYear();

  /* ---------- Scroll suave (Lenis) ---------- */
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.1, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  function scrollToTarget(target) {
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    // move o foco para a seção (teclado / leitores de tela)
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    const target = id === '#' ? null : $(id);
    if (!target) return;
    e.preventDefault();
    toggleMenu(false);
    scrollToTarget(target);
  });

  /* ---------- Split: título palavra por palavra ---------- */
  function splitWords(el) {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const outer = document.createElement('span');
            const inner = document.createElement('span');
            outer.className = 'split-w';
            inner.textContent = part;
            inner.style.setProperty('--w', i++);
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === Node.ELEMENT_NODE && n.tagName !== 'BR') {
          walk(n);
        }
      });
    };
    walk(el);
  }
  $$('[data-split]').forEach(splitWords);

  /* ---------- Reveal: entrada única com stagger ---------- */
  // Cards e listas ganham reveal automaticamente
  $$('.skill').forEach(el => el.classList.add('reveal'));
  $('#projects-track')?.setAttribute('data-stagger', '');
  $('.skills__tags')?.setAttribute('data-stagger', '');

  // Índice de stagger: ordem entre os .reveal irmãos e entre filhos de [data-stagger]
  $$('.reveal').forEach(el => {
    const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    el.style.setProperty('--i', siblings.indexOf(el));
  });
  $$('[data-stagger]').forEach(group => [...group.children].forEach((c, i) => c.style.setProperty('--i', i)));

  const revealTargets = [
    ...$$('.reveal'), ...$$('[data-stagger]'), ...$$('main [data-split]'),
    ...$$('.eyebrow'), $('.about__portrait'), $('#orb'), $('.skills')
  ].filter(el => el && !el.closest('.hero'));

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      $$('[data-count]', entry.target).forEach(countUp);
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  revealTargets.forEach(el => revealObs.observe(el));

  /* ---------- Contadores ---------- */
  function animateNumber(duration, onUpdate) {
    if (reduceMotion) { onUpdate(1); return; }
    const start = performance.now();
    const step = now => {
      const p = clamp((now - start) / duration, 0, 1);
      onUpdate(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function countUp(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    animateNumber(1400, p => { el.textContent = String(Math.round(target * p)).padStart(2, '0') + suffix; });
  }

  function tickers() {
    $$('[data-ticker]').forEach(el => {
      const target = Number(el.dataset.ticker);
      const decimals = Number(el.dataset.decimals || 0);
      const fmt = v => v.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      el.textContent = fmt(0);
      setTimeout(() => animateNumber(1200, p => { el.textContent = fmt(target * p); }), 450);
    });
  }

  /* ---------- Hero: sequência coreografada ---------- */
  const hero = $('.hero');
  function startHero() {
    root.classList.add('is-ready');
    requestAnimationFrame(() => {
      hero.classList.add('is-in');
      $('[data-split]', hero)?.classList.add('is-in');
      tickers();
      setTimeout(typeLoop, reduceMotion ? 0 : 900);
    });
  }
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(r => setTimeout(r, 700))]).then(startHero);

  /* ---------- Texto digitando ---------- */
  const roles = ['Desenvolvedor Pleno', 'Dados & Business Intelligence', 'IA Generativa aplicada', 'Python, SQL & Power BI'];
  const typedEl = $('#typed');
  function typeLoop() {
    if (reduceMotion) { typedEl.textContent = roles[0]; return; }
    let r = 0, c = 0, forward = true;
    (function tick() {
      const word = roles[r];
      typedEl.textContent = word.slice(0, c);
      if (forward && c === word.length) { forward = false; return setTimeout(tick, 1600); }
      if (!forward && c === 0) { forward = true; r = (r + 1) % roles.length; }
      c += forward ? 1 : -1;
      setTimeout(tick, forward ? 65 : 30);
    })();
  }

  /* ---------- Header + menu mobile ---------- */
  const header = $('#header');
  const burger = $('#burger');
  const navList = $('#nav-list');

  function toggleMenu(open) {
    const isOpen = open ?? !navList.classList.contains('is-open');
    if (isOpen === navList.classList.contains('is-open')) return;
    navList.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (lenis) isOpen ? lenis.stop() : lenis.start();
    header.classList.remove('is-hidden');
  }
  burger.addEventListener('click', () => toggleMenu());

  /* ---------- Efeitos ligados ao scroll (um único rAF) ---------- */
  const progressBar = $('#progress');
  const parallaxEls = $$('[data-speed]');
  const timeline = $('#timeline');
  const timelineDraw = $('.timeline__draw');
  const timelineItems = $$('.tl');
  const orb = $('#orb');
  const orbObj = $('#orb-obj');
  const lineVisible = () => timelineDraw && getComputedStyle(timelineDraw.ownerSVGElement).display !== 'none';
  timelineDraw?.setAttribute('pathLength', '1');

  let lastY = window.scrollY;
  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;

    // header: translúcido ao rolar; esconde descendo, volta subindo
    header.classList.toggle('is-scrolled', y > 24);
    if (!navList.classList.contains('is-open')) {
      if (y > 160 && y - lastY > 4) header.classList.add('is-hidden');
      else if (lastY - y > 4 || y < 160) header.classList.remove('is-hidden');
    }
    lastY = y;

    progressBar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (!reduceMotion) {
      // parallax sutil nos elementos decorativos
      parallaxEls.forEach(el => {
        const rect = el.parentElement.getBoundingClientRect();
        const p = clamp((rect.top + rect.height / 2 - vh / 2) / vh, -1, 1);
        el.style.setProperty('--py', `${(p * Number(el.dataset.speed)).toFixed(1)}px`);
      });

      if (orb) {
        const rect = orb.getBoundingClientRect();
        const p = clamp(1 - (rect.top + rect.height / 2) / vh, 0, 1);
        orbObj.style.setProperty('--ry', `${(-35 + p * 70).toFixed(1)}deg`);
      }
    }

    // linha do tempo se desenha com o scroll e "acende" cada etapa
    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const p = reduceMotion ? 1 : clamp((vh * 0.85 - rect.top) / (vh * 0.55), 0, 1);
      if (timelineDraw) timelineDraw.style.strokeDashoffset = String(1 - p);
      const horizontal = lineVisible();
      timelineItems.forEach((item, i) => {
        const reached = horizontal
          ? p >= i / Math.max(1, timelineItems.length - 1) * 0.92 + 0.02
          : item.getBoundingClientRect().top < vh * 0.88;
        if (reached) item.classList.add('is-reached');
      });
    }
  }
  const requestUpdate = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  if (lenis) lenis.on('scroll', requestUpdate);
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();

  /* ---------- Seção ativa (nav + side dots) ---------- */
  const dots = $('.side-dots');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      $$('[data-dot]').forEach(d => d.classList.toggle('is-active', d.dataset.dot === id));
      $$('.nav__list a').forEach(a => {
        const active = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-active', active);
        active ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
      });
      dots.classList.toggle('on-light', entry.target.classList.contains('section--light'));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => sectionObs.observe(s));

  /* ---------- Hero: profundidade com o cursor ---------- */
  if (canHover && !reduceMotion) {
    const layers = $$('#devices [data-depth]');
    const aura = $('.hero__aura');
    let frame = null;
    hero.addEventListener('pointermove', e => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach(el => {
          const d = Number(el.dataset.depth);
          el.style.transform = `translate3d(${(nx * d).toFixed(1)}px, ${(ny * d).toFixed(1)}px, 0)`;
        });
        aura.style.setProperty('--ax', `${(nx * 60).toFixed(1)}px`);
        aura.style.setProperty('--ay', `${(ny * 40).toFixed(1)}px`);
      });
    });
    hero.addEventListener('pointerleave', () => {
      layers.forEach(el => { el.style.transform = ''; });
      aura.style.setProperty('--ax', '0px');
      aura.style.setProperty('--ay', '0px');
    });
  }

  /* ---------- Spotlight que segue o cursor (cards) ---------- */
  function useSpotlight(el) {
    el.classList.add('has-spotlight');
    if (!$('.spotlight', el)) el.insertAdjacentHTML('afterbegin', '<span class="spotlight" aria-hidden="true"></span>');
    if (!canHover) return;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  }
  $$('.pcard, .skill').forEach(useSpotlight);

  /* ---------- Imagens: skeleton até carregar ---------- */
  $$('.skeleton').forEach(box => {
    const img = $('img', box);
    if (!img) return;
    const done = () => box.classList.add('is-loaded');
    if (img.complete && img.naturalWidth) done();
    else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
  });

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(text) {
    $('#toast-text').textContent = text;
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), 2600);
  }
  $$('[data-toast]').forEach(el => el.addEventListener('click', () => toast(el.dataset.toast)));

  const copyBtn = $('#copy-email');
  copyBtn?.addEventListener('click', async () => {
    const icon = $('i', copyBtn);
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copy);
      icon.className = 'bi bi-check2';
      copyBtn.classList.add('is-done');
      copyBtn.dataset.tip = 'Copiado!';
      toast('E-mail copiado para a área de transferência');
      setTimeout(() => {
        icon.className = 'bi bi-copy';
        copyBtn.classList.remove('is-done');
        copyBtn.dataset.tip = 'Copiar e-mail';
      }, 1800);
    } catch (_) {
      toast(copyBtn.dataset.copy);
    }
  });

  /* ---------- Projetos: trilho, arraste, filtro ---------- */
  const track = $('#projects-track');
  const prev = $('#proj-prev');
  const next = $('#proj-next');
  const visibleCards = () => $$('.pcard:not(.is-hidden)', track);
  const step = () => (visibleCards()[0]?.offsetWidth || 236) + 24;

  function updateRail() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= maxScroll - 4;
    const total = visibleCards().length;
    const current = clamp(Math.round(track.scrollLeft / step()) + 1, 1, total);
    $('#proj-current').textContent = String(current).padStart(2, '0');
    $('#proj-total').textContent = String(total).padStart(2, '0');
    const p = maxScroll > 0 ? track.scrollLeft / maxScroll : 1;
    $('#proj-progress').style.transform = `scaleX(${(0.1 + p * 0.9).toFixed(3)})`;
  }
  prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
  next.addEventListener('click', () => track.scrollBy({ left: step() }));
  track.addEventListener('scroll', updateRail, { passive: true });
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: step() }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -step() }); }
  });
  window.addEventListener('resize', updateRail);
  updateRail();

  // arrastar com o mouse
  let drag = null;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = { x: e.clientX, left: track.scrollLeft, moved: false };
  });
  window.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; track.classList.add('is-dragging'); }
    if (drag.moved) track.scrollLeft = drag.left - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!drag) return;
    const moved = drag.moved;
    drag = null;
    if (moved) {
      // devolve o snap suavemente e bloqueia o clique acidental
      setTimeout(() => track.classList.remove('is-dragging'), 0);
    }
  });

  // filtros com indicador deslizante
  const indicator = $('#filter-indicator');
  const BASE = 100; // largura base do indicador no CSS
  function moveIndicator(btn, instant) {
    if (instant) indicator.style.transition = 'none';
    indicator.style.transform = `translateX(${btn.offsetLeft}px) scaleX(${(btn.offsetWidth / BASE).toFixed(3)})`;
    if (instant) { indicator.offsetWidth; indicator.style.transition = ''; }
  }
  const activeFilter = () => $('.filter.is-active');
  const placeIndicator = () => moveIndicator(activeFilter(), true);
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(placeIndicator);
  placeIndicator();
  window.addEventListener('resize', placeIndicator);

  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    if (btn.classList.contains('is-active')) return;
    const f = btn.dataset.filter;
    $$('.filter').forEach(b => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    moveIndicator(btn);
    let i = 0;
    $$('.pcard', track).forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      card.classList.toggle('is-hidden', !show);
      card.classList.remove('is-entering');
      if (show && !reduceMotion) {
        card.style.setProperty('--i', i++);
        card.offsetWidth; // reinicia a animação
        card.classList.add('is-entering');
      }
    });
    track.scrollTo({ left: 0, behavior: 'auto' });
    updateRail();
  }));

  /* ---------- Carrossel de certificados ---------- */
  const carousel = $('#cert-carousel');
  const stage = $('#cert-stage');
  const cards = $$('.ccard', stage);
  const dotsWrap = $('#cert-dots');
  let current = 0;
  let autoplay;

  cards.forEach((card, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Item ${i + 1} de ${cards.length}`);
    b.addEventListener('click', () => { go(i); restart(); });
    dotsWrap.appendChild(b);
  });

  function go(i) {
    current = (i + cards.length) % cards.length;
    cards.forEach((card, idx) => {
      let pos = idx - current;
      if (pos > cards.length / 2) pos -= cards.length;
      if (pos < -cards.length / 2) pos += cards.length;
      card.style.setProperty('--pos', pos);
      card.style.setProperty('--abs', Math.min(Math.abs(pos), 2));
      card.classList.toggle('is-current', pos === 0);
      card.setAttribute('aria-hidden', String(pos !== 0));
      card.tabIndex = pos === 0 ? 0 : -1;
    });
    $$('button', dotsWrap).forEach((d, idx) => d.setAttribute('aria-selected', String(idx === current)));
  }
  go(0);

  function restart() {
    clearInterval(autoplay);
    if (!reduceMotion) autoplay = setInterval(() => go(current + 1), 5500);
  }
  restart();
  $('#cert-prev').addEventListener('click', () => { go(current - 1); restart(); });
  $('#cert-next').addEventListener('click', () => { go(current + 1); restart(); });
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { go(current + 1); restart(); }
    if (e.key === 'ArrowLeft') { go(current - 1); restart(); }
  });
  carousel.addEventListener('pointerenter', () => clearInterval(autoplay));
  carousel.addEventListener('pointerleave', restart);
  carousel.addEventListener('focusin', () => clearInterval(autoplay));
  document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(autoplay) : restart());

  // swipe / arraste
  let swipe = null;
  let swiped = false;
  stage.addEventListener('pointerdown', e => { swipe = { x: e.clientX, y: e.clientY }; swiped = false; });
  stage.addEventListener('pointerup', e => {
    if (!swipe) return;
    const dx = e.clientX - swipe.x;
    const dy = e.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiped = true;
      go(current + (dx < 0 ? 1 : -1));
      restart();
    }
  });

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
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    clearInterval(autoplay);
    $('#modal-close').focus();
  }
  function closeModal() {
    modal.classList.remove('is-open');
    setTimeout(() => { modal.hidden = true; }, 320);
    document.body.style.overflow = '';
    lenis?.start();
    restart();
    lastFocus?.focus();
  }
  cards.forEach((card, idx) => card.addEventListener('click', () => {
    if (swiped) return;
    if (idx !== current) { go(idx); restart(); return; }
    openModal(card);
  }));
  $('#modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  modal.addEventListener('keydown', e => { if (e.key === 'Tab') { e.preventDefault(); $('#modal-close').focus(); } });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) closeModal();
    toggleMenu(false);
  });

  /* ---------- Contador de visitas ----------
     API gratuita Abacus (https://abacus.jasoncameron.dev).
     Conta 1 visita por sessão; acessos locais só leem o valor. */
  const COUNTER = 'https://abacus.jasoncameron.dev';
  const NAMESPACE = 'imcorrea-portfolio';
  const KEY = 'visitas';

  (async function visits() {
    const els = [$('#visits'), $('#badge-visits')];
    const fail = () => els.forEach(el => { el.hidden = true; });
    let counted = false;
    try { counted = sessionStorage.getItem('visit-counted') === '1'; } catch (_) {}
    if (['localhost', '127.0.0.1', ''].includes(location.hostname)) counted = true;
    try {
      const res = await fetch(`${COUNTER}/${counted ? 'get' : 'hit'}/${NAMESPACE}/${KEY}`);
      if (!res.ok) return fail();
      const { value } = await res.json();
      if (typeof value !== 'number') return fail();
      try { sessionStorage.setItem('visit-counted', '1'); } catch (_) {}
      const formatted = value.toLocaleString('pt-BR');
      $('#visits-count').textContent = formatted;
      $('#badge-visits-count').textContent = formatted;
      els.forEach(el => el.classList.remove('is-loading'));
    } catch (_) {
      fail();
    }
  })();
})();
