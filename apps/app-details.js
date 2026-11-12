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
        { slug: 'linguagens-compiladores', icon: '💻', category: 'Linguagens de Programação, Compiladores & Padrões', text: 'Domínio autodidata de C++ (C++17/C++20 — STL, templates, concepts, std::span), Rust (Edições 2021/2024 — ownership, lifetimes, traits e binários CLI/GUI), C (C99/C11), Python (3.10+ — Type Hints, PEP 8) e Tecnologias Web (HTML5, CSS3, JS ES6+) com toolchains MSVC 2022, Clang/LLVM, MinGW-w64, Cargo e CMake.' },
        { slug: 'arquitetura-software', icon: '🏛️', category: 'Arquitetura de Software & Padrões de Projeto', text: 'Arquitetura Limpa e em Camadas (Apresentação, Domínio e Persistência), Orientação a Eventos (Signals & Slots), Modelo de Atores e Produtor-Consumidor (DbWriter), Model-View-Delegate, janelas não-modais (Modeless Dialogs), sistemas modulares, I18N bilíngue em tempo real e arquitetura 100% Local-First / Zero-Trust Offline.' },
        { slug: 'design-codigo-boas-praticas', icon: '🧩', category: 'Design de Código, Lógica Computacional & Boas Práticas', text: 'Aplicação rigorosa de SOLID, Clean Code, DRY, KISS e YAGNI, gestão determinística de recursos via RAII e smart pointers, semântica Move e Zero-Copy, Fearless Concurrency sem data races, contratos defensivos, persistência transacional atômica contra quedas de energia (ReplaceFileW / ACID) e 12 apps na Microsoft Store.' },
        { slug: 'estruturas-dados-algoritmos', icon: '🧮', category: 'Estruturas de Dados, Algoritmos & Complexidade', text: 'Ring Buffers e canais lock-free MPMC, Hash Sets/Maps com busca O(1), árvores DOM/SAX/NTFS, grafos dirigidos por forças físicas, compressão LZ77 e LZMA, autômatos Regex JIT (PCRE2), métodos numéricos híbridos (Newton-Raphson e Brent-Dekker), regressão não linear e pools paralelos Work-Stealing (Rayon, std::jthread).' },
        { slug: 'engenharia-computacao-baixo-nivel', icon: '⚡', category: 'Engenharia de Computação, Baixo Nível, SIMD & Paralelismo', text: 'Programação próxima ao hardware x86-64, Memory-Mapped Files (CreateFileMappingW / MapViewOfFile) para abertura instantânea de múltiplos gigabytes com RAM constante, vetorização SIMD de 256/128 bits (AVX2, SSE4.2 > 3,0 GB/s), I/O assíncrono de kernel sub-milissegundo, ponto flutuante IEEE 754 e integração Win32 API.' },
        { slug: 'interfaces-graficas-gpu', icon: '🎨', category: 'Engenharia de Interfaces Gráficas (GUI), GPU & UX', text: 'Desenvolvimento desktop nativo com Qt 6/6.11 (Widgets, Charts, QGraphicsView, QPainter, QPdfWriter, QSS e Windows 11 Mica), interfaces reativas em modo imediato em Rust com egui/eframe, renderização 2D/3D acelerada por GPU (WGPU, DirectX 12, Vulkan e OpenGL a 60 FPS), PySide6/PyQt6/Tkinter e suporte HiDPI/4K.' },
        { slug: 'ciberseguranca-auditoria-forense', icon: '🛡️', category: 'Cibersegurança, Auditoria Forense, Criptografia & FIM', text: 'Monitoramento de integridade em tempo real (FIM) com correlação semântica no kernel, análise binária de descritores NTFS/SMB (DACL, SACL, SIDs), simulação do Security Reference Monitor para Acesso Efetivo, detecção de escalonamento de privilégios, remediação com rollback icacls, SHA-256, AES-256-CBC/GCM e LGPD/GDPR/ISO 27001.' },
        { slug: 'engenharia-civil-computacional', icon: '🏗️', category: 'Engenharia Civil, Estrutural & Geotécnica Computacional', text: 'Modelagem matemática e verificação normativa ABNT NBR: ação de ventos (NBR 6123:2023 / NBR 8800:2024), estabilidade de taludes e mecânica dos solos por Bishop, Fellenius, Janbu, Rankine, Coulomb e Hansen/Meyerhof (NBR 11682 / NBR 6122), muros em concreto armado (NBR 6118:2023) e dosagem de concreto IPT/EPUSP (NBR 12655).' },
        { slug: 'engenharia-economica-ciencia-dados', icon: '📊', category: 'Engenharia Econômica, Finanças, Ciência de Dados & BDs', text: 'Modelagem financeira com arredondamento ABNT, amortização (SAC, Price, SAM, Bullet), viabilidade econômica (VPL, TIR, MTIR, VAUE, Payback), bancos embarcados SQLite3 em modo WAL concorrente, ciência de dados e BI em Python (Taipy, Streamlit, Plotly, Pandas, SciPy), Curva ABC/Pareto e relatórios PDF A4 300 DPI, XLSX e SVG.' },
        { slug: 'acessibilidade-cognitiva-produtividade', icon: '♿', category: 'Acessibilidade Cognitiva (A11y) & Produtividade Científica', text: 'Engenharia centrada em ergonomia cognitiva e neurodiversidade (TEA, TDAH e Dislexia) padrão W3C WCAG 2.1 AAA, síntese de voz neural offline (QTextToSpeech / SAPI5), navegação integral por teclado e leitores de tela (NVDA/MSAA), bibliotecas digitais (PDF/EPUB/MOBI) e metodologias Eisenhower, Pomodoro e Técnica Feynman.' }
      ]
    },
    en: {
      heading: 'Author\'s Skills & Software Engineering',
      intro: 'Technical competencies built through 100% self-taught study and driven by intense scientific curiosity, alongside my undergraduate studies in the Bachelor of Civil Engineering at UFPR. Click on any skill title below to open its dedicated screen with the complete description of architecture, code design, data structures, algorithms, and best practices:',
      items: [
        { slug: 'linguagens-compiladores', icon: '💻', category: 'Programming Languages, Compilers & Standards', text: 'Self-taught mastery of C++ (C++17/C++20 — STL, templates, concepts, std::span), Rust (2021/2024 Editions — ownership, lifetimes, traits, and native CLI/GUI binaries), C (C99/C11), Python (3.10+ — Type Hints, PEP 8), and Web Technologies (HTML5, CSS3, ES6+ JS) with MSVC 2022, Clang/LLVM, MinGW-w64, Cargo, and CMake toolchains.' },
        { slug: 'arquitetura-software', icon: '🏛️', category: 'Software Architecture & Design Patterns', text: 'Clean and Layered Architecture (Presentation, Domain, and Persistence), Event-Driven Design (Signals & Slots), Actor and Producer-Consumer Models (DbWriter), Model-View-Delegate, modeless window management (Modeless Dialogs), modular plugin systems, real-time bilingual I18N, and 100% Local-First / Zero-Trust Offline architecture.' },
        { slug: 'design-codigo-boas-praticas', icon: '🧩', category: 'Code Design, Computational Logic & Best Practices', text: 'Strict application of SOLID, Clean Code, DRY, KISS, and YAGNI, deterministic resource management via RAII and smart pointers, Move Semantics and Zero-Copy processing, data-race-free Fearless Concurrency, defensive contracts, power-safe atomic transactional persistence (ReplaceFileW / ACID), and 12 Microsoft Store apps.' },
        { slug: 'estruturas-dados-algoritmos', icon: '🧮', category: 'Data Structures, Algorithms & Complexity', text: 'Circular Ring Buffers and lock-free MPMC channels, Hash Sets/Maps with O(1) lookup, DOM/SAX/NTFS hierarchical trees, force-directed spatial graphs, LZ77 and LZMA lossless compression, JIT-compiled Regex automata (PCRE2), hybrid numerical root-finding (Newton-Raphson and Brent-Dekker), non-linear regression, and Work-Stealing thread pools.' },
        { slug: 'engenharia-computacao-baixo-nivel', icon: '⚡', category: 'Computer Engineering, Low-Level Systems, SIMD & Parallelism', text: 'Hardware-close x86-64 systems programming, Memory-Mapped Files (CreateFileMappingW / MapViewOfFile) for instant multi-gigabyte opening with constant RAM, 256/128-bit SIMD CPU vectorization (AVX2, SSE4.2 > 3.0 GB/s), sub-millisecond asynchronous kernel I/O, IEEE 754 floating-point math, and native Win32 API integration.' },
        { slug: 'interfaces-graficas-gpu', icon: '🎨', category: 'GUI Engineering, GPU Rendering & User Experience', text: 'Native desktop development with Qt 6/6.11 (Widgets, Charts, QGraphicsView, QPainter, QPdfWriter, QSS, and Windows 11 Mica), immediate-mode reactive UIs in Rust with egui/eframe, hardware-accelerated 2D/3D GPU rendering (WGPU, DirectX 12, Vulkan, and OpenGL at 60 FPS), PySide6/PyQt6/Tkinter, and crisp HiDPI/4K scaling.' },
        { slug: 'ciberseguranca-auditoria-forense', icon: '🛡️', category: 'Cybersecurity, Forensic Auditing, Cryptography & FIM', text: 'Real-time File Integrity Monitoring (FIM) with deterministic kernel correlation, binary analysis of NTFS/SMB security descriptors (DACL, SACL, SIDs), Security Reference Monitor emulation for Effective Access, privilege escalation detection, safe icacls rollback remediation, SHA-256, AES-256-CBC/GCM, and GDPR/LGPD/ISO 27001 compliance.' },
        { slug: 'engenharia-civil-computacional', icon: '🏗️', category: 'Computational Civil, Structural & Geotechnical Engineering', text: 'Analytical mathematical modeling and automated ABNT NBR compliance: wind actions (NBR 6123:2023 / NBR 8800:2024), slope stability and soil mechanics via Bishop, Fellenius, Janbu, Rankine, Coulomb, and Hansen/Meyerhof (NBR 11682 / NBR 6122), reinforced concrete retaining walls (NBR 6118:2023), and IPT/EPUSP concrete mix design (NBR 12655).' },
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
})();
