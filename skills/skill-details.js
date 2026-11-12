/**
 * skill-details.js
 * Gerenciador de tema (Claro/Escuro), internacionalização (PT-BR/EN-US),
 * efeitos interativos de spotlight e navegação entre as 10 páginas de habilidades.
 * Integrado ao ecossistema fernandoncidade.
 */

(function () {
  'use strict';

  const THEME_KEY = 'fcc_theme';
  const LANG_KEY = 'fcc_lang';

  const SKILLS_CATALOG = [
    {
      num: '01',
      slug: 'linguagens-compiladores.html',
      icon: '⚙️',
      ptTitle: 'Linguagens de Programação, Compiladores & Padrões',
      enTitle: 'Programming Languages, Compilers & Standards',
      ptSummary: 'Desenvolvimento autodidata de sistemas nativos e aplicações desktop em C++ (C++17/C++20), Rust (Edições 2021/2024), C (C99/C11), Python (3.10+) e Web Moderna (HTML5, CSS3 e JS ES6+), utilizando toolchains MSVC 2022, Clang/LLVM, GCC, Cargo e CMake.',
      enSummary: 'Self-taught development of native systems and desktop applications in C++ (C++17/C++20), Rust (2021/2024 Editions), C (C99/C11), Python (3.10+), and Modern Web (HTML5, CSS3, and ES6+ JS), using MSVC 2022, Clang/LLVM, GCC, Cargo, and CMake toolchains.'
    },
    {
      num: '02',
      slug: 'arquitetura-software.html',
      icon: '🏛️',
      ptTitle: 'Arquitetura de Software & Padrões de Projeto',
      enTitle: 'Software Architecture & Design Patterns',
      ptSummary: 'Concepção de arquiteturas limpas e em camadas com desacoplamento estrito entre UI, Domínio e Persistência, aplicando programação orientada a eventos (Signals & Slots), modelo Produtor-Consumidor, Model-View-Delegate, I18N bilíngue e soberania 100% offline.',
      enSummary: 'Design of clean, layered architectures with strict decoupling across UI, Domain, and Persistence layers, applying event-driven programming (Signals & Slots), Producer-Consumer models, Model-View-Delegate, bilingual I18N, and 100% offline data sovereignty.'
    },
    {
      num: '03',
      slug: 'design-codigo-boas-praticas.html',
      icon: '💎',
      ptTitle: 'Design de Código, Lógica Computacional & Boas Práticas',
      enTitle: 'Code Design, Computational Logic & Best Practices',
      ptSummary: 'Aplicação rigorosa de SOLID, Clean Code, DRY, KISS e YAGNI, gerenciamento determinístico de memória via RAII e ponteiros inteligentes, semântica de movimentação, leitura Zero-Copy, concorrência sem condições de corrida e persistência atômica ACID.',
      enSummary: 'Strict application of SOLID, Clean Code, DRY, KISS, and YAGNI, deterministic memory management via RAII and smart pointers, move semantics, Zero-Copy reading, data-race-free concurrency, and power-safe atomic ACID persistence.'
    },
    {
      num: '04',
      slug: 'estruturas-dados-algoritmos.html',
      icon: '🧮',
      ptTitle: 'Estruturas de Dados, Algoritmos & Complexidade',
      enTitle: 'Data Structures, Algorithms & Complexity',
      ptSummary: 'Implementação de Ring Buffers, canais lock-free MPMC, Hash Maps O(1), árvores NTFS/JSON, grafos dirigidos por forças, compressão LZ77/LZMA, Regex JIT em código de máquina, métodos numéricos (Newton-Raphson e Brent-Dekker) e Thread Pools Work-Stealing.',
      enSummary: 'Implementation of Ring Buffers, lock-free MPMC channels, O(1) Hash Maps, NTFS/JSON trees, force-directed graphs, LZ77/LZMA compression, machine-code Regex JIT, numerical methods (Newton-Raphson and Brent-Dekker), and Work-Stealing Thread Pools.'
    },
    {
      num: '05',
      slug: 'engenharia-computacao-baixo-nivel.html',
      icon: '⚡',
      ptTitle: 'Engenharia de Computação, Baixo Nível, SIMD & Paralelismo',
      enTitle: 'Computer Engineering, Low-Level Systems, SIMD & Parallelism',
      ptSummary: 'Programação de sistemas próxima ao hardware x86-64 com mapeamento direto em memória virtual (Memory-Mapped Files), vetorização SIMD AVX2/SSE4.2 acima de 3,0 GB/s, I/O assíncrono de kernel sub-milissegundo e integração nativa com subsistemas Win32.',
      enSummary: 'Hardware-close x86-64 systems programming with direct virtual Memory-Mapped Files, AVX2/SSE4.2 SIMD vectorization exceeding 3.0 GB/s, sub-millisecond asynchronous kernel I/O, and native integration with Win32 subsystems.'
    },
    {
      num: '06',
      slug: 'interfaces-graficas-gpu.html',
      icon: '🎨',
      ptTitle: 'Engenharia de Interfaces Gráficas (GUI) & Renderização GPU',
      enTitle: 'Graphical User Interface (GUI) Engineering & GPU Rendering',
      ptSummary: 'Construção de interfaces desktop nativas de alta responsividade com Qt6/Qt 6.11, PySide6 e egui/eframe em Rust, aliadas à renderização gráfica 2D/3D acelerada por GPU (WGPU, DirectX 12, Vulkan e OpenGL) a 60 FPS com suporte a temas Claro/Escuro e HiDPI/4K.',
      enSummary: 'Construction of highly responsive native desktop interfaces with Qt6/Qt 6.11, PySide6, and Rust egui/eframe, paired with hardware-accelerated 2D/3D GPU rendering (WGPU, DirectX 12, Vulkan, and OpenGL) at 60 FPS with Light/Dark themes and HiDPI/4K scaling.'
    },
    {
      num: '07',
      slug: 'ciberseguranca-auditoria-forense.html',
      icon: '🛡️',
      ptTitle: 'Cibersegurança, Auditoria Forense & Criptografia',
      enTitle: 'Cybersecurity, Forensic Auditing & Cryptography',
      ptSummary: 'Monitoramento de integridade de arquivos (FIM) em tempo real com correlação semântica no kernel, auditoria forense de descritores DACL/SACL e Acesso Efetivo NTFS/SMB, detecção de escalonamento de privilégios, criptografia AES-256/SHA-256 e relatórios LGPD/ISO.',
      enSummary: 'Real-time File Integrity Monitoring (FIM) with kernel semantic correlation, forensic auditing of DACL/SACL descriptors and NTFS/SMB Effective Access, privilege escalation detection, AES-256/SHA-256 cryptography, and GDPR/LGPD/ISO compliance reporting.'
    },
    {
      num: '08',
      slug: 'engenharia-civil-computacional.html',
      icon: '🏗️',
      ptTitle: 'Engenharia Civil, Estrutural & Geotécnica Computacional',
      enTitle: 'Computational Civil, Structural & Geotechnical Engineering',
      ptSummary: 'Aplicação dos estudos no Bacharelado em Engenharia Civil (UFPR) e programação autodidata na modelagem numérica de ações do vento (NBR 6123), estabilidade de taludes e fundações (NBR 11682/6122), muros em concreto armado (NBR 6118) e dosagem IPT/EPUSP.',
      enSummary: 'Application of Bachelor of Civil Engineering studies (UFPR) and self-taught programming to numerical modeling of wind loads (NBR 6123), slope stability and foundations (NBR 11682/6122), reinforced concrete walls (NBR 6118), and IPT/EPUSP mix design.'
    },
    {
      num: '09',
      slug: 'engenharia-economica-ciencia-dados.html',
      icon: '📈',
      ptTitle: 'Engenharia Econômica, Ciência de Dados & Bancos de Dados',
      enTitle: 'Engineering Economics, Data Science & Databases',
      ptSummary: 'Modelagem financeira de precisão contábil (SAC, Price, VPL, TIR, MTIR e VAUE), arquitetura de bancos relacionais SQLite3 em modo concorrente WAL, dashboards estatísticos em Python (Pareto, Curva ABC e Boxplots) e exportação nativa em PDF vetorial A4 e XLSX.',
      enSummary: 'Accounting-precision financial modeling (SAC, Price, NPV, IRR, MIRR, and EUAW), concurrent WAL SQLite3 relational database architecture, statistical Python dashboards (Pareto, ABC Curve, and Boxplots), and native 300 DPI vector A4 PDF and XLSX export.'
    },
    {
      num: '10',
      slug: 'acessibilidade-cognitiva-produtividade.html',
      icon: '🧠',
      ptTitle: 'Acessibilidade Cognitiva (A11y) & Produtividade Científica',
      enTitle: 'Cognitive Accessibility (A11y) & Scientific Productivity',
      ptSummary: 'Desenvolvimento centrado em ergonomia cognitiva e neurodiversidade (TEA, TDAH e Dislexia) padrão WCAG 2.1 AAA, síntese de voz neural offline (SAPI5/OneCore), suporte a leitores de tela e metodologias de foco e aprendizagem (Matriz de Eisenhower, Pomodoro e Feynman).',
      enSummary: 'Software development centered on cognitive ergonomics and neurodiversity (ASD, ADHD, and Dyslexia) per WCAG 2.1 AAA, offline neural speech synthesis (SAPI5/OneCore), screen reader support, and focus/learning methodologies (Eisenhower Matrix, Pomodoro, and Feynman).'
    }
  ];

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
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
    const isEn = document.documentElement.lang.startsWith('en');
    showToast(isEn ? `Theme: ${nextTheme === 'dark' ? 'Dark' : 'Light'}` : `Tema: ${nextTheme === 'dark' ? 'Escuro' : 'Claro'}`);
  }

  function applyLanguage(langCode) {
    const isEn = langCode === 'en' || langCode === 'enus';
    document.documentElement.lang = isEn ? 'en' : 'pt-br';

    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) {
      langBtn.innerHTML = `🌐 <span class="btn-text">${isEn ? 'PT-BR' : 'EN-US'}</span>`;
      langBtn.title = isEn ? 'Mudar para Português' : 'Switch to English';
    }

    const currentFile = window.location.pathname.split('/').pop();
    const skillObj = SKILLS_CATALOG.find(s => s.slug === currentFile);
    if (skillObj) {
      document.title = isEn
        ? `${skillObj.enTitle} • Fernando Nillsson Cidade`
        : `${skillObj.ptTitle} • Fernando Nillsson Cidade`;
    }

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

  function setupSpotlightEffect() {
    const cards = document.querySelectorAll('.pillar-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  function setupSkillNavigation() {
    const currentFile = window.location.pathname.split('/').pop();
    const idx = SKILLS_CATALOG.findIndex(s => s.slug === currentFile);
    if (idx === -1) return;

    const prevSkill = SKILLS_CATALOG[(idx - 1 + SKILLS_CATALOG.length) % SKILLS_CATALOG.length];
    const nextSkill = SKILLS_CATALOG[(idx + 1) % SKILLS_CATALOG.length];

    const navContainer = document.getElementById('skill-prev-next');
    if (navContainer) {
      navContainer.innerHTML = `
        <a href="${prevSkill.slug}" class="skill-nav-card prev">
          <span class="skill-nav-label"><span class="lang-pt">← Habilidade Anterior (${prevSkill.num}/10)</span><span class="lang-en">← Previous Skill (${prevSkill.num}/10)</span></span>
          <span class="skill-nav-title">${prevSkill.icon} <span class="lang-pt">${prevSkill.ptTitle}</span><span class="lang-en">${prevSkill.enTitle}</span></span>
        </a>
        <a href="${nextSkill.slug}" class="skill-nav-card next">
          <span class="skill-nav-label"><span class="lang-pt">Próxima Habilidade (${nextSkill.num}/10) →</span><span class="lang-en">Next Skill (${nextSkill.num}/10) →</span></span>
          <span class="skill-nav-title"><span class="lang-pt">${nextSkill.ptTitle}</span><span class="lang-en">${nextSkill.enTitle}</span> ${nextSkill.icon}</span>
        </a>
      `;
    }

    const matrixContainer = document.getElementById('all-skills-grid');
    if (matrixContainer) {
      matrixContainer.innerHTML = SKILLS_CATALOG.map(s => `
        <a href="${s.slug}" class="matrix-skill-link${s.slug === currentFile ? ' active' : ''}">
          <span class="matrix-skill-num">${s.num}</span>
          <span>${s.icon}</span>
          <span class="lang-pt">${s.ptTitle}</span>
          <span class="lang-en">${s.enTitle}</span>
        </a>
      `).join('');
    }
  }

  function setupBackToTop() {
    const btnTop = document.getElementById('btn-top');
    if (!btnTop) return;

    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      btnTop.classList.toggle('show', scrollPos > 250);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem(LANG_KEY) || 'ptbr';
    applyLanguage(savedLang);

    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);

    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);

    setupSpotlightEffect();
    setupSkillNavigation();
    setupBackToTop();
  });

  window.addEventListener('pageshow', () => {
    const savedLang = localStorage.getItem(LANG_KEY) || 'ptbr';
    applyLanguage(savedLang);
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
  });
})();

