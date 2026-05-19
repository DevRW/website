(function () {
  'use strict';

  // ---- Nav drawer (mobile) ----
  const toggle = document.querySelector('[data-nav-toggle]');
  const drawer = document.querySelector('[data-nav-drawer]');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('is-open');
      const open = drawer.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  // ---- Modal open / close ----
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('is-open');
    document.body.classList.add('modal-open');
    // Lazy-load the Google Form iframe on first open
    const iframe = m.querySelector('iframe[data-src]');
    if (iframe && !iframe.src) iframe.src = iframe.getAttribute('data-src');
  }

  function closeModal(el) {
    const m = el.closest('.modal-overlay') || el;
    m.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('[data-modal-open]').forEach((b) =>
    b.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(b.getAttribute('data-modal-open'));
    })
  );
  document.querySelectorAll('[data-modal-close]').forEach((b) =>
    b.addEventListener('click', () => closeModal(b))
  );
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.is-open').forEach((m) => closeModal(m));
    }
  });

  // ---- Copy buttons ----
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.getAttribute('data-copy'));
        const original = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => (btn.textContent = original), 1500);
      } catch (_) {}
    });
  });

  // ---- Contact-page mode switcher ----
  const radioCards = document.querySelectorAll('[data-mode]');
  if (radioCards.length) {
    const hireFrame = document.querySelector('[data-mode-frame="hire"]');
    const projectFrame = document.querySelector('[data-mode-frame="project"]');
    const hireIntro = document.querySelector('[data-mode-intro="hire"]');
    const projectIntro = document.querySelector('[data-mode-intro="project"]');
    radioCards.forEach((card) => {
      card.addEventListener('click', () => {
        radioCards.forEach((c) => c.classList.remove('is-active'));
        card.classList.add('is-active');
        const mode = card.getAttribute('data-mode');
        [hireFrame, hireIntro].forEach((el) => el && el.classList.toggle('hidden', mode !== 'hire'));
        [projectFrame, projectIntro].forEach((el) => el && el.classList.toggle('hidden', mode !== 'project'));
        // Lazy load the active iframe
        const active = mode === 'hire' ? hireFrame : projectFrame;
        const iframe = active && active.querySelector('iframe[data-src]');
        if (iframe && !iframe.src) iframe.src = iframe.getAttribute('data-src');
      });
    });
  }

  // ---- Smooth scroll for in-page anchors ----
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((a) => {
    a.addEventListener('click', (e) => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
