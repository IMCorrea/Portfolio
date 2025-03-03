document.addEventListener("DOMContentLoaded", function () {
  // Menu Mobile
  const btnMenu = document.getElementById("btn-menu");
  const menuMobile = document.querySelector(".menu-mobile");
  const overlayMenu = document.querySelector(".overlay-menu");
  const btnFechar = document.querySelector(".btn-fechar");
  const menuLinks = document.querySelectorAll(".menu-mobile nav ul li a");

  function toggleMenu() {
    menuMobile.classList.toggle("active");
    overlayMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  btnMenu.addEventListener("click", toggleMenu);
  btnFechar.addEventListener("click", toggleMenu);
  overlayMenu.addEventListener("click", toggleMenu);

  // Fechar menu ao clicar em um link
  menuLinks.forEach(link => {
    link.addEventListener("click", toggleMenu);
  });

  // Animação de scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animação de entrada para elementos quando visíveis
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .projeto, .habilidades ul li').forEach(item => {
    observer.observe(item);
  });
});