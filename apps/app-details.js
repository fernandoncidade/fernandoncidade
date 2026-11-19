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
    'omniframe-3d.html': {
      pt: 'OmniFrame 3D • Análise Estrutural Tridimensional por Elementos Finitos em C++23, Qt 6.11.1, Eigen & OpenGL 3.3',
      en: 'OmniFrame 3D • 3D Finite Element Structural Analysis in C++23, Qt 6.11.1, Eigen & OpenGL 3.3'
    },
    'linceu-lighthouse.html': {
      pt: 'Linceu Lighthouse • Auditoria Forense e Monitoramento de Arquivos em C++23 e Qt 6.11.1',
      en: 'Linceu Lighthouse • Forensic File Audit & Directory Monitoring in C++23 & Qt 6.11.1'
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
    },
    'huginn.html': {
      pt: 'Huginn Sentinel • Monitoramento do Sistema de Arquivos, Histórico e Auditoria em Rust',
      en: 'Huginn Sentinel • File System Monitoring, History & Deterministic Audit in Rust'
    },
    'eolo-platform.html': {
      pt: 'Eolo Platform • Ações de Vento em Edificações conforme ABNT NBR 6123:2023 em Rust',
      en: 'Eolo Platform • Wind Loads on Buildings per ABNT NBR 6123:2023 in Rust'
    },
    'geoestabil.html': {
      pt: 'GeoEstabil • Estabilidade de Taludes, Muros de Arrimo e Fundações conforme ABNT NBR 11682/6122/6118 em Rust',
      en: 'GeoEstabil • Slope Stability, Retaining Walls & Foundations per ABNT NBR 11682/6122/6118 in Rust'
    },
    'concrete_mix_design.html': {
      pt: 'Concrete Mix Designer • Dosagem Experimental de Concreto pelo Método IPT/EPUSP em C++20',
      en: 'Concrete Mix Designer • Experimental Concrete Proportioning via IPT/EPUSP in C++20'
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

    // Sincroniza textos do modal de contato direto quando presente
    if (document.getElementById('message-dialog')) {
      updateContactModalLocale();
    }
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
    setupAuthorSkillsSection();
    setupDirectContactModal();
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
      <div class="carousel-lightbox-footer">
        <div class="carousel-lightbox-caption"></div>
        <div class="carousel-lightbox-dots" role="tablist" aria-label="Navegação de imagens"></div>
      </div>
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
    const lbDots = lightbox.querySelector('.carousel-lightbox-dots');

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
          if (lbDots) {
            const existingDots = lbDots.querySelectorAll('.carousel-dot');
            if (existingDots.length !== visibleSlides.length) {
              lbDots.innerHTML = '';
              for (let i = 0; i < visibleSlides.length; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
                dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
                dot.addEventListener('click', (e) => {
                  e.stopPropagation();
                  if (activeLightboxCarousel) activeLightboxCarousel.goTo(i);
                });
                lbDots.appendChild(dot);
              }
            } else {
              existingDots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
            }
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

        if (lbDots) lbDots.innerHTML = '';
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

  // ====================================================================
  // 7. Seção de Habilidades e Engenharia de Software do Autor (PT-BR / EN-US)
  // ====================================================================
  const AUTHOR_SKILLS_DATA = {
    pt: {
      heading: 'Habilidades & Engenharia de Software do Autor',
      intro: 'Competências técnicas construídas de forma 100% autodidata e movidas por intensa curiosidade científica, paralelamente à minha graduação no Bacharelado em Engenharia Civil pela UFPR. Clique no título de qualquer habilidade abaixo para abrir sua tela exclusiva com a descrição completa de arquitetura, design de código, estruturas de dados, algoritmos e boas práticas:',
      items: [
        { slug: 'linguagens-compiladores', icon: '💻', category: 'Linguagens de Programação, Compiladores & Padrões', text: 'Domínio autodidata de C++ (C++17/C++20/C++23 — STL, templates, concepts, std::span), Rust (Edições 2021/2024 — ownership, lifetimes, traits e binários CLI/GUI), C (C99/C11), Python (3.10+ — Type Hints, PEP 8) e Tecnologias Web (HTML5, CSS3, JS ES6+) com toolchains MSVC 2022, Clang/LLVM, MinGW-w64, Cargo e CMake.' },
        { slug: 'arquitetura-software', icon: '🏛️', category: 'Arquitetura de Software & Padrões de Projeto', text: 'Arquitetura Limpa e em Camadas (Apresentação, Domínio e Persistência), Orientação a Eventos (Signals & Slots), Modelo de Atores e Produtor-Consumidor (DbWriter), Model-View-Delegate, janelas não-modais (Modeless Dialogs), sistemas modulares, I18N bilíngue em tempo real e arquitetura 100% Local-First / Zero-Trust Offline.' },
        { slug: 'design-codigo-boas-praticas', icon: '🧩', category: 'Design de Código, Lógica Computacional & Boas Práticas', text: 'Aplicação rigorosa de SOLID, Clean Code, DRY, KISS e YAGNI, gestão determinística de recursos via RAII e smart pointers, semântica Move e Zero-Copy, Fearless Concurrency sem data races, contratos defensivos, persistência transacional atômica contra quedas de energia (ReplaceFileW / ACID) e 13 apps na Microsoft Store.' },
        { slug: 'estruturas-dados-algoritmos', icon: '🧮', category: 'Estruturas de Dados, Algoritmos & Complexidade', text: 'Ring Buffers e canais lock-free MPMC, Hash Sets/Maps com busca O(1), árvores DOM/SAX/NTFS, grafos dirigidos por forças físicas, compressão LZ77 e LZMA, autômatos Regex JIT (PCRE2), solvers esparsos via Eigen (Cholesky LDLT/SparseLU), polinômios de Hermite, métodos numéricos (Newton-Raphson/Brent-Dekker) e Thread Pools Work-Stealing (Rayon).' },
        { slug: 'engenharia-computacao-baixo-nivel', icon: '⚡', category: 'Engenharia de Computação, Baixo Nível, SIMD & Paralelismo', text: 'Programação próxima ao hardware x86-64, Memory-Mapped Files (CreateFileMappingW / MapViewOfFile) para abertura instantânea de múltiplos gigabytes com RAM constante, vetorização SIMD de 256/128 bits (AVX2, SSE4.2 > 3,0 GB/s), I/O assíncrono de kernel sub-milissegundo, ponto flutuante IEEE 754 e integração Win32 API.' },
        { slug: 'interfaces-graficas-gpu', icon: '🎨', category: 'Engenharia de Interfaces Gráficas (GUI), GPU & UX', text: 'Desenvolvimento desktop nativo com Qt 6/6.11 (Widgets, Charts, QGraphicsView, QPainter, QPdfWriter, QSS e Windows 11 Mica), interfaces reativas em modo imediato em Rust com egui/eframe, renderização 2D/3D acelerada por GPU (OpenGL 3.3 Core com SSAA/MSAA/SDF, WGPU, DirectX 12 e Vulkan a 60 FPS), PySide6/PyQt6/Tkinter e suporte HiDPI/4K.' },
        { slug: 'ciberseguranca-auditoria-forense', icon: '🛡️', category: 'Cibersegurança, Auditoria Forense, Criptografia & FIM', text: 'Monitoramento de integridade em tempo real (FIM) com correlação semântica no kernel, análise binária de descritores NTFS/SMB (DACL, SACL, SIDs), simulação do Security Reference Monitor para Acesso Efetivo, detecção de escalonamento de privilégios, remediação com rollback icacls, SHA-256, AES-256-CBC/GCM e LGPD/GDPR/ISO 27001.' },
        { slug: 'engenharia-civil-computacional', icon: '🏗️', category: 'Engenharia Civil, Estrutural & Geotécnica Computacional', text: 'Modelagem matemática e verificação normativa ABNT NBR: análise estrutural 3D por Elementos Finitos (OmniFrame 3D — 1D/2D/3D, NBR 8800/6118/6120/7480), ação de ventos (NBR 6123), estabilidade de taludes e fundações (Bishop, Fellenius, Janbu, Rankine, Coulomb, Hansen/Meyerhof — NBR 11682/6122), muros em concreto armado (NBR 6118) e dosagem IPT/EPUSP (NBR 12655).' },
        { slug: 'engenharia-economica-ciencia-dados', icon: '📊', category: 'Engenharia Econômica, Finanças, Ciência de Dados & BDs', text: 'Modelagem financeira com arredondamento ABNT, amortização (SAC, Price, SAM, Bullet), viabilidade econômica (VPL, TIR, MTIR, VAUE, Payback), bancos embarcados SQLite3 em modo WAL concorrente, ciência de dados e BI em Python (Taipy, Streamlit, Plotly, Pandas, SciPy), Curva ABC/Pareto e relatórios PDF A4 300 DPI, XLSX e SVG.' },
        { slug: 'acessibilidade-cognitiva-produtividade', icon: '♿', category: 'Acessibilidade Cognitiva (A11y) & Produtividade Científica', text: 'Engenharia centrada em ergonomia cognitiva e neurodiversidade (TEA, TDAH e Dislexia) padrão W3C WCAG 2.1 AAA, síntese de voz neural offline (QTextToSpeech / SAPI5), navegação integral por teclado e leitores de tela (NVDA/MSAA), bibliotecas digitais (PDF/EPUB/MOBI) e metodologias Eisenhower, Pomodoro e Técnica Feynman.' }
      ]
    },
    en: {
      heading: 'Author\'s Skills & Software Engineering',
      intro: 'Technical competencies built through 100% self-taught study and driven by intense scientific curiosity, alongside my undergraduate studies in the Bachelor of Civil Engineering at UFPR. Click on any skill title below to open its dedicated screen with the complete description of architecture, code design, data structures, algorithms, and best practices:',
      items: [
        { slug: 'linguagens-compiladores', icon: '💻', category: 'Programming Languages, Compilers & Standards', text: 'Self-taught mastery of C++ (C++17/C++20/C++23 — STL, templates, concepts, std::span), Rust (2021/2024 Editions — ownership, lifetimes, traits, and native CLI/GUI binaries), C (C99/C11), Python (3.10+ — Type Hints, PEP 8), and Web Technologies (HTML5, CSS3, ES6+ JS) with MSVC 2022, Clang/LLVM, MinGW-w64, Cargo, and CMake toolchains.' },
        { slug: 'arquitetura-software', icon: '🏛️', category: 'Software Architecture & Design Patterns', text: 'Clean and Layered Architecture (Presentation, Domain, and Persistence), Event-Driven Design (Signals & Slots), Actor and Producer-Consumer Models (DbWriter), Model-View-Delegate, modeless window management (Modeless Dialogs), modular plugin systems, real-time bilingual I18N, and 100% Local-First / Zero-Trust Offline architecture.' },
        { slug: 'design-codigo-boas-praticas', icon: '🧩', category: 'Code Design, Computational Logic & Best Practices', text: 'Strict application of SOLID, Clean Code, DRY, KISS, and YAGNI, deterministic resource management via RAII and smart pointers, Move Semantics and Zero-Copy processing, data-race-free Fearless Concurrency, defensive contracts, power-safe atomic transactional persistence (ReplaceFileW / ACID), and 13 Microsoft Store apps.' },
        { slug: 'estruturas-dados-algoritmos', icon: '🧮', category: 'Data Structures, Algorithms & Complexity', text: 'Circular Ring Buffers and lock-free MPMC channels, Hash Sets/Maps with O(1) lookup, DOM/SAX/NTFS hierarchical trees, force-directed spatial graphs, LZ77 and LZMA lossless compression, JIT-compiled Regex automata (PCRE2), sparse FEA solvers via Eigen (Cholesky LDLT/SparseLU), cubic Hermite polynomials, numerical solvers (Newton-Raphson/Brent-Dekker), and Work-Stealing thread pools.' },
        { slug: 'engenharia-computacao-baixo-nivel', icon: '⚡', category: 'Computer Engineering, Low-Level Systems, SIMD & Parallelism', text: 'Hardware-close x86-64 systems programming, Memory-Mapped Files (CreateFileMappingW / MapViewOfFile) for instant multi-gigabyte opening with constant RAM, 256/128-bit SIMD CPU vectorization (AVX2, SSE4.2 > 3.0 GB/s), sub-millisecond asynchronous kernel I/O, IEEE 754 floating-point math, and native Win32 API integration.' },
        { slug: 'interfaces-graficas-gpu', icon: '🎨', category: 'GUI Engineering, GPU Rendering & User Experience', text: 'Native desktop development with Qt 6/6.11 (Widgets, Charts, QGraphicsView, QPainter, QPdfWriter, QSS, and Windows 11 Mica), immediate-mode reactive UIs in Rust with egui/eframe, hardware-accelerated 2D/3D GPU rendering (OpenGL 3.3 Core with SSAA/MSAA/SDF, WGPU, DirectX 12, and Vulkan at 60 FPS), PySide6/PyQt6/Tkinter, and crisp HiDPI/4K scaling.' },
        { slug: 'ciberseguranca-auditoria-forense', icon: '🛡️', category: 'Cybersecurity, Forensic Auditing, Cryptography & FIM', text: 'Real-time File Integrity Monitoring (FIM) with deterministic kernel correlation, binary analysis of NTFS/SMB security descriptors (DACL, SACL, SIDs), Security Reference Monitor emulation for Effective Access, privilege escalation detection, safe icacls rollback remediation, SHA-256, AES-256-CBC/GCM, and GDPR/LGPD/ISO 27001 compliance.' },
        { slug: 'engenharia-civil-computacional', icon: '🏗️', category: 'Computational Civil, Structural & Geotechnical Engineering', text: 'Analytical mathematical modeling and automated ABNT NBR compliance: 3D Finite Element structural analysis (OmniFrame 3D — 1D/2D/3D, NBR 8800/6118/6120/7480), wind actions (NBR 6123), slope stability and foundations (Bishop, Fellenius, Janbu, Rankine, Coulomb, Hansen/Meyerhof — NBR 11682/6122), retaining walls (NBR 6118), and IPT/EPUSP mix design (NBR 12655).' },
        { slug: 'engenharia-economica-ciencia-dados', icon: '📊', category: 'Engineering Economics, Finance, Data Science & Databases', text: 'Accounting-precision financial modeling with ABNT rounding, loan amortization (SAC, Price, SAM, Bullet), economic feasibility (NPV, IRR, MIRR, EUAW, Payback), embedded concurrent WAL SQLite3 databases, Python data science and BI (Taipy, Streamlit, Plotly, Pandas, SciPy), ABC/Pareto analytics, and 300 DPI A4 PDF, XLSX, and SVG reports.' },
        { slug: 'acessibilidade-cognitiva-produtividade', icon: '♿', category: 'Cognitive Accessibility (A11y) & Productivity Methodologies', text: 'Software engineering centered on cognitive ergonomics and neurodiversity (ASD, ADHD, and Dyslexia) under W3C WCAG 2.1 AAA, offline neural speech synthesis (QTextToSpeech / SAPI5), full keyboard navigation and screen reader integration (NVDA/MSAA), digital library cataloging (PDF/EPUB/MOBI), and Eisenhower, Pomodoro, and Feynman methodologies.' }
      ]
    }
  };

  function setupAuthorSkillsSection() {
    const mainContainer = document.querySelector('main.app-container');
    if (!mainContainer) return;

    let section = mainContainer.querySelector('.author-skills-section');
    if (!section) {
      section = document.createElement('section');
      section.className = 'author-skills-section';
      mainContainer.appendChild(section);
    }

    const ptItemsHtml = AUTHOR_SKILLS_DATA.pt.items
      .map(item => `<li><a href="../skills/${item.slug}.html" class="author-skill-link"><span>${item.icon} ${item.category}</span><span>→</span></a><span class="author-skill-summary">${item.text}</span></li>`)
      .join('');
    const enItemsHtml = AUTHOR_SKILLS_DATA.en.items
      .map(item => `<li><a href="../skills/${item.slug}.html" class="author-skill-link"><span>${item.icon} ${item.category}</span><span>→</span></a><span class="author-skill-summary">${item.text}</span></li>`)
      .join('');

    section.innerHTML = `<h2 class="section-heading"><span>🚀</span> <span class="lang-pt">${AUTHOR_SKILLS_DATA.pt.heading}</span><span class="lang-en">${AUTHOR_SKILLS_DATA.en.heading}</span></h2><p class="author-skills-intro lang-pt">${AUTHOR_SKILLS_DATA.pt.intro}</p><p class="author-skills-intro lang-en">${AUTHOR_SKILLS_DATA.en.intro}</p><ul class="author-skills-list lang-pt">${ptItemsHtml}</ul><ul class="author-skills-list lang-en">${enItemsHtml}</ul>`;
  }

  // ====================================================================
  // 8. Sistema Universal de Contato Direto (Modal + FormSubmit + Mailto)
  // ====================================================================
  const CONTACT_EMAIL = 'linceu_lighthouse@outlook.com';

  const REPO_APP_LIST = [
    { id: 'OmniFrame3D_cpp', name: 'OmniFrame 3D', repo: 'OmniFrame3D_cpp', hasDiscussion: true },
    { id: 'Linceu_Lighthouse_cpp', name: 'Linceu Lighthouse', repo: 'Linceu_Lighthouse_cpp', hasDiscussion: true },
    { id: 'ACL_Auditor_cpp', name: 'ACL Auditor', repo: 'ACL_Auditor_cpp', hasDiscussion: true },
    { id: 'Munin_App_cpp', name: 'Munin App', repo: 'Munin_App_cpp', hasDiscussion: true },
    { id: 'HuginnSentinel_rs', name: 'Huginn Sentinel', repo: 'HuginnSentinel_rs', hasDiscussion: true },
    { id: 'EoloPlatform_rs', name: 'Eolo Platform', repo: 'EoloPlatform_rs', hasDiscussion: true },
    { id: 'GeoEstabil_rs', name: 'GeoEstabil', repo: 'GeoEstabil_rs', hasDiscussion: true },
    { id: 'Concrete_Mix_Designer_cpp', name: 'Concrete Mix Designer', repo: 'Concrete_Mix_Designer_cpp', hasDiscussion: true },
    { id: 'Compression_Manager', name: 'COMPRESSION MANAGER', repo: 'Compression_Manager', hasDiscussion: true },
    { id: 'Economia_APP', name: 'Economia APP', repo: 'Economia_APP', hasDiscussion: true },
    { id: 'EisenPo', name: 'EisenPo', repo: '', hasDiscussion: false },
    { id: 'EISENHOWER_ORGANIZER', name: 'EISENHOWER ORGANIZER', repo: '', hasDiscussion: false },
    { id: 'Lumen', name: 'Lúmen', repo: '', hasDiscussion: false },
    { id: 'Launcher_EBook', name: 'Launcher EBook', repo: 'Launcher_EBook', hasDiscussion: true },
    { id: 'Agenda_Avaliacoes_Academicas', name: 'Agenda Avaliações Acadêmicas', name_en: 'Academic Evaluations Scheduler', repo: 'Agenda_Avaliacoes_Academicas', hasDiscussion: true },
    { id: 'Compare_Following_Follower', name: 'Compare - Following and Follower', repo: 'Compare_Following_Follower', hasDiscussion: true },
    { id: 'Programa_Urna_Eletronica', name: 'Programa Urna Eletrônica', name_en: 'Electronic Voting Machine Program', repo: 'Programa_Urna_Eletronica', hasDiscussion: true },
    { id: 'SlidingWindowLZ77_cpp', name: 'SlidingWindowLZ77_cpp', repo: 'SlidingWindowLZ77_cpp', hasDiscussion: true },
    { id: 'EcoLZMA_cpp', name: 'EcoLZMA_cpp', repo: 'EcoLZMA_cpp', hasDiscussion: true },
    { id: 'sloth-highlander-theme-1', name: 'sloth-highlander-theme-1', repo: 'sloth-highlander-theme-1', hasDiscussion: true },
    { id: 'Geral', name: 'Outro Repositório / Geral', name_en: 'Other Repository / General', repo: '', hasDiscussion: false }
  ];

  const PAGE_TO_REPO_ID = {
    'omniframe-3d.html': 'OmniFrame3D_cpp',
    'linceu-lighthouse.html': 'Linceu_Lighthouse_cpp',
    'acl-auditor.html': 'ACL_Auditor_cpp',
    'munin-app.html': 'Munin_App_cpp',
    'huginn.html': 'HuginnSentinel_rs',
    'eolo-platform.html': 'EoloPlatform_rs',
    'geoestabil.html': 'GeoEstabil_rs',
    'concrete_mix_design.html': 'Concrete_Mix_Designer_cpp',
    'compression-manager.html': 'Compression_Manager',
    'economia-app.html': 'Economia_APP',
    'eisenpo.html': 'EisenPo',
    'eisenhower-organizer.html': 'EISENHOWER_ORGANIZER',
    'lumen.html': 'Lumen',
    'launcher-ebook.html': 'Launcher_EBook',
    'agenda-avaliacoes-academicas.html': 'Agenda_Avaliacoes_Academicas',
    'compare-following-follower.html': 'Compare_Following_Follower'
  };

  const DIALOG_T = {
    pt: {
      title: 'Contato Direto',
      subtitle: 'Envie uma mensagem para o repositório ou aplicativo selecionado',
      closeAria: 'Fechar',
      repoLabel: 'Repositório / Aplicativo de Destino *',
      nameLabel: 'Seu Nome Completo *',
      namePlaceholder: 'Ex.: Maria Silva',
      emailLabel: 'Seu E-mail *',
      emailPlaceholder: 'seuemail@exemplo.com',
      subjectLabel: 'Assunto *',
      subjectPlaceholder: 'Título da mensagem / dúvida / feedback',
      hint: `A mensagem será encaminhada para <strong>${CONTACT_EMAIL}</strong> identificada com este rótulo no assunto.`,
      bodyLabel: 'Sua Mensagem *',
      bodyPlaceholder: 'Digite sua mensagem detalhada aqui...',
      submitBtn: `<span>📨 Enviar para ${CONTACT_EMAIL}</span>`,
      sendingBtn: '<span>⏳ Enviando mensagem...</span>',
      sentBtn: '<span>✅ Mensagem Enviada!</span>',
      discBtn: '<span>🌐 Abrir no GitHub Discussions do Repositório</span>',
      mailtoBtn: '<span>📧 Enviar via Cliente de E-mail Local (mailto)</span>',
      copyBtn: `<span>📋 Copiar E-mail (${CONTACT_EMAIL})</span>`,
      copySuccess: `E-mail copiado: ${CONTACT_EMAIL}`,
      copyFail: `E-mail: ${CONTACT_EMAIL}`,
      loadingMsg: `Enviando mensagem para <strong>${CONTACT_EMAIL}</strong>...`,
      successMsg: (target, email) => `✅ Mensagem enviada com sucesso! A notificação foi encaminhada para <strong>${CONTACT_EMAIL}</strong> com o rótulo <code>[${target}]</code>. Responderemos para <strong>${email}</strong>.`,
      toastSuccess: 'Mensagem enviada com sucesso!',
      fileProtocolWarning: '⚠️ A API do FormSubmit bloqueia requisições vindas de arquivos locais (protocolo file://). Abra a página por um servidor local (ex.: http://localhost:8000) ou envie pelo seu cliente de e-mail local clicando no botão abaixo.',
      activationWarning: `⚠️ O formulário ainda precisa de ativação! Um link de confirmação foi enviado para <strong>${CONTACT_EMAIL}</strong>. Clique em 'Activate Form' na caixa de entrada/spam do Outlook para liberar o recebimento de mensagens.`,
      errorFallback: (msg, target) => `⚠️ Não foi possível conectar ao serviço de envio direto (${msg}). Abrindo seu cliente de e-mail (Outlook / Mail) com o assunto <code>[${target}]</code> pré-preenchido para <strong>${CONTACT_EMAIL}</strong>...`
    },
    en: {
      title: 'Direct Contact',
      subtitle: 'Send a message to the selected repository or application',
      closeAria: 'Close',
      repoLabel: 'Target Repository / Application *',
      nameLabel: 'Your Full Name *',
      namePlaceholder: 'e.g. John Doe',
      emailLabel: 'Your Email *',
      emailPlaceholder: 'youremail@example.com',
      subjectLabel: 'Subject *',
      subjectPlaceholder: 'Message title / question / feedback',
      hint: `The message will be forwarded to <strong>${CONTACT_EMAIL}</strong> labeled with this subject tag.`,
      bodyLabel: 'Your Message *',
      bodyPlaceholder: 'Type your detailed message here...',
      submitBtn: `<span>📨 Send to ${CONTACT_EMAIL}</span>`,
      sendingBtn: '<span>⏳ Sending message...</span>',
      sentBtn: '<span>✅ Message Sent!</span>',
      discBtn: '<span>🌐 Open in Repository GitHub Discussions</span>',
      mailtoBtn: '<span>📧 Send via Local Email Client (mailto)</span>',
      copyBtn: `<span>📋 Copy Email (${CONTACT_EMAIL})</span>`,
      copySuccess: `Email copied: ${CONTACT_EMAIL}`,
      copyFail: `Email: ${CONTACT_EMAIL}`,
      loadingMsg: `Sending message to <strong>${CONTACT_EMAIL}</strong>...`,
      successMsg: (target, email) => `✅ Message sent successfully! Notification forwarded to <strong>${CONTACT_EMAIL}</strong> with label <code>[${target}]</code>. We will reply to <strong>${email}</strong>.`,
      toastSuccess: 'Message sent successfully!',
      fileProtocolWarning: '⚠️ FormSubmit blocks submissions from local files (file:// protocol). Please open via a local web server (e.g. http://localhost:8000) or send directly via your local email client using the button below.',
      activationWarning: `⚠️ Form requires activation! A confirmation link was sent to <strong>${CONTACT_EMAIL}</strong>. Please click 'Activate Form' in your Outlook inbox/spam to enable deliveries.`,
      errorFallback: (msg, target) => `⚠️ Direct send service unavailable (${msg}). Opening your local email client (Outlook / Mail) with <code>[${target}]</code> pre-filled to <strong>${CONTACT_EMAIL}</strong>...`
    }
  };

  function getCurrentLangKey() {
    return document.documentElement.lang.startsWith('en') ? 'en' : 'pt';
  }

  function populateRepoDropdown() {
    const sel = document.getElementById('msg-repo');
    if (!sel) return;
    const curVal = sel.value;
    const langKey = getCurrentLangKey();
    sel.innerHTML = REPO_APP_LIST.map(item => {
      const displayName = (langKey === 'en' && item.name_en) ? item.name_en : item.name;
      return `<option value="${item.id}" data-name="${displayName}" data-repo="${item.repo}" data-discussion="${item.hasDiscussion}">${displayName}${item.repo ? ` (${item.repo})` : ''}</option>`;
    }).join('');
    if (curVal) {
      sel.value = curVal;
    }
  }

  function updateSubjectPrefix() {
    const sel = document.getElementById('msg-repo');
    const prefixEl = document.getElementById('subject-prefix');
    const discBtn = document.getElementById('btn-discussion-link');
    if (!sel || !prefixEl) return;

    const langKey = getCurrentLangKey();
    const opt = sel.selectedOptions[0];
    const targetName = opt ? (opt.dataset.name || opt.text) : (langKey === 'en' ? 'Project' : 'Projeto');
    const repoName = opt ? opt.dataset.repo : '';
    const hasDisc = opt && opt.dataset.discussion === 'true';

    prefixEl.textContent = `[${targetName}]`;

    if (discBtn) {
      if (hasDisc && repoName) {
        discBtn.style.display = 'inline-flex';
        discBtn.href = `https://github.com/fernandoncidade/${repoName}/discussions`;
      } else {
        discBtn.style.display = 'none';
      }
    }
  }

  function updateContactModalLocale() {
    const langKey = getCurrentLangKey();
    const t = DIALOG_T[langKey] || DIALOG_T.pt;

    const titleEl = document.getElementById('dialog-title');
    const subtitleEl = document.getElementById('dialog-subtitle');
    const closeBtn = document.getElementById('dialog-close-btn');
    const repoLabel = document.getElementById('msg-repo-label');
    const nameLabel = document.getElementById('msg-sender-name-label');
    const nameInput = document.getElementById('msg-sender-name');
    const emailLabel = document.getElementById('msg-sender-email-label');
    const emailInput = document.getElementById('msg-sender-email');
    const subjectLabel = document.getElementById('msg-subject-label');
    const subjectInput = document.getElementById('msg-subject');
    const hintEl = document.getElementById('msg-subject-hint');
    const bodyLabel = document.getElementById('msg-body-label');
    const bodyInput = document.getElementById('msg-body');
    const submitBtn = document.getElementById('btn-submit-msg');
    const mailtoBtn = document.getElementById('btn-mailto-fallback');
    const discBtn = document.getElementById('btn-discussion-link');
    const copyBtn = document.getElementById('btn-copy-email');

    if (titleEl) titleEl.textContent = t.title;
    if (subtitleEl) subtitleEl.textContent = t.subtitle;
    if (closeBtn) {
      closeBtn.setAttribute('aria-label', t.closeAria);
      closeBtn.title = t.closeAria;
    }
    if (repoLabel) repoLabel.textContent = t.repoLabel;
    if (nameLabel) nameLabel.textContent = t.nameLabel;
    if (nameInput) nameInput.placeholder = t.namePlaceholder;
    if (emailLabel) emailLabel.textContent = t.emailLabel;
    if (emailInput) emailInput.placeholder = t.emailPlaceholder;
    if (subjectLabel) subjectLabel.textContent = t.subjectLabel;
    if (subjectInput) subjectInput.placeholder = t.subjectPlaceholder;
    if (hintEl) hintEl.innerHTML = t.hint;
    if (bodyLabel) bodyLabel.textContent = t.bodyLabel;
    if (bodyInput) bodyInput.placeholder = t.bodyPlaceholder;

    if (submitBtn && !submitBtn.disabled) submitBtn.innerHTML = t.submitBtn;
    if (mailtoBtn) mailtoBtn.innerHTML = t.mailtoBtn;
    if (discBtn) discBtn.innerHTML = t.discBtn;
    if (copyBtn) copyBtn.innerHTML = t.copyBtn;

    const sel = document.getElementById('msg-repo');
    const curVal = sel ? sel.value : null;
    populateRepoDropdown();
    if (sel && curVal) sel.value = curVal;
    updateSubjectPrefix();
  }

  function clearFormStatus() {
    const st = document.getElementById('msg-status');
    if (st) {
      st.className = 'form-status';
      st.textContent = '';
    }
  }

  function showFormStatus(msg, type = 'loading') {
    const st = document.getElementById('msg-status');
    if (!st) return;
    st.className = `form-status show ${type}`;
    st.innerHTML = msg;
  }

  function buildMailtoUrl(targetName, name, email, subject, body) {
    const isEn = getCurrentLangKey() === 'en';
    const mailSubject = encodeURIComponent(
      `[${targetName}] ${subject}${name ? (isEn ? ' - from ' : ' - de ') + name : ''}`
    );
    const mailBody = encodeURIComponent(
      isEn
        ? `Full Name: ${name}\nEmail: ${email}\nRepository / Application: ${targetName}\n\nMessage:\n${body}`
        : `Nome Completo: ${name}\nE-mail: ${email}\nRepositório / Aplicativo: ${targetName}\n\nMensagem:\n${body}`
    );
    return `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
  }

  function copyContactEmailToClipboard() {
    const t = DIALOG_T[getCurrentLangKey()] || DIALOG_T.pt;
    const onCopied = () => showToast(t.copySuccess, 2400);
    const onFallback = () => {
      try {
        const tmp = document.createElement('textarea');
        tmp.value = CONTACT_EMAIL;
        tmp.setAttribute('readonly', '');
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(tmp);
        showToast(ok ? t.copySuccess : t.copyFail, 2400);
      } catch (err) {
        showToast(t.copyFail, 2400);
      }
    };

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(CONTACT_EMAIL).then(onCopied).catch(onFallback);
    } else {
      onFallback();
    }
  }

  function createContactModal() {
    let dialog = document.getElementById('message-dialog');
    if (dialog) return dialog;

    dialog = document.createElement('dialog');
    dialog.id = 'message-dialog';
    dialog.className = 'message-dialog';
    dialog.setAttribute('aria-labelledby', 'dialog-title');

    dialog.innerHTML = `
      <div class="dialog-content">
        <div class="dialog-header">
          <div class="dialog-title-group">
            <span class="dialog-icon" aria-hidden="true">💬</span>
            <div>
              <h2 id="dialog-title" class="dialog-title">Contato Direto</h2>
              <span id="dialog-subtitle" class="dialog-subtitle">Envie uma mensagem para o repositório ou aplicativo selecionado</span>
            </div>
          </div>
          <button type="button" class="dialog-close-btn" id="dialog-close-btn" aria-label="Fechar">&times;</button>
        </div>

        <form id="message-form" class="message-form">
          <input type="hidden" name="_captcha" value="false">
          <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">
          <input type="hidden" name="_template" value="table">

          <div class="form-group">
            <label id="msg-repo-label" for="msg-repo">Repositório / Aplicativo de Destino *</label>
            <select id="msg-repo" name="repositorio" class="form-control" required></select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label id="msg-sender-name-label" for="msg-sender-name">Seu Nome Completo *</label>
              <input type="text" id="msg-sender-name" name="nome_completo" class="form-control" placeholder="Ex.: Maria Silva" required minlength="3" autocomplete="name">
            </div>
            <div class="form-group">
              <label id="msg-sender-email-label" for="msg-sender-email">Seu E-mail *</label>
              <input type="email" id="msg-sender-email" name="email" class="form-control" placeholder="seuemail@exemplo.com" required autocomplete="email">
            </div>
          </div>

          <div class="form-group">
            <label id="msg-subject-label" for="msg-subject">Assunto *</label>
            <div class="subject-input-wrapper">
              <span id="subject-prefix" class="subject-prefix">[Linceu Lighthouse]</span>
              <input type="text" id="msg-subject" name="assunto" class="form-control" placeholder="Título da mensagem / dúvida / feedback" required minlength="3">
            </div>
            <small id="msg-subject-hint" class="form-hint"></small>
          </div>

          <div class="form-group">
            <label id="msg-body-label" for="msg-body">Sua Mensagem *</label>
            <textarea id="msg-body" name="mensagem" class="form-control" rows="5" placeholder="Digite sua mensagem detalhada aqui..." required minlength="10"></textarea>
          </div>

          <div id="msg-status" class="form-status" role="status" aria-live="polite"></div>

          <div class="dialog-actions">
            <button type="submit" id="btn-submit-msg" class="dialog-cta-primary"></button>
            <a id="btn-discussion-link" href="#" target="_blank" rel="noopener noreferrer" class="dialog-cta-secondary" style="display:none;"></a>
            <button type="button" id="btn-mailto-fallback" class="dialog-cta-tertiary"></button>
            <button type="button" id="btn-copy-email" class="dialog-cta-copy"></button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(dialog);

    const closeBtn = dialog.querySelector('#dialog-close-btn');
    const form = dialog.querySelector('#message-form');
    const repoSel = dialog.querySelector('#msg-repo');
    const mailtoBtn = dialog.querySelector('#btn-mailto-fallback');
    const copyBtn = dialog.querySelector('#btn-copy-email');

    const closeDialog = () => {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDialog);
    }

    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        closeDialog();
      }
    });

    if (repoSel) {
      repoSel.addEventListener('change', updateSubjectPrefix);
    }

    if (mailtoBtn) {
      mailtoBtn.addEventListener('click', () => {
        const isEn = getCurrentLangKey() === 'en';
        const opt = repoSel ? repoSel.selectedOptions[0] : null;
        const targetName = opt ? (opt.dataset.name || opt.text) : (isEn ? 'Project' : 'Projeto');
        const name = (dialog.querySelector('#msg-sender-name')?.value || '').trim();
        const email = (dialog.querySelector('#msg-sender-email')?.value || '').trim();
        const sub = (dialog.querySelector('#msg-subject')?.value || (isEn ? 'Contact' : 'Contato')).trim();
        const body = (dialog.querySelector('#msg-body')?.value || '').trim();
        window.location.href = buildMailtoUrl(targetName, name, email, sub, body);
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', copyContactEmailToClipboard);
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const langKey = getCurrentLangKey();
        const isEn = langKey === 'en';
        const t = DIALOG_T[langKey] || DIALOG_T.pt;
        const opt = repoSel ? repoSel.selectedOptions[0] : null;
        const targetName = opt ? (opt.dataset.name || opt.text) : (isEn ? 'Project' : 'Projeto');
        const name = dialog.querySelector('#msg-sender-name').value.trim();
        const email = dialog.querySelector('#msg-sender-email').value.trim();
        const sub = dialog.querySelector('#msg-subject').value.trim();
        const body = dialog.querySelector('#msg-body').value.trim();
        const submitBtn = dialog.querySelector('#btn-submit-msg');

        const fullSubject = `[${targetName}] ${sub}${name ? (isEn ? ' (from ' : ' (de ') + name + ')' : ''}`;

        if (window.location.protocol === 'file:') {
          showFormStatus(t.fileProtocolWarning, 'error');
          window.location.href = buildMailtoUrl(targetName, name, email, sub, body);
          return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = t.sendingBtn;
        showFormStatus(t.loadingMsg, 'loading');

        try {
          const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              _subject: fullSubject,
              _replyto: email,
              'Nome / Name': name,
              'E-mail': email,
              'Repositório / Repository': targetName,
              'Assunto / Subject': sub,
              'Mensagem / Message': body
            })
          });

          const data = await res.json().catch(() => null);
          const isSuccess = res.ok && data && (data.success === true || data.success === 'true');

          if (isSuccess) {
            showFormStatus(t.successMsg(targetName, email), 'success');
            submitBtn.innerHTML = t.sentBtn;
            showToast(t.toastSuccess);
            setTimeout(() => {
              form.reset();
              submitBtn.disabled = false;
              submitBtn.innerHTML = t.submitBtn;
              updateSubjectPrefix();
            }, 4000);
          } else {
            const returnedMsg = (data && data.message) ? data.message : `HTTP ${res.status}`;
            const lowerMsg = returnedMsg.toLowerCase();
            if (lowerMsg.includes('activation') || lowerMsg.includes('activate')) {
              showFormStatus(t.activationWarning, 'error');
            } else if (lowerMsg.includes('web server') || lowerMsg.includes('html file')) {
              showFormStatus(t.fileProtocolWarning, 'error');
            } else {
              showFormStatus(t.errorFallback(returnedMsg, targetName), 'error');
            }
            submitBtn.disabled = false;
            submitBtn.innerHTML = t.submitBtn;
            window.location.href = buildMailtoUrl(targetName, name, email, sub, body);
          }
        } catch (err) {
          showFormStatus(t.errorFallback((err && err.message) || 'Network error', targetName), 'error');
          submitBtn.disabled = false;
          submitBtn.innerHTML = t.submitBtn;
          window.location.href = buildMailtoUrl(targetName, name, email, sub, body);
        }
      });
    }

    return dialog;
  }

  function openContactModal(repoKey, fallbackAppName) {
    const dialog = createContactModal();
    populateRepoDropdown();

    const sel = dialog.querySelector('#msg-repo');
    if (sel) {
      if (repoKey) {
        const opt = Array.from(sel.options).find(o => o.value === repoKey || o.dataset.repo === repoKey);
        if (opt) sel.value = opt.value;
      } else if (fallbackAppName) {
        const normalized = fallbackAppName.trim().toLowerCase();
        const opt = Array.from(sel.options).find(o => {
          const oName = (o.dataset.name || o.text || '').toLowerCase();
          return oName === normalized || oName.includes(normalized);
        });
        if (opt) sel.value = opt.value;
      }
    }

    updateContactModalLocale();
    updateSubjectPrefix();
    clearFormStatus();

    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }

    const nameInput = dialog.querySelector('#msg-sender-name');
    if (nameInput) nameInput.focus();
  }

  function resolveFallbackAppName(btn) {
    const href = btn.getAttribute('href') || '';
    const match = href.match(/subject=\[([^\]]+)\]/i);
    if (match && match[1]) {
      try {
        return decodeURIComponent(match[1]);
      } catch (err) {
        return match[1];
      }
    }
    const heroTitle = document.querySelector('.app-hero-title');
    return heroTitle ? heroTitle.textContent.trim() : '';
  }

  function setupDirectContactModal() {
    const contactButtons = document.querySelectorAll('.btn-cta-contact, .btn-open-msg');
    if (!contactButtons.length) return;

    createContactModal();
    updateContactModalLocale();

    contactButtons.forEach(btn => {
      btn.setAttribute('aria-haspopup', 'dialog');
      btn.setAttribute('aria-controls', 'message-dialog');
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-cta-contact, .btn-open-msg');
      if (!btn) return;
      e.preventDefault();

      const currentPath = window.location.pathname.split('/').pop();
      const repoKey = btn.dataset.repo || PAGE_TO_REPO_ID[currentPath] || '';
      const fallbackAppName = btn.dataset.app || resolveFallbackAppName(btn);
      openContactModal(repoKey, fallbackAppName);
    });
  }
})();
