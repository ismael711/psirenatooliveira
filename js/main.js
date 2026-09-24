/* ═══════════════════════════════════════════════════════
   MAIN.JS — Renato Oliveira · Psicólogo
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────
     1. NAVBAR — scroll glass effect
  ──────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ────────────────────────────────────
     2. MOBILE MENU — burger toggle
  ──────────────────────────────────── */
  const burger  = document.getElementById('navBurger');
  const navMenu = document.getElementById('navMenu');

  function setMenuOpen(open) {
    navMenu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  }

  burger.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('is-open'));
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !burger.contains(e.target)) {
      setMenuOpen(false);
    }
  });

  /* ────────────────────────────────────
     3. SCROLL REVEAL — IntersectionObserver
  ──────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger siblings within the same parent
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal')
          );
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.1}s`;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ────────────────────────────────────
     4. FAQ — accordion
  ──────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq__item--open');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('faq__item--open');
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it was previously closed
      if (!isOpen) {
        item.classList.add('faq__item--open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ────────────────────────────────────
     5. ACTIVE NAV LINK — highlight on scroll
  ──────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'navbar__link--active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => sectionObserver.observe(section));

  /* ────────────────────────────────────
     6. SMOOTH SCROLL — fallback for older browsers
  ──────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
