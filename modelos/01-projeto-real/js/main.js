/* ============================================================
   JURIS PAGE - MODELO EXECUTIVO (CLIENTE)
   Funcionalidades: Animações, Rastreamento e Interatividade
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // 1. RASTREAMENTO DE CLIQUES NO WHATSAPP
    // Seleciona todos os botões que levam ao WhatsApp na página
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log('Clique em conversão para WhatsApp detectado!');

            // Se o cliente utilizar Google Ads ou Meta Ads no futuro, o evento é enviado aqui:
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/LABEL'
                });
            }

            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact');
            }
        });
    });


    // 2. ANIMAÇÃO DE REVELAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL)
    // Seleciona os elementos que vão animar ao entrar na tela
    const animatedElements = document.querySelectorAll('.practice-card, .step-card, .stat-item');

    // Configura o observador de interseção
    const observerOptions = {
        root: null,
        threshold: 0.15, // Anima quando 15% do elemento aparece na tela
        rootMargin: '0px 0px -50px 0px'
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    // Prepara a estilização inicial dos elementos via JS
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        elementObserver.observe(element);
    });

    // Adiciona classe de visibilidade para acionar a transição
    document.addEventListener('scroll', () => {
        animatedElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });


    // 3. EFEITO DE SOMBRA NO NAVBAR AO ROLAR A PÁGINA
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.borderColor = 'rgba(212, 175, 55, 0.2)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.borderColor = 'var(--border-color)';
        }
    });

});