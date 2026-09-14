(function(){
  'use strict';

  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#menu-principal');
  const header = document.querySelector('.header');

  // Menu mobile
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Barra de progresso da leitura
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);

  // Botão voltar ao topo
  const backTop = document.createElement('button');
  backTop.className = 'back-top';
  backTop.type = 'button';
  backTop.setAttribute('aria-label', 'Voltar ao topo');
  backTop.innerHTML = '↑';
  document.body.appendChild(backTop);
  backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Brilho sutil que acompanha o mouse em telas grandes
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  const desktopPointer = window.matchMedia('(pointer:fine)');
  if (desktopPointer.matches) {
    window.addEventListener('pointermove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.style.opacity = '1';
    }, {passive:true});
    window.addEventListener('pointerleave', () => glow.style.opacity = '0');
  }

  // Elementos entram suavemente conforme aparecem
  const revealTargets = document.querySelectorAll(
    '.intro-grid > *, .feature-grid article, .heading-row > *, .model-card, .price-card, .price-side, .steps article, .faq-grid > *, .contact-inner > *'
  );
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 4 === 1) el.classList.add('delay-1');
    if (i % 4 === 2) el.classList.add('delay-2');
    if (i % 4 === 3) el.classList.add('delay-3');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  revealTargets.forEach(el => observer.observe(el));

  // Header, progresso e botão voltar ao topo
  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = percent + '%';
    header?.classList.toggle('scrolled', window.scrollY > 35);
    backTop.classList.toggle('show', window.scrollY > 650);
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, {passive:true});

  // Destaca a seção atual no menu
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, {rootMargin:'-35% 0px -55% 0px', threshold:0});
  sections.forEach(section => sectionObserver.observe(section));

  // Efeito 3D muito discreto no preview principal
  const heroCard = document.querySelector('.hero-card');
  const browser = document.querySelector('.hero-card .browser');
  if (heroCard && browser && desktopPointer.matches) {
    heroCard.addEventListener('pointermove', e => {
      const r = heroCard.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      browser.style.transform = `perspective(1000px) rotateY(${x*3}deg) rotateX(${-y*3}deg) rotateZ(1deg)`;
    });
    heroCard.addEventListener('pointerleave', () => {
      browser.style.transform = 'rotate(1deg)';
    });
  }

  // Ripple elegante nos botões
  document.querySelectorAll('.button, .contact-button, .nav-button').forEach(button => {
    button.addEventListener('click', e => {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Pequeno parallax na forma do hero
  const shape = document.querySelector('.hero-shape');
  if (shape && desktopPointer.matches) {
    window.addEventListener('scroll', () => {
      shape.style.marginTop = Math.min(window.scrollY * .08, 55) + 'px';
    }, {passive:true});
  }
})();
