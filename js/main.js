/**
 * TNR HR Business Solutions - Shared JavaScript
 * Handles: header, mobile menu, scroll reveal, count-up, forms, dropdowns
 */

(function() {
  'use strict';

  /* ── Header Scroll Effect ────────────────────── */
  const header = document.getElementById('main-header');
  let lastScroll = 0;

  function updateHeader() {
    const scrollY = window.scrollY;
    if (!header) return;

    header.classList.add('scrolled');
    header.style.background = 'oklch(var(--background-50) / 0.95)';
    header.style.backdropFilter = 'blur(12px)';
    header.style.borderBottom = '1px solid oklch(var(--background-200) / 0.7)';
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  document.addEventListener('DOMContentLoaded', updateHeader);

  /* ── Mobile Menu ───────────────────────────────── */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen
        ? '<i class="ri-close-line text-xl"></i>'
        : '<i class="ri-menu-line text-xl"></i>';
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="ri-menu-line text-xl"></i>';
      });
    });
  }

  /* ── Dropdowns ─────────────────────────────────── */
  document.querySelectorAll('[data-dropdown]').forEach(function(trigger) {
    const panelId = trigger.getAttribute('data-dropdown');
    const panel = document.getElementById(panelId);
    if (!panel) return;

    let timeout;

    trigger.addEventListener('mouseenter', function() {
      clearTimeout(timeout);
      panel.classList.add('open');
    });

    trigger.addEventListener('mouseleave', function() {
      timeout = setTimeout(function() {
        panel.classList.remove('open');
      }, 150);
    });

    panel.addEventListener('mouseenter', function() {
      clearTimeout(timeout);
    });

    panel.addEventListener('mouseleave', function() {
      timeout = setTimeout(function() {
        panel.classList.remove('open');
      }, 150);
    });

    // Mobile: click to toggle
    trigger.addEventListener('click', function(e) {
      if (window.innerWidth < 768) {
        e.preventDefault();
        panel.classList.toggle('open');
      }
    });
  });

  /* ── Scroll Reveal (IntersectionObserver) ────────── */
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-mask').forEach(function(el) {
    revealObserver.observe(el);
  });

  /* ── Count-Up Animation ────────────────────────── */
  function animateCountUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const countUpObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        countUpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count-up]').forEach(function(el) {
    countUpObserver.observe(el);
  });

  /* ── Hero Parallax ─────────────────────────────── */
  const heroSection = document.getElementById('hero-section');
  const heroText = document.getElementById('hero-text-wrap');

  if (heroSection && heroText) {
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      const progress = Math.min(scrollY / (heroHeight * 0.6), 1);
      heroText.style.transform = 'translateY(' + (-progress * 100) + 'px)';
      heroText.style.opacity = String(1 - progress * 0.7);
    }, { passive: true });
  }

  /* ── Smooth scroll for anchor links ────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── Form Helpers ──────────────────────────────── */
  window.handleFormSubmit = async function(form, submitUrl, onSuccess) {
    const formData = new FormData(form);

    // Honeypot check
    const honeypot = formData.get('phone_alt') || formData.get('company_alt') || formData.get('website_alt');
    if (honeypot && honeypot.toString().trim() !== '') {
      if (onSuccess) onSuccess();
      return;
    }

    // Build payload
    const payload = new URLSearchParams();
    formData.forEach(function(value, key) {
      if (!['phone_alt', 'company_alt', 'website_alt'].includes(key)) {
        payload.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      const responseText = await response.text();
      let parsed = null;
      try { parsed = JSON.parse(responseText); } catch(e) {}

      if (response.ok && (!parsed || parsed.code === 'OK' || !(parsed.meta && parsed.meta.message && parsed.meta.message.toLowerCase().includes('spam')))) {
        if (onSuccess) onSuccess();
      } else {
        throw new Error((parsed && parsed.meta && parsed.meta.message) || responseText || 'Submission failed');
      }
    } catch(err) {
      throw err;
    }
  };

  /* ── Show Toast ────────────────────────────────── */
  window.showToast = function(message, type) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(function() { toast.remove(); }, 300);
    }, 4000);
  };

  /* ── Admin Auth Check ──────────────────────────── */
  window.isAdminAuthenticated = function() {
    return sessionStorage.getItem('tnr_admin_authenticated') === 'true';
  };

  window.requireAdmin = function() {
    if (!window.isAdminAuthenticated()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  };

  /* ── LocalStorage Helpers ──────────────────────── */
  window.loadFromStorage = function(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      const data = raw ? JSON.parse(raw) : null;
      return (data && data.length > 0) ? data : fallback;
    } catch(e) {
      return fallback;
    }
  };

  /* ── Active Nav Link ───────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('text-accent-500');
    }
  });

})();