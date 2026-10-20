
/* =========================================================
   MODELO 03 — DIREITO EMPRESARIAL
   Menu mobile, cabeçalho, ano do rodapé e acessibilidade.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const yearElement = document.querySelector("#ano-atual");

  // Atualiza automaticamente o ano do rodapé.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Efeito discreto no cabeçalho durante a rolagem.
  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 25);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Menu para celular.
  const closeMenu = () => {
    if (!menuButton || !navigation) return;

    menuButton.classList.remove("active");
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuButton || !navigation) return;

    menuButton.classList.add("active");
    navigation.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Fechar menu");
    document.body.classList.add("menu-open");
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Fecha o menu depois que o visitante escolhe uma seção.
    navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Fecha o menu ao clicar fora dele.
    document.addEventListener("click", (event) => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (
        isOpen &&
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Fecha com a tecla Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });

    // Fecha o menu se a janela passar para o layout desktop.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // Animação suave para links internos.
  // Mantém o funcionamento normal caso o navegador não suporte o recurso.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      // Atualiza o endereço da seção sem recarregar a página.
      if (history.replaceState) {
        history.replaceState(null, "", targetId);
      }
    });
  });
});
