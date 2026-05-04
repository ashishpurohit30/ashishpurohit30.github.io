
  /* ── Topbar scroll shadow ── */
  const topbar = document.getElementById('topbar');
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ── Scroll reveal via IntersectionObserver ── */
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  /* ── Animated number counters ── */
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const step = dur / 60;
    let cur = 0;
    const inc = target / (dur / 16);

    const tick = () => {
      cur = Math.min(cur + inc, target);
      el.textContent = (cur < 10 ? cur.toFixed(1).replace('.0','') : Math.round(cur)) + suffix;
      if (cur < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.metric-num[data-count]').forEach(el => counterObs.observe(el));

  /* ── Skill bar animation ── */
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.dataset.value + '%';
          }, i * 150);
        });
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  const skillBarsEl = document.getElementById('skill-bars');
  if (skillBarsEl) barObs.observe(skillBarsEl);

  /* ── Smooth active nav highlighting ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + e.target.id) {
            a.style.color = 'var(--accent-lt)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObs.observe(s));
