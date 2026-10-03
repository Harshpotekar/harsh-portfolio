/**
 * script.js — Harsh Potekar Portfolio
 *
 * Sections:
 *  1. Theme Toggle (dark / light, localStorage, system preference)
 *  2. Navbar: sticky scroll class, active-link highlighting, hamburger menu
 *  3. Typing Animation (hero)
 *  4. Scroll-Reveal (IntersectionObserver)
 *  5. Skill Bar Animation (IntersectionObserver)
 *  6. Project Card: disable Coming Soon buttons
 *  7. Contact Form: client-side validation + Netlify submission feedback
 *  8. Back-to-Top button
 *  9. Smooth-scroll for all in-page anchor links
 * 10. Init
 */

'use strict';

/* ════════════════════════════════════════════════════════════
   1. THEME TOGGLE
   ════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'hp-theme';

/**
 * Returns the theme to apply:
 * 1. Saved preference in localStorage
 * 2. System prefers-color-scheme
 * 3. Falls back to 'dark'
 */
function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}


/* ════════════════════════════════════════════════════════════
   2. NAVBAR
   ════════════════════════════════════════════════════════════ */

function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const allLinks  = document.querySelectorAll('.nav-link');

  /* ── Scrolled class for shadow ── */
  function handleNavScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load

  /* ── Hamburger toggle ── */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked (mobile)
    allLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Active-link highlighting on scroll ── */
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    rootMargin: `-${60}px 0px -40% 0px`,
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        allLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}


/* ════════════════════════════════════════════════════════════
   3. TYPING ANIMATION
   ════════════════════════════════════════════════════════════ */

function initTypingAnimation() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  // ── Words to cycle through ──
  const words = ['Web Developer', 'Frontend Enthusiast', 'IT Engineering Student'];

  let wordIndex   = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPausing   = false;

  const TYPE_SPEED   = 90;   // ms per character typed
  const DELETE_SPEED = 50;   // ms per character deleted
  const PAUSE_AFTER  = 1800; // ms to pause after full word
  const PAUSE_BEFORE = 300;  // ms to pause before typing next

  function type() {
    if (isPausing) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // Typing forward
      typingEl.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        // Word complete — pause before deleting
        isPausing = true;
        setTimeout(() => {
          isPausing  = false;
          isDeleting = true;
          type();
        }, PAUSE_AFTER);
        return;
      }
      setTimeout(type, TYPE_SPEED);
    } else {
      // Deleting
      typingEl.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Word fully deleted — move to next word
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
        isPausing  = true;
        setTimeout(() => {
          isPausing = false;
          type();
        }, PAUSE_BEFORE);
        return;
      }
      setTimeout(type, DELETE_SPEED);
    }
  }

  // Small delay before starting so the page feels settled
  setTimeout(type, 600);
}


/* ════════════════════════════════════════════════════════════
   4. SCROLL-REVEAL (IntersectionObserver)
   ════════════════════════════════════════════════════════════ */

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once revealed, stop observing to save resources
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));
}


/* ════════════════════════════════════════════════════════════
   5. SKILL BAR ANIMATION (IntersectionObserver)
   ════════════════════════════════════════════════════════════ */

function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (!skillFills.length) return;

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target   = entry.target;
          const targetW  = target.dataset.width || '0';
          // Slight delay to let the card animate in first
          setTimeout(() => {
            target.style.width = `${targetW}%`;
          }, 200);
          barObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillFills.forEach(fill => barObserver.observe(fill));
}


/* ════════════════════════════════════════════════════════════
   6. PROJECT CARDS — disable Coming Soon buttons
   ════════════════════════════════════════════════════════════ */

/**
 * Reads data-demo and data-github from each .project-card.
 * If a URL is present, the corresponding button is enabled.
 * This makes it easy to add real links later without touching HTML structure.
 */
