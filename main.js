/* =====================================================
   MAIN.JS — Portfolio Nguyễn Thị Anh Thơ (Feminine v2)
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ===== PRELOADER ===== */
  const preloader = document.getElementById('preloader');
  const fill = document.querySelector('.preloader__fill');

  if (fill) fill.style.width = '100%';

  const hideLoader = () => {
    if (preloader) preloader.classList.add('out');
    // Trigger fade-in for hero elements
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('visible');
    });
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 1100);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 1100));
  }


  /* ===== NAVBAR SCROLL ===== */
  const header = document.getElementById('site-header');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ===== MOBILE BURGER ===== */
  const burger  = document.getElementById('burger-btn');
  const drawer  = document.getElementById('nav-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closBtn = document.getElementById('drawer-close');

  const openMenu = () => {
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
  };

  burger?.addEventListener('click', openMenu);
  closBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  document.querySelectorAll('.drawer-link').forEach(l => {
    l.addEventListener('click', closeMenu);
  });


  /* ===== INTERSECTION OBSERVER — REVEAL ===== */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.13 });

  revealEls.forEach(el => revealObs.observe(el));


  /* ===== SKILL BARS ===== */
  const bars = document.querySelectorAll('.sbar__fill');

  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(b => barObs.observe(b));


  /* ===== COUNTER ANIMATION ===== */
  const counters = document.querySelectorAll('.stat__n');

  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el   = e.target;
      const raw  = el.textContent;
      const num  = parseInt(raw.replace(/\D/g, ''));
      const sfx  = raw.replace(/\d/g, '');
      let cur    = 0;
      const step = num / 55;
      const t    = setInterval(() => {
        cur += step;
        if (cur >= num) { cur = num; clearInterval(t); }
        el.textContent = Math.floor(cur) + sfx;
      }, 22);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.8 });

  counters.forEach(c => cntObs.observe(c));


  /* ===== PORTFOLIO FILTER ===== */
  const filterBtns = document.querySelectorAll('.filter-pill');
  const pfItems    = document.querySelectorAll('.pf-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      pfItems.forEach(item => {
        const cat = item.dataset.cat;
        const show = filter === 'all' || cat === filter;
        item.classList.toggle('hidden', !show);
        if (show) {
          item.style.animation = 'none';
          item.offsetHeight; // reflow
          item.style.animation = '';
        }
      });
    });
  });


  /* ===== MARQUEE PAUSE ON HOVER ===== */
  const mTrack = document.querySelector('.marquee-track');
  if (mTrack) {
    mTrack.addEventListener('mouseenter', () => mTrack.style.animationPlayState = 'paused');
    mTrack.addEventListener('mouseleave', () => mTrack.style.animationPlayState = 'running');
  }


  /* ===== CONTACT FORM ===== */
  const form    = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const original = submitBtn.textContent;
    submitBtn.textContent = 'Đang gửi...';
    submitBtn.disabled = true;

    await new Promise(r => setTimeout(r, 1800));

    submitBtn.textContent = '✓ Đã Gửi Thành Công!';
    submitBtn.style.background = '#2DD4BF';

    setTimeout(() => {
      submitBtn.textContent = original;
      submitBtn.disabled = false;
      submitBtn.style.background = '';
      form.reset();
    }, 3200);
  });


  /* ===== SMOOTH ACTIVE NAV HIGHLIGHT ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item:not(.nav-item--pill)');

  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => secObs.observe(s));


  /* ===== PARALLAX — hero portrait ===== */
  const portrait = document.querySelector('.portrait-frame');

  const onMouseMove = e => {
    if (!portrait) return;
    const mx = (e.clientX / window.innerWidth  - 0.5) * 14;
    const my = (e.clientY / window.innerHeight - 0.5) * 10;
    portrait.style.transform = `translate(${mx}px, ${my}px)`;
  };
  window.addEventListener('mousemove', onMouseMove);


  /* ===== HERO: scroll fade ===== */
  window.addEventListener('scroll', () => {
    const heroLayout = document.querySelector('.hero-layout');
    if (!heroLayout) return;
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroLayout.style.opacity = 1 - scrolled / (window.innerHeight * 0.6);
    }
  }, { passive: true });

});
