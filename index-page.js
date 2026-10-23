/* Navigation, motion preferences, and Netlify contact delivery. */
(() => {
  'use strict';
  document.body.classList.add('js-ready');
  const root = document.documentElement;
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.nav-toggle');
  const closeMenu = (restoreFocus = false) => {
    const wasOpen = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (wasOpen && restoreFocus) menu.focus();
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 761px)').addEventListener?.('change', event => {
    if (event.matches) closeMenu();
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.getElementById('motion-toggle');
  let requestedPause = false;
  try { requestedPause = window.localStorage.getItem('portfolio-motion') === 'paused'; }
  catch { /* A blocked storage preference must not block the page. */ }
  let signal;
  const applyMotion = () => {
    const paused = reduced.matches || requestedPause;
    root.dataset.motion = paused ? 'paused' : 'playing';
    motionButton.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Play motion' : 'Pause motion';
    motionButton.disabled = reduced.matches;
    motionButton.setAttribute('aria-pressed', String(paused));
    signal?.setPaused(paused);
  };
  applyMotion();
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => {
    requestedPause = !requestedPause;
    applyMotion();
    try { window.localStorage.setItem('portfolio-motion', requestedPause ? 'paused' : 'playing'); }
    catch { /* Persistence is optional. */ }
  });
  reduced.addEventListener?.('change', applyMotion);

  if (window.createSignalStudy) {
    try {
      signal = window.createSignalStudy(document.getElementById('signal-canvas'));
      applyMotion();
    } catch { /* Keep the typographic fallback if canvas is unavailable. */ }
  }
  if ('IntersectionObserver' in window && !reduced.matches && !requestedPause) {
    const observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    document.body.classList.add('motion-ready');
  }

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button.disabled || !form.reportValidity()) return;
    const original = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Sending…';
    status.textContent = '';
    delete status.dataset.state;
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!response.ok) throw new Error('Contact service returned ' + response.status);
      status.dataset.state = 'success';
      status.textContent = 'Message sent. Thanks for reaching out!';
      form.reset();
    } catch {
      status.dataset.state = 'error';
      status.textContent = 'Your message could not be sent. Please email me directly using the address beside this form.';
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  });
})();
    