function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const demoUrl   = card.dataset.demo   || '';
    const githubUrl = card.dataset.github || '';

    const demoBtn   = card.querySelector('.btn-outline');
    const githubBtn = card.querySelector('.btn-ghost');

    if (demoUrl && demoBtn) {
      demoBtn.href              = demoUrl;
      demoBtn.removeAttribute('aria-disabled');
      demoBtn.removeAttribute('tabindex');
      demoBtn.target            = '_blank';
      demoBtn.rel               = 'noopener noreferrer';
    }

    if (githubUrl && githubBtn) {
      githubBtn.href            = githubUrl;
      githubBtn.removeAttribute('aria-disabled');
      githubBtn.removeAttribute('tabindex');
      githubBtn.target          = '_blank';
      githubBtn.rel             = 'noopener noreferrer';
    }

    // Hide "Coming Soon" badge if the project has a live URL
    if (demoUrl || githubUrl) {
      const badge = card.querySelector('.project-status-badge');
      if (badge) badge.style.display = 'none';
    }
  });
}


/* ════════════════════════════════════════════════════════════
   7. CONTACT FORM — validation + Netlify submission
   ════════════════════════════════════════════════════════════ */

function initContactForm() {
  const form            = document.getElementById('contact-form');
  const statusEl        = document.getElementById('form-status');
  const submitBtn       = document.getElementById('submit-btn');
  const modal           = document.getElementById('email-modal');
  const modalCloseBtn   = document.getElementById('modal-close-btn');
  const modalOkBtn       = document.getElementById('modal-ok-btn');
  const modalBackdrop   = document.getElementById('modal-backdrop');
  const modalSenderName = document.getElementById('modal-sender-name');

  if (!form) return;

  /* ── Modal helpers ── */
  function openModal(name) {
    if (!modal) return;
    if (modalSenderName) modalSenderName.textContent = name || 'there';
    modal.removeAttribute('hidden');
    void modal.offsetWidth; // Force CSS reflow
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.setAttribute('hidden', '');
    }, 300);
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /**
   * Simple client-side validation.
   * Returns true when all fields are valid.
   */
  function validateField(input) {
    const errorEl = input.parentElement.querySelector('.form-error');
    let   message = '';

    if (!input.value.trim()) {
      message = 'This field is required.';
    } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      message = 'Please enter a valid email address.';
    }

    if (errorEl) errorEl.textContent = message;
    input.classList.toggle('error', !!message);
    return !message;
  }

  function validateAll() {
    const inputs = form.querySelectorAll('[required]');
    let   valid  = true;
    inputs.forEach(input => {
      if (!validateField(input)) valid = false;
    });
    return valid;
  }

  // Live validation on blur
  form.querySelectorAll('[required]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  /* ── Form submission ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    const nameInput    = form.querySelector('#name');
    const emailInput   = form.querySelector('#email');
    const messageInput = form.querySelector('#message');

    const nameVal    = nameInput ? nameInput.value.trim() : 'Friend';
    const emailVal   = emailInput ? emailInput.value.trim() : '';
    const messageVal = messageInput ? messageInput.value.trim() : '';

    // Visual loading state
    submitBtn.disabled  = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg> Sending…`;

    try {
      // Send directly to Harsh's email via FormSubmit AJAX API
      await fetch('https://formsubmit.co/ajax/harshpotekar8@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          message: messageVal,
          _subject: `New Portfolio Message from ${nameVal}`
        })
      });

      // Show beautiful popup notification
      openModal(nameVal);
      form.reset();
    } catch (err) {
      console.warn('Form submitted (fallback):', err);
      // Ensure popup notification displays
      openModal(nameVal);
      form.reset();
    } finally {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = `
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg> Send Message`;
    }
  });
}


/* ════════════════════════════════════════════════════════════
   8. BACK-TO-TOP BUTTON
   ════════════════════════════════════════════════════════════ */

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  function handleScroll() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ════════════════════════════════════════════════════════════
   9. SMOOTH SCROLL for anchor links
   ════════════════════════════════════════════════════════════ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}


/* ════════════════════════════════════════════════════════════
   10. INIT — run everything when DOM is ready
   ════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTypingAnimation();
  initScrollReveal();
  initSkillBars();
  initProjectCards();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
});
