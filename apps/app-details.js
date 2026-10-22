/**
 * app-details.js
 * Gerenciador de tema (claro/escuro), internacionalização (PT/EN) e interações das subpáginas.
 * Integrado ao ecossistema fernandoncidade.
 */

(function () {
  'use strict';

  const THEME_KEY = 'fcc_theme';
  const LANG_KEY = 'fcc_lang';

  // 1. Notificação Toast
  function showToast(msg, duration = 2000) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast.__tid);
    toast.__tid = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // 2. Tema Claro / Escuro
  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);

    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
      const isEn = document.documentElement.lang.startsWith('en');
      if (isDark) {
        themeBtn.innerHTML = `☀️ <span class="btn-text">${isEn ? 'Light' : 'Claro'}</span>`;
        themeBtn.title = isEn ? 'Switch to Light Mode' : 'Alternar para Tema Claro';
      } else {
        themeBtn.innerHTML = `🌙 <span class="btn-text">${isEn ? 'Dark' : 'Escuro'}</span>`;
        themeBtn.title = isEn ? 'Switch to Dark Mode' : 'Alternar para Tema Escuro';
      }
    }

    // Sincroniza estado de tema diretamente no modal de imagem ampliada (lightbox)
    const lb = document.getElementById('carousel-lightbox');
    if (lb) {
      lb.classList.toggle('dark', isDark);
    }
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
    const isEn = document.documentElement.lang.startsWith('en');
    showToast(isEn ? `Theme: ${nextTheme === 'dark' ? 'Dark' : 'Light'}` : `Tema: ${nextTheme === 'dark' ? 'Escuro' : 'Claro'}`);
  }

  const PAGE_TITLES = {
    'linceu-lighthouse.html': {
      pt: 'Linceu Lighthouse • Auditoria Forense e Monitoramento de Arquivos em C++',
      en: 'Linceu Lighthouse • Forensic File Audit & Directory Monitoring in C++'
    },
    'acl-auditor.html': {
      pt: 'ACL Auditor • Auditoria de Permissões NTFS e Segurança Corporativa em C++20',
      en: 'ACL Auditor • NTFS Permissions & Enterprise Security Auditing in C++20'
    },
    'munin-app.html': {
      pt: 'Munin App • Visualizador de Logs Massivos, SIMD e Regex em C++20',
      en: 'Munin App • Massive Log Viewer, SIMD & Regex in C++20'
    },
    'eisenpo.html': {
      pt: 'EisenPo • Matriz de Eisenhower, Pomodoro e Técnica Feynman em C++',
      en: 'EisenPo • Eisenhower Matrix, Pomodoro & Feynman Technique in C++'
    },
    'lumen.html': {
      pt: 'Lúmen • Acessibilidade Cognitiva, TEA, TDAH e Método Feynman em C++',
      en: 'Lumen • Cognitive Accessibility, ASD, ADHD & Feynman Method in C++'
    },
    'eisenhower-organizer.html': {
      pt: 'Eisenhower Organizer • Gestão Ágil e Leve de Prioridades em C++',
      en: 'Eisenhower Organizer • Lightweight & Fast Priority Management in C++'
    },
    'compression-manager.html': {
      pt: 'COMPRESSION MANAGER • Automação de Backups e Compactação AES-256 em Python e Qt',
      en: 'COMPRESSION MANAGER • Automated Backup & AES-256 Compression in Python & Qt'
    },
    'economia-app.html': {
      pt: 'Economia APP • Engenharia Econômica, VPL, TIR e Amortização SAC/Price',
      en: 'Economia APP • Engineering Economics, NPV, IRR & Amortization SAC/Price'
    },
    'launcher-ebook.html': {
      pt: 'Launcher EBook • Gerenciador de Livros Digitais e PDFs em C++17',
      en: 'Launcher EBook • Digital Books & PDF Cataloging Manager in C++17'
    },
    'compare-following-follower.html': {
      pt: 'Compare Following & Follower • Auditoria de Conexões do GitHub em Python',
      en: 'Compare Following & Follower • GitHub Network Audit in Python'
    },
    'agenda-avaliacoes-academicas.html': {
      pt: 'Agenda Avaliações Acadêmicas • Gestão de Provas, Médias e Semestre em Python',
      en: 'Academic Evaluations Scheduler • Semester Exams & Grades Manager in Python'
    }
  };

  // 3. Internacionalização (PT / EN)
  function applyLanguage(langCode) {
    const isEn = langCode === 'en' || langCode === 'enus';
    document.documentElement.lang = isEn ? 'en' : 'pt-br';

    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) {
      langBtn.innerHTML = `🌐 <span class="btn-text">${isEn ? 'PT-BR' : 'EN-US'}</span>`;
      langBtn.title = isEn ? 'Mudar para Português' : 'Switch to English';
    }

    // Atualiza título da página dinamicamente
    const currentPath = window.location.pathname.split('/').pop();
    if (PAGE_TITLES[currentPath]) {
      document.title = isEn ? PAGE_TITLES[currentPath].en : PAGE_TITLES[currentPath].pt;
    }

    // Atualiza botão de tema com texto do novo idioma
    const currentTheme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    applyTheme(currentTheme);
  }

  function toggleLanguage() {
    const currentLang = document.documentElement.lang.startsWith('en') ? 'en' : 'pt';
    const nextLang = currentLang === 'en' ? 'pt' : 'en';
    const storageCode = nextLang === 'en' ? 'enus' : 'ptbr';
    localStorage.setItem(LANG_KEY, storageCode);
    applyLanguage(storageCode);
    showToast(nextLang === 'en' ? 'Language: English' : 'Idioma: Português');
  }

  // 4. Voltar ao Topo
  function setupBackToTop() {
    const btnTop = document.getElementById('btn-top');
    if (!btnTop) return;

    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      if (scrollPos > 280) {
        btnTop.classList.add('show');
      } else {
        btnTop.classList.remove('show');
      }
    });
  }

  // 5. Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    // Carrega idioma salvo ou detecta do sistema
    const savedLang = localStorage.getItem(LANG_KEY) || 'ptbr';
    applyLanguage(savedLang);

    // Carrega tema salvo
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);

    // Botões
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLanguage);
    }

    setupBackToTop();
    setupAppCarousels();
  });

  // Sincronização ao retornar pelo histórico de navegação (BFCache)
  window.addEventListener('pageshow', () => {
    const savedLang = localStorage.getItem(LANG_KEY) || 'ptbr';
    applyLanguage(savedLang);
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
  });

  // ====================================================================
  // 6. Sistema Universal de Carrossel de Capturas de Tela & Lightbox
  // ====================================================================
  let activeLightboxCarousel = null;

  function createGlobalLightbox() {
    let lb = document.getElementById('carousel-lightbox');
    if (lb) return lb;

    lb = document.createElement('div');
    lb.id = 'carousel-lightbox';
    lb.className = 'carousel-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Visualizador de Imagem em Tela Cheia');

    lb.innerHTML = `
      <button type="button" class="carousel-lightbox-close" aria-label="Fechar">&times;</button>
      <button type="button" class="carousel-lightbox-nav prev" aria-label="Imagem Anterior">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <img src="" alt="" class="carousel-lightbox-img">
      <button type="button" class="carousel-lightbox-nav next" aria-label="Próxima Imagem">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
      <div class="carousel-lightbox-caption"></div>
    `;

    document.body.appendChild(lb);

    // Inicializa tema no lightbox
    const isDark = document.body.classList.contains('dark') || (localStorage.getItem(THEME_KEY) === 'dark');
    lb.classList.toggle('dark', isDark);

    const closeBtn = lb.querySelector('.carousel-lightbox-close');
    const prevBtn = lb.querySelector('.carousel-lightbox-nav.prev');
    const nextBtn = lb.querySelector('.carousel-lightbox-nav.next');

    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      activeLightboxCarousel = null;
    }

    closeBtn.addEventListener('click', close);

    lb.addEventListener('click', (e) => {
      if (e.target === lb) close();
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeLightboxCarousel) activeLightboxCarousel.prev();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeLightboxCarousel) activeLightboxCarousel.next();
    });

    window.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowLeft') {
        if (activeLightboxCarousel) activeLightboxCarousel.prev();
      } else if (e.key === 'ArrowRight') {
        if (activeLightboxCarousel) activeLightboxCarousel.next();
      }
    });

    return lb;
  }

  function setupAppCarousels() {
    const carousels = document.querySelectorAll('.app-carousel');
    if (!carousels.length) return;

    const lightbox = createGlobalLightbox();
    const lbImg = lightbox.querySelector('.carousel-lightbox-img');
    const lbCaption = lightbox.querySelector('.carousel-lightbox-caption');

    carousels.forEach((carousel) => {
      const track = carousel.querySelector('.carousel-track');
      if (!track) return;

      const viewport = carousel.querySelector('.carousel-viewport');
      const allSlides = Array.from(carousel.querySelectorAll('.carousel-slide'));
      const prevBtn = carousel.querySelector('.carousel-nav-btn.prev');
      const nextBtn = carousel.querySelector('.carousel-nav-btn.next');
      const dotsContainer = carousel.querySelector('.carousel-dots');
      const allThumbs = Array.from(carousel.querySelectorAll('.carousel-thumb-btn'));
      const counterEl = carousel.querySelector('.carousel-counter');
      const captionEl = carousel.querySelector('.carousel-caption');
      const zoomTrigger = carousel.querySelector('.carousel-zoom-trigger');
      const filterBtns = Array.from(carousel.querySelectorAll('.carousel-filter-btn'));

      let currentIndex = 0;
      let activeCategory = 'all';

      function getVisibleSlides() {
        if (activeCategory === 'all') return allSlides;
        return allSlides.filter(s => s.dataset.category === activeCategory);
      }

      function getVisibleThumbs() {
        if (activeCategory === 'all') return allThumbs;
        return allThumbs.filter(t => t.dataset.category === activeCategory);
      }

      function updateDots(visibleCount) {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < visibleCount; i++) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
          dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
          dot.addEventListener('click', () => goTo(i));
          dotsContainer.appendChild(dot);
        }
      }

      function syncLightbox() {
        if (activeLightboxCarousel && activeLightboxCarousel.id === carousel) {
          const visibleSlides = getVisibleSlides();
          const curSlide = visibleSlides[currentIndex];
          if (curSlide) {
            const img = curSlide.querySelector('.carousel-img');
            lbImg.src = img ? (img.getAttribute('src') || '') : '';
            lbImg.alt = img ? (img.getAttribute('alt') || '') : '';
            const cap = curSlide.dataset.caption || (img ? img.getAttribute('alt') : '');
            lbCaption.textContent = cap || '';
          }
        }
      }

      function goTo(index) {
        const visibleSlides = getVisibleSlides();
        const visibleThumbs = getVisibleThumbs();
        if (!visibleSlides.length) return;

        currentIndex = (index + visibleSlides.length) % visibleSlides.length;

        // Reposiciona o track
        // Slides ocultos com display:none não ocupam espaço no fluxo flex,
        // portanto o deslocamento correto para o slide visível é baseado no currentIndex visível.
        const targetSlide = visibleSlides[currentIndex];
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Atualiza contador
        if (counterEl) {
          counterEl.textContent = `${currentIndex + 1} / ${visibleSlides.length}`;
        }

        // Atualiza legenda
        if (captionEl) {
          const img = targetSlide.querySelector('.carousel-img');
          captionEl.textContent = targetSlide.dataset.caption || (img ? img.getAttribute('alt') : '') || '';
        }

        // Atualiza dots
        if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll('.carousel-dot');
          dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        }

        // Atualiza thumbs
        allThumbs.forEach(t => t.classList.remove('active'));
        if (visibleThumbs[currentIndex]) {
          visibleThumbs[currentIndex].classList.add('active');
          visibleThumbs[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        syncLightbox();
      }

      function next() { goTo(currentIndex + 1); }
      function prev() { goTo(currentIndex - 1); }

      // Listeners dos botões
      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);

      // Thumbs
      allThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const visibleThumbs = getVisibleThumbs();
          const targetIndex = visibleThumbs.indexOf(thumb);
          if (targetIndex !== -1) goTo(targetIndex);
        });
      });

      // Filtros de módulo
      if (filterBtns.length) {
        filterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category || 'all';

            allSlides.forEach(slide => {
              const match = activeCategory === 'all' || slide.dataset.category === activeCategory;
              slide.classList.toggle('hidden-by-filter', !match);
            });

            allThumbs.forEach(thumb => {
              const match = activeCategory === 'all' || thumb.dataset.category === activeCategory;
              thumb.classList.toggle('hidden-by-filter', !match);
            });

            const visibleSlides = getVisibleSlides();
            updateDots(visibleSlides.length);
            goTo(0);
          });
        });
      }

      // Toque / Swipe para Mobile
      if (viewport) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;

        viewport.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
          touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          const touchEndY = e.changedTouches[0].screenY;
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;

          // Se movimento horizontal foi maior que vertical e superior a 40px
          if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
            if (diffX < 0) next();
            else prev();
          }
        }, { passive: true });
      }

      // Abertura do Lightbox
      function openLightbox() {
        const visibleSlides = getVisibleSlides();
        const curSlide = visibleSlides[currentIndex];
        if (!curSlide) return;

        // Garante que o tema ativo (claro ou escuro) esteja aplicado ao modal
        const isDark = document.body.classList.contains('dark') || (localStorage.getItem(THEME_KEY) === 'dark');
        lightbox.classList.toggle('dark', isDark);

        activeLightboxCarousel = { id: carousel, next, prev, goTo };
        syncLightbox();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      if (zoomTrigger) {
        zoomTrigger.addEventListener('click', openLightbox);
      }

      allSlides.forEach(slide => {
        slide.addEventListener('click', openLightbox);
      });

      // Inicializa dots e slide inicial
      updateDots(getVisibleSlides().length);
      goTo(0);
    });
  }
})();
