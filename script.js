/* =============================================
   MATHESHWARAN K — PORTFOLIO SCRIPTS
   script.js
   ============================================= */

'use strict';

/* ══════════════════════════════════════
   1. CUSTOM CURSOR
══════════════════════════════════════ */
/*
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower via requestAnimationFrame
  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .skill-card, .project-card, .cert-card, .stat-card, .tag'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
});
*/

/* ══════════════════════════════════════
   2. NAVBAR — SCROLL BEHAVIOR + ACTIVE LINK
══════════════════════════════════════ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scrolled style
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightActiveLink();
  }, { passive: true });

  // Active link highlighting
  function highlightActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Smooth close on link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });
})();

/* ══════════════════════════════════════
   3. HAMBURGER MENU
══════════════════════════════════════ */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => toggleMenu());

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      closeMenu();
    }
  });

  window.toggleMenu = function () {
    const open = links.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open);
  };

  window.closeMenu = function () {
    links.classList.remove('open');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', false);
    document.body.classList.remove('menu-open');
  };
})();

/* ══════════════════════════════════════
   4. TYPING ANIMATION
══════════════════════════════════════ */
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Frontend Developer',
    'Web Enthusiast',
    'Problem Solver',
    'UI/UX Explorer',
    'Full Stack Learner',
  ];

  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    const displayed = isDeleting
      ? current.substring(0, charIdx - 1)
      : current.substring(0, charIdx + 1);

    el.textContent = displayed;

    if (!isDeleting && displayed === current) {
      // Pause at end of phrase
      setTimeout(() => { isDeleting = true; type(); }, 1600);
      return;
    }
    if (isDeleting && displayed === '') {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      charIdx = 0;
      setTimeout(type, 400);
      return;
    }

    charIdx = isDeleting ? charIdx - 1 : charIdx + 1;
    setTimeout(type, isDeleting ? 55 : 90);
  }

  setTimeout(type, 800);
})();

/* ══════════════════════════════════════
   5. SCROLL REVEAL ANIMATIONS
══════════════════════════════════════ */
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger children inside the same parent
          const siblings = entry.target.parentElement
            ? [...entry.target.parentElement.querySelectorAll('.reveal')]
            : [];
          const delay = siblings.indexOf(entry.target) * 80;

          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
})();

(function initAvatarPhoto() {
  const avatarPhoto = document.querySelector('.avatar-photo');
  if (!avatarPhoto) return;

  const showAvatar = () => {
    avatarPhoto.parentElement.classList.add('has-photo');
    avatarPhoto.classList.add('loaded');
  };

  avatarPhoto.addEventListener('load', showAvatar);
  if (avatarPhoto.complete && avatarPhoto.naturalWidth > 0) {
    showAvatar();
  }
})();

/* ══════════════════════════════════════
   6. RESUME VIEWER
══════════════════════════════════════ */
(function initResumeViewer() {
  const resumeTrigger = document.getElementById('resume-trigger');
  const resumeDownload = document.getElementById('resume-download');
  const panel = document.getElementById('resume-panel');
  const iframe = document.getElementById('resume-iframe');
  const closeBtn = document.getElementById('resume-close');
  if (!resumeTrigger || !resumeDownload || !panel || !iframe || !closeBtn) return;

  const resumeUrl = resumeTrigger.dataset.resumeUrl;
  resumeDownload.href = 'https://drive.google.com/uc?export=download&id=1ao6uadaXITasKRHjQmOeEm0NctiG7hak';

  resumeTrigger.addEventListener('click', e => {
    e.preventDefault();
    iframe.src = resumeUrl;
    panel.classList.add('active');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('active');
    iframe.src = '';
  });
})();

/* ══════════════════════════════════════
   6. CONTACT FORM
══════════════════════════════════════ */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    // Simulated async send (replace with actual API call when ready)
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      form.reset();
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1800);
  });
})();

/* ══════════════════════════════════════
   7. SMOOTH SCROLL (polyfill for older browsers)
══════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ══════════════════════════════════════
   8. SKILL CARD — STAGGER ON HOVER GROUP
══════════════════════════════════════ */
(function initSkillHover() {
  document.querySelectorAll('.skills-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.skill-card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 30}ms`;
    });
  });
})();

/* ══════════════════════════════════════
   9. ACTIVE SECTION PROGRESS — NAV INDICATOR
   (visual feedback for how far through a section)
══════════════════════════════════════ */
(function initScrollProgress() {
  // Inject a thin progress bar at the very top
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; width: 0%;
    background: linear-gradient(90deg, #38bdf8, #8b5cf6);
    z-index: 2000; transition: width 0.1s linear; pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
})();

/* ══════════════════════════════════════
   10. SECTION ENTRANCE — HERO IMMEDIATE
══════════════════════════════════════ */
(function initHeroEntrance() {
  const heroRevealEls = document.querySelectorAll('.hero .reveal');
  heroRevealEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 200 + i * 150);
  });
})();
