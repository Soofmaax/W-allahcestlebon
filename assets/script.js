(() => {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');

  if (header && toggle) {
    const nav = header.querySelector('.nav');
    const createMobileNav = () => {
      const existing = header.querySelector('[data-mobile-nav]');
      if (existing) return existing;

      const wrap = document.createElement('div');
      wrap.className = 'mobile-nav';
      wrap.setAttribute('data-mobile-nav', '');

      const links = nav ? Array.from(nav.querySelectorAll('a')) : [];
      for (const a of links) {
        const clone = a.cloneNode(true);
        clone.classList.remove('is-active');
        wrap.appendChild(clone);
      }

      header.appendChild(wrap);
      return wrap;
    };

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      const mobile = header.querySelector('[data-mobile-nav]');
      if (open) {
        const m = mobile || createMobileNav();
        m.hidden = false;
      } else if (mobile) {
        mobile.hidden = true;
      }
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 820px)').matches) setOpen(false);
    });
  }

  const fieldEls = document.querySelectorAll('[data-sparkle-field]');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const spawnSparkles = (field) => {
    if (!field || prefersReduced) return;

    const count = 14;
    for (let i = 0; i < count; i += 1) {
      const s = document.createElement('span');
      s.className = 'sparkle';

      const size = 8 + Math.random() * 10;
      const left = Math.random() * 100;
      const top = 20 + Math.random() * 70;
      const drift = (Math.random() - 0.5) * 80;
      const dur = 5 + Math.random() * 5;
      const delay = Math.random() * 3;

      s.style.setProperty('--s', `${size}px`);
      s.style.left = `${left}%`;
      s.style.top = `${top}%`;
      s.style.setProperty('--x', `${drift}px`);
      s.style.setProperty('--d', `${dur}s`);
      s.style.setProperty('--delay', `${delay}s`);

      field.appendChild(s);
    }
  };

  for (const f of fieldEls) spawnSparkles(f);

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImg = document.querySelector('[data-lightbox-img]');
  const closeBtn = document.querySelector('[data-lightbox-close]');
  const shots = document.querySelectorAll('[data-shot]');

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.documentElement.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.documentElement.style.overflow = '';
  };

  if (lightbox && lightboxImg && shots.length) {
    for (const shot of shots) {
      shot.addEventListener('click', () => {
        const img = shot.querySelector('img');
        if (!img) return;
        openLightbox(img.currentSrc || img.src, img.alt);
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
})();
