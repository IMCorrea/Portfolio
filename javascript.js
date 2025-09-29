/* ========= Config & util ========= */
document.addEventListener('DOMContentLoaded', () => {
  // Atualiza ano no rodapé
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menu mobile
  const btnOpen = document.getElementById('btn-menu');
  const btnClose = document.getElementById('btn-close');
  const menuMobile = document.getElementById('menu-mobile');
  const overlayMenu = document.getElementById('overlay-menu');
  const body = document.body;

  function openMenu(){
    menuMobile.classList.add('active');
    overlayMenu.classList.add('active');
    menuMobile.setAttribute('aria-hidden','false');
    overlayMenu.setAttribute('aria-hidden','false');
    body.style.overflow = 'hidden';
  }
  function closeMenu(){
    menuMobile.classList.remove('active');
    overlayMenu.classList.remove('active');
    menuMobile.setAttribute('aria-hidden','true');
    overlayMenu.setAttribute('aria-hidden','true');
    body.style.overflow = '';
  }

  btnOpen?.addEventListener('click', openMenu);
  btnClose?.addEventListener('click', closeMenu);
  overlayMenu?.addEventListener('click', closeMenu);

  // Fecha menu ao clicar em links móveis
  document.querySelectorAll('.menu-mobile nav a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Scroll progress
  const progress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = (scrollTop / Math.max(1, height)) * 100;
    progress.style.width = pct + '%';
  });

  // Typing effect (loop de frases)
  const roles = ["Analista de TI", "Power BI — Dashboards", "Infraestrutura & Redes"];
  const typedEl = document.getElementById('typed-roles');
  let rIndex = 0, cIndex = 0, forward = true, delay = 60;

  function tick(){
    if(!typedEl) return;
    const current = roles[rIndex];
    if(forward){
      typedEl.textContent = current.slice(0, cIndex + 1);
      cIndex++;
      if(cIndex === current.length){
        forward = false;
        setTimeout(tick, 900);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, cIndex - 1);
      cIndex--;
      if(cIndex === 0){
        forward = true;
        rIndex = (rIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, forward ? delay : 30);
  }
  tick();

  // IntersectionObserver para revelar seções
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Modal de certificados
  const modal = document.getElementById('certificado-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDetails = document.getElementById('modal-details');
  const closeModalBtn = modal?.querySelector('.close-modal');

  function openCertModal(img, title, details){
    if(!modal) return;
    modalImg.src = img;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDetails.textContent = details;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden','false');
    body.style.overflow = 'hidden';
    // focus
    closeModalBtn?.focus();
  }
  function closeCertModal(){
    if(!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
    body.style.overflow = '';
  }

  document.querySelectorAll('.certificado-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.dataset.img;
      const title = card.dataset.title || card.querySelector('h3')?.textContent || '';
      const details = card.dataset.details || '';
      openCertModal(img, title, details);
    });
    // abrir com Enter
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  closeModalBtn?.addEventListener('click', closeCertModal);
  modal?.addEventListener('click', (e) => {
    if(e.target === modal) closeCertModal();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeCertModal();
  });

  // Pequena validação visual do form (obrigatório)
  const form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', (e) => {
      // se precisar de validação custom, coloque aqui. Mantemos envio padrão para formsubmit.co
    });
  }

});
