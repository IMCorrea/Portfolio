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

  document.querySelectorAll('.card, .projeto, .certificado-card, .habilidades ul li').forEach(item => {
    observer.observe(item);
  });

  // Modal de Certificados
  const modal = document.getElementById("certificado-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDetails = document.getElementById("modal-details");
  const closeModal = document.querySelector(".close-modal");
  const certificadoCards = document.querySelectorAll(".certificado-card");

  // Abrir modal ao clicar em um certificado
  certificadoCards.forEach(card => {
    card.addEventListener("click", function() {
      const imgSrc = this.getAttribute("data-img");
      const title = this.querySelector("h3").textContent;
      const details = this.querySelector("p").textContent;
      
      modalImg.src = imgSrc;
      modalTitle.textContent = title;
      modalDetails.textContent = details;
      
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Impede rolagem da página
    });
  });

  // Fechar modal
  closeModal.addEventListener("click", function() {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restaura rolagem da página
  });

  // Fechar modal ao clicar fora da imagem
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Fechar modal com tecla ESC
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});