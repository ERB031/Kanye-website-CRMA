/* ==========================================
   CRMA! — Main JavaScript
   ========================================== */

(function () {
  'use strict';

  // ---- Scroll Reveal (Intersection Observer) ----
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Sticky Nav ----
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var scrollThreshold = 60;

    window.addEventListener('scroll', function () {
      if (window.scrollY > scrollThreshold) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }

  // ---- Mobile Menu ----
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    var menuLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Smooth Scroll for Nav Links ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        var navHeight = document.getElementById('nav').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // ---- Ambient Glow Effect (Hero) ----
  function initAmbientGlow() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var glow = document.createElement('div');
    glow.style.cssText =
      'position:absolute;top:50%;left:50%;width:500px;height:500px;' +
      'background:radial-gradient(circle,rgba(110,84,148,0.08) 0%,transparent 70%);' +
      'border-radius:50%;pointer-events:none;transform:translate(-50%,-50%);' +
      'animation:ambientFloat 8s ease-in-out infinite;z-index:1;';
    hero.appendChild(glow);

    // Add keyframes
    var style = document.createElement('style');
    style.textContent =
      '@keyframes ambientFloat {' +
      '0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }' +
      '33% { transform: translate(-45%, -55%) scale(1.1); opacity: 1; }' +
      '66% { transform: translate(-55%, -48%) scale(0.95); opacity: 0.7; }' +
      '}';
    document.head.appendChild(style);
  }

  // ---- Initialize ----
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initAmbientGlow();
  });

})();
