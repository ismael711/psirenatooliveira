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
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ────────────────────────────────────
     2. MOBILE MENU — burger toggle
  ──────────────────────────────────── */
  const burger  = document.getElementById('navBurger');
  const navMenu = document.getElementById('navMenu');

  burger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen);
    // Animate burger into × shape
    const spans = burger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
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
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          siblings.forEach((el, i) => {
            if (el === entry.target) {
              entry.target.style.transitionDelay = `${i * 0.12}s`;
            }
          });
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ────────────────────────────────────
     4. FAQ — accordion
  ──────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    const icon   = item.querySelector('.faq__icon');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq__item--open');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('faq__item--open');
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq__icon').textContent = '+';
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('faq__item--open');
        btn.setAttribute('aria-expanded', 'true');
        icon.textContent = '×';
      }
    });
  });

  /* ────────────────────────────────────
     5. ACTIVE NAV LINK — highlight on scroll
  ──────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar__link');

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
    { threshold: 0.35 }
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
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ────────────────────────────────────
     7. EMPRESAS SERVICES — hover effect
  ──────────────────────────────────── */
  document.querySelectorAll('.empresas__service-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.empresas__bullet').style.transform = 'scale(1.4)';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.empresas__bullet').style.transform = 'scale(1)';
    });
  });

})();
