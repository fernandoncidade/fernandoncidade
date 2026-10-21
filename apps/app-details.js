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
  });

  // Sincronização ao retornar pelo histórico de navegação (BFCache)
  window.addEventListener('pageshow', () => {
    const savedLang = localStorage.getItem(LANG_KEY) || 'ptbr';
    applyLanguage(savedLang);
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
  });
})();
