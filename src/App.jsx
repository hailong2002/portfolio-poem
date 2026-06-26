import React, { useEffect, useState } from 'react';

export default function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Preloader
    const hideLoader = () => {
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.classList.add('out');
      document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
      });
    };
    const t = setTimeout(hideLoader, 1100);

    // Scroll Header
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const heroLayout = document.querySelector('.hero-layout');
      if (heroLayout) {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroLayout.style.opacity = 1 - scrolled / (window.innerHeight * 0.6);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Intersection Observers
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

    const counters = document.querySelectorAll('.stat__n');
    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const raw = el.textContent;
        const num = parseInt(raw.replace(/\D/g, ''));
        const sfx = raw.replace(/\d/g, '');
        let cur = 0;
        const step = num / 55;
        const interval = setInterval(() => {
          cur += step;
          if (cur >= num) { cur = num; clearInterval(interval); }
          el.textContent = Math.floor(cur) + sfx;
        }, 22);
        cntObs.unobserve(el);
      });
    }, { threshold: 0.8 });
    counters.forEach(c => cntObs.observe(c));

    // Active Nav Highlight
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

    // Parallax
    const portrait = document.querySelector('.portrait-frame');
    const onMouseMove = e => {
      if (!portrait) return;
      const mx = (e.clientX / window.innerWidth - 0.5) * 14;
      const my = (e.clientY / window.innerHeight - 0.5) * 10;
      portrait.style.transform = `translate(${mx}px, ${my}px)`;
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      revealObs.disconnect();
      barObs.disconnect();
      cntObs.disconnect();
      secObs.disconnect();
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setSubmitSuccess(true);
    setIsSubmitting(false);
    setTimeout(() => {
      setSubmitSuccess(false);
      e.target.reset();
    }, 3200);
  };

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <div id="preloader" className="preloader">
        <div className="preloader__inner">
          <p className="preloader__name">ANH THƠ</p>
          <div className="preloader__bar"><div className="preloader__fill" style={{ width: '100%' }}></div></div>
        </div>
      </div>

      <header id="site-header" className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <a href="#home" className="logo" id="logo-link">
            <span className="logo__at">ANH</span><span className="logo__tho"> THƠ</span>
          </a>

          <nav id="main-nav" className="main-nav" role="navigation" aria-label="Main navigation">
            <a href="#about" className="nav-item" id="nav-about">Về Tôi</a>
            <a href="#services" className="nav-item" id="nav-services">Dịch Vụ</a>
            <a href="#portfolio" className="nav-item" id="nav-portfolio">Portfolio</a>
            <a href="#skills" className="nav-item" id="nav-skills">Kỹ Năng</a>
            <a href="#contact" className="nav-item nav-item--pill" id="nav-contact">Liên Hệ ✦</a>
          </nav>

          <button className="burger" id="burger-btn" aria-label="Open menu" aria-expanded={isDrawerOpen} onClick={() => setDrawerOpen(true)}>
            <span></span><span></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div id="nav-drawer" className={`nav-drawer ${isDrawerOpen ? 'open' : ''}`} aria-hidden={!isDrawerOpen}>
        <button className="drawer-close" id="drawer-close" aria-label="Close menu" onClick={closeDrawer}>✕</button>
        <nav className="drawer-nav">
          <a href="#about" className="drawer-link" onClick={closeDrawer}>Về Tôi</a>
          <a href="#services" className="drawer-link" onClick={closeDrawer}>Dịch Vụ</a>
          <a href="#portfolio" className="drawer-link" onClick={closeDrawer}>Portfolio</a>
          <a href="#skills" className="drawer-link" onClick={closeDrawer}>Kỹ Năng</a>
          <a href="#contact" className="drawer-link drawer-link--cta" onClick={closeDrawer}>Liên Hệ</a>
        </nav>
        <div className="drawer-bottom">
          <a href="tel:0983967621">0983 967 621</a>
        </div>
      </div>
      <div id="drawer-overlay" className={`drawer-overlay ${isDrawerOpen ? 'show' : ''}`} onClick={closeDrawer}></div>

      {/* Main Content */}
      <main>



        {/*  ===== HERO =====  */}
        <section id="home" className="hero">
          {/*  Giant editorial background letters  */}
          <span className="hero-bg-letter" aria-hidden="true">P</span>
          <span className="hero-bg-letter hero-bg-letter--2" aria-hidden="true">O</span>

          {/*  Colour blocks  */}
          <div className="hero-block hero-block--mint" aria-hidden="true"></div>
          <div className="hero-block hero-block--pink" aria-hidden="true"></div>
          <div className="hero-block hero-block--lavender" aria-hidden="true"></div>

          <div className="hero-layout">
            {/*  Left: stacked text  */}
            <div className="hero-text">
              <p className="hero-label fade-in" style={{ '--d': '.1s' }}>✦ CREATIVE PORTFOLIO</p>

              {/*  Big chunky staggered name — inspired by template  */}
              <div className="hero-title-block fade-in" style={{ '--d': '.2s' }}>
                <div className="title-row">
                  <span className="title-big">NGUYỄN</span>
                </div>
                <div className="title-row title-row--indent">
                  <span className="title-big title-big--outline">THỊ</span>
                  <span className="title-big title-big--pink"> ANH</span>
                </div>
                <div className="title-row">
                  <span className="title-big">THƠ</span>
                </div>
              </div>

              <div className="hero-roles fade-in" style={{ '--d': '.4s' }}>
                <span className="role-pill role-pill--mint">Videographer</span>
                <span className="role-pill role-pill--pink">Photographer</span>
                <span className="role-pill role-pill--lav">Editor</span>
              </div>

              <p className="hero-tagline fade-in" style={{ '--d': '.5s' }}>
                <em>Kể câu chuyện của bạn<br />qua từng khung hình đẹp nhất</em>
              </p>

              <div className="hero-cta fade-in" style={{ '--d': '.65s' }}>
                <a href="#portfolio" className="btn btn--pink" id="hero-btn-work">Xem Portfolio</a>
                <a href="#contact" className="btn btn--ghost" id="hero-btn-contact">Liên Hệ</a>
              </div>
            </div>

            {/*  Right: portrait with decorative frames  */}
            <div className="hero-portrait-wrap fade-in" style={{ '--d': '.3s' }}>
              <div className="portrait-frame">
                <div className="portrait-bg-mint"></div>
                <img src="assets/tho_1.jpg" alt="Nguyễn Thị Anh Thơ — Videographer" className="portrait-img" />
                <div className="portrait-badge">
                  <span>2+</span>
                  <small>Năm<br />Kinh Nghiệm</small>
                </div>
                <div className="portrait-accent-line portrait-accent-line--v"></div>
                <div className="portrait-accent-line portrait-accent-line--h"></div>
              </div>

              {/*  Floating stat cards  */}
              <div className="float-card float-card--1">
                <span className="float-card__num">100+</span>
                <span className="float-card__label">Dự Án</span>
              </div>
              <div className="float-card float-card--2">
                <span className="float-card__num">80+</span>
                <span className="float-card__label">Khách Hàng</span>
              </div>
            </div>
          </div>

          {/*  Scroll cue  */}
          <div className="scroll-cue">
            <span>scroll</span>
            <div className="scroll-cue__line"></div>
          </div>
        </section>

        {/*  ===== MARQUEE =====  */}
        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee-track" onMouseEnter={(e) => e.currentTarget.style.animationPlayState = "paused"} onMouseLeave={(e) => e.currentTarget.style.animationPlayState = "running"}>
            <span>Videographer</span><span className="mx">✦</span>
            <span>Photographer</span><span className="mx">✦</span>
            <span>Editor</span><span className="mx">✦</span>
            <span>Storyteller</span><span className="mx">✦</span>
            <span>Color Grading</span><span className="mx">✦</span>
            <span>Creative Director</span><span className="mx">✦</span>
            <span>Videographer</span><span className="mx">✦</span>
            <span>Photographer</span><span className="mx">✦</span>
            <span>Editor</span><span className="mx">✦</span>
            <span>Storyteller</span><span className="mx">✦</span>
            <span>Color Grading</span><span className="mx">✦</span>
            <span>Creative Director</span><span className="mx">✦</span>
          </div>
        </div>

        {/*  ===== ABOUT =====  */}
        <section id="about" className="about section">
          <div className="container">
            <div className="about-grid">
              {/*  Images collage  */}
              <div className="about-collage reveal-left">
                <div className="collage-block collage-block--main">
                  <img src="assets/tho_2.jpg" alt="Nguyễn Thị Anh Thơ trong studio" />
                </div>
                <div className="collage-block collage-block--small">
                  <img src="assets/tho_3.jpg" alt="Chụp ảnh chân dung" />
                  <div className="collage-label">THE CREATIVE</div>
                </div>
                <div className="collage-deco collage-deco--circle"></div>
                <div className="collage-deco collage-deco--plus">✦</div>
              </div>

              {/*  Text  */}
              <div className="about-content reveal-right">
                <div className="section-tag">✦ Về Tôi</div>
                <h2 className="section-heading">
                  <em>Đam Mê &</em><br />
                  Sáng Tạo
                </h2>
                <p className="about-intro">
                  Xin chào! Tôi là <strong>Nguyễn Thị Anh Thơ</strong> — Videographer, Photographer và Editor với hơn <strong>2 năm kinh nghiệm</strong> sáng tạo nội dung hình ảnh chất lượng cao.
                </p>
                <p className="about-body">
                  Tôi đam mê kể những câu chuyện đẹp qua ánh sáng và góc máy, từ những khoảnh khắc lãng mạn trong phim cưới, vẻ đẹp thời trang editorial, đến video thương hiệu ấn tượng.
                </p>
                <p className="about-body">
                  Mỗi khung hình là một tác phẩm — tôi không chỉ ghi lại, mà còn <em>cảm nhận và tạo ra cảm xúc</em>.
                </p>

                <div className="about-stats">
                  <div className="stat">
                    <span className="stat__n">2+</span>
                    <span className="stat__l">Năm Kinh Nghiệm</span>
                  </div>
                  <div className="stat">
                    <span className="stat__n">200+</span>
                    <span className="stat__l">Dự Án</span>
                  </div>
                  <div className="stat">
                    <span className="stat__n">50+</span>
                    <span className="stat__l">Khách Hàng</span>
                  </div>
                </div>

                <a href="#contact" className="btn btn--pink" id="about-btn-contact">Làm Việc Cùng Tôi →</a>
              </div>
            </div>
          </div>
        </section>

        {/*  ===== SERVICES =====  */}
        <section id="services" className="services section section--soft">
          <div className="container">
            <div className="section-header reveal-up">
              <div className="section-tag section-tag--center">✦ Dịch Vụ</div>
              <h2 className="section-heading section-heading--center">
                Những Gì Tôi <em>Tạo Ra</em>
              </h2>
            </div>

            <div className="services-row">
              {/*  Card 1  */}
              <div className="svc-card reveal-up" id="svc-video" style={{ '--d': '.05s' }}>
                <div className="svc-card__img-wrap">
                  <img src="assets/service_video.png" alt="Quay phim" className="svc-card__img" />
                  <div className="svc-card__num">01</div>
                </div>
                <div className="svc-card__body">
                  <div className="svc-card__icon">🎬</div>
                  <h3 className="svc-card__title">Quay Phim</h3>
                  <p className="svc-card__desc">MV, TVC, phim sự kiện & phóng sự thương hiệu với thiết bị chuyên nghiệp và góc nhìn sáng tạo.</p>
                  <ul className="svc-list">
                    <li>MV ca nhạc & phim ngắn</li>
                    <li>TVC thương mại</li>
                    <li>Video doanh nghiệp</li>
                    <li>Drone videography</li>
                  </ul>
                </div>
              </div>

              {/*  Card 2 — highlighted  */}
              <div className="svc-card svc-card--featured reveal-up" id="svc-photo" style={{ '--d': '.15s' }}>
                <div className="svc-card__img-wrap">
                  <img src="assets/work_fashion.png" alt="Chụp ảnh" className="svc-card__img" />
                  <div className="svc-card__num">02</div>
                </div>
                <div className="svc-card__body">
                  <div className="svc-card__icon">📸</div>
                  <h3 className="svc-card__title">Chụp Ảnh</h3>
                  <p className="svc-card__desc">Chân dung, thời trang, sản phẩm & sự kiện — mỗi bức ảnh là một câu chuyện riêng biệt.</p>
                  <ul className="svc-list">
                    <li>Chân dung & cá nhân</li>
                    <li>Thời trang & editorial</li>
                    <li>Ảnh sản phẩm</li>
                    <li>Ảnh sự kiện</li>
                  </ul>
                </div>
              </div>

              {/*  Card 3  */}
              <div className="svc-card reveal-up" id="svc-edit" style={{ '--d': '.25s' }}>
                <div className="svc-card__img-wrap">
                  <img src="assets/work_product.png" alt="Dựng phim" className="svc-card__img" />
                  <div className="svc-card__num">03</div>
                </div>
                <div className="svc-card__body">
                  <div className="svc-card__icon">✂️</div>
                  <h3 className="svc-card__title">Dựng Phim & Hậu Kỳ</h3>
                  <p className="svc-card__desc">Biên tập, color grading và motion graphics — hoàn thiện mọi chi tiết để sản phẩm thật xuất sắc.</p>
                  <ul className="svc-list">
                    <li>Biên tập & dựng phim</li>
                    <li>Color grading</li>
                    <li>Motion graphics</li>
                    <li>Sound design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  ===== PORTFOLIO =====  */}
        <section id="portfolio" className="portfolio section">
          <div className="container">
            <div className="section-header reveal-up">
              <div className="section-tag section-tag--center">✦ Portfolio</div>
              <h2 className="section-heading section-heading--center">
                Những Khoảnh Khắc <em>Đẹp Nhất</em>
              </h2>
            </div>

            {/*  Filter  */}
            <div className="filter-row reveal-up">
              <button className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Tất Cả</button>
              <button className={`filter-pill ${activeFilter === 'video' ? 'active' : ''}`} onClick={() => setActiveFilter('video')}>Video</button>
              <button className={`filter-pill ${activeFilter === 'photo' ? 'active' : ''}`} onClick={() => setActiveFilter('photo')}>Ảnh</button>
              <button className={`filter-pill ${activeFilter === 'edit' ? 'active' : ''}`} onClick={() => setActiveFilter('edit')}>Hậu Kỳ</button>
            </div>

            {/*  Masonry-style grid  */}
            <div className="pf-grid">
              <div className={`pf-item pf-item--tall ${activeFilter !== 'all' && activeFilter !== 'photo' ? 'hidden' : ''}`} data-cat="photo" id="pf1" style={{ '--d': '.05s' }}>
                <img src="assets/work_wedding.png" alt="Wedding Cinematic" className="pf-img" />
                <div className="pf-overlay">
                  <span className="pf-cat">Photography</span>
                  <h3 className="pf-title">Wedding Cinematic Film</h3>
                  <span className="pf-link">Xem thêm →</span>
                </div>
              </div>

              <div className={`pf-item ${activeFilter !== 'all' && activeFilter !== 'photo' ? 'hidden' : ''}`} data-cat="photo" id="pf2" style={{ '--d': '.1s' }}>
                <img src="assets/work_fashion.png" alt="Fashion Editorial" className="pf-img" />
                <div className="pf-overlay">
                  <span className="pf-cat">Fashion</span>
                  <h3 className="pf-title">Fashion Editorial</h3>
                  <span className="pf-link">Xem thêm →</span>
                </div>
              </div>

              <div className={`pf-item ${activeFilter !== 'all' && activeFilter !== 'photo' ? 'hidden' : ''}`} data-cat="photo" id="pf3" style={{ '--d': '.15s' }}>
                <img src="assets/tho_3.jpg" alt="Portrait Series" className="pf-img" />
                <div className="pf-overlay">
                  <span className="pf-cat">Portrait</span>
                  <h3 className="pf-title">Portrait Series</h3>
                  <span className="pf-link">Xem thêm →</span>
                </div>
              </div>

              <div className={`pf-item pf-item--wide ${activeFilter !== 'all' && activeFilter !== 'video' ? 'hidden' : ''}`} data-cat="video" id="pf4" style={{ '--d': '.2s' }}>
                <img src="assets/work_event.png" alt="Event Coverage" className="pf-img" />
                <div className="pf-overlay">
                  <span className="pf-cat">Event</span>
                  <h3 className="pf-title">Corporate Event Film</h3>
                  <span className="pf-link">Xem thêm →</span>
                </div>
              </div>

              <div className={`pf-item ${activeFilter !== 'all' && activeFilter !== 'photo' ? 'hidden' : ''}`} data-cat="photo" id="pf5" style={{ '--d': '.25s' }}>
                <img src="assets/work_product.png" alt="Product Photography" className="pf-img" />
                <div className="pf-overlay">
                  <span className="pf-cat">Product</span>
                  <h3 className="pf-title">Product Photography</h3>
                  <span className="pf-link">Xem thêm →</span>
                </div>
              </div>

              <div className={`pf-item pf-item--tall ${activeFilter !== 'all' && activeFilter !== 'video' ? 'hidden' : ''}`} data-cat="video" id="pf6" style={{ '--d': '.3s' }}>
                <img src="assets/tho_2.jpg" alt="MV Production" className="pf-img" />
                <div className="pf-overlay">
                  <span className="pf-cat">Music Video</span>
                  <h3 className="pf-title">MV Production 2024</h3>
                  <span className="pf-link">Xem thêm →</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  ===== SKILLS =====  */}
        <section id="skills" className="skills section section--soft">
          <div className="container">
            <div className="skills-layout">
              <div className="skills-left reveal-left">
                <div className="section-tag">✦ Kỹ Năng</div>
                <h2 className="section-heading">
                  Thành Thạo<br /><em>Công Cụ Sáng Tạo</em>
                </h2>
                <p className="skills-desc">
                  Tôi nắm vững các phần mềm và thiết bị hàng đầu ngành, giúp biến ý tưởng của bạn thành những sản phẩm hình ảnh hoàn hảo.
                </p>

                <div className="gear-tags">
                  <span className="gear-tag">Sony FX6</span>
                  <span className="gear-tag">RED Cinema</span>
                  <span className="gear-tag">DJI Drone</span>
                  <span className="gear-tag">Canon EOS R</span>
                  <span className="gear-tag">Aputure</span>
                  <span className="gear-tag">Gimbal</span>
                </div>
              </div>

              <div className="skills-right reveal-right">
                <div className="sbar-group">
                  <div className="sbar" id="sb-premiere">
                    <div className="sbar__top">
                      <span className="sbar__name">Adobe Premiere Pro</span>
                      <span className="sbar__pct">95%</span>
                    </div>
                    <div className="sbar__track"><div className="sbar__fill" data-w="95"></div></div>
                  </div>
                  <div className="sbar" id="sb-ae">
                    <div className="sbar__top">
                      <span className="sbar__name">After Effects</span>
                      <span className="sbar__pct">85%</span>
                    </div>
                    <div className="sbar__track"><div className="sbar__fill" data-w="85"></div></div>
                  </div>
                  <div className="sbar" id="sb-davinci">
                    <div className="sbar__top">
                      <span className="sbar__name">DaVinci Resolve</span>
                      <span className="sbar__pct">90%</span>
                    </div>
                    <div className="sbar__track"><div className="sbar__fill" data-w="90"></div></div>
                  </div>
                  <div className="sbar" id="sb-lr">
                    <div className="sbar__top">
                      <span className="sbar__name">Lightroom / Photoshop</span>
                      <span className="sbar__pct">92%</span>
                    </div>
                    <div className="sbar__track"><div className="sbar__fill" data-w="92"></div></div>
                  </div>
                  <div className="sbar" id="sb-cam">
                    <div className="sbar__top">
                      <span className="sbar__name">Camera Operation</span>
                      <span className="sbar__pct">98%</span>
                    </div>
                    <div className="sbar__track"><div className="sbar__fill" data-w="98"></div></div>
                  </div>
                  <div className="sbar" id="sb-light">
                    <div className="sbar__top">
                      <span className="sbar__name">Lighting Setup</span>
                      <span className="sbar__pct">88%</span>
                    </div>
                    <div className="sbar__track"><div className="sbar__fill" data-w="88"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  ===== TESTIMONIALS =====  */}
        <section className="testi section">
          <div className="container">
            <div className="section-header reveal-up">
              <div className="section-tag section-tag--center">✦ Đánh Giá</div>
              <h2 className="section-heading section-heading--center">
                Khách Hàng <em>Yêu Thích</em>
              </h2>
            </div>

            <div className="testi-grid">
              <div className="testi-card reveal-up" id="tc1" style={{ '--d': '.05s' }}>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">"Anh Thơ đã biến đám cưới của chúng tôi thành một bộ phim thực sự chạm đến tim. Mỗi lần xem lại đều rơi nước mắt. Tuyệt vời hơn mọi kỳ vọng!"</p>
                <div className="testi-author">
                  <div className="testi-av testi-av--pink">LH</div>
                  <div>
                    <strong>Lan Hương</strong>
                    <small>Cô dâu — Wedding Film 2024</small>
                  </div>
                </div>
              </div>

              <div className="testi-card testi-card--featured reveal-up" id="tc2" style={{ '--d': '.15s' }}>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">"TVC của chúng tôi đạt 2 triệu view! Hình ảnh đẹp, ý tưởng sáng tạo và quy trình làm việc cực kỳ chuyên nghiệp. Đối tác tin cậy cho mọi chiến dịch."</p>
                <div className="testi-author">
                  <div className="testi-av testi-av--mint">MT</div>
                  <div>
                    <strong>Minh Tuấn</strong>
                    <small>Brand Manager — TVC Campaign</small>
                  </div>
                </div>
              </div>

              <div className="testi-card reveal-up" id="tc3" style={{ '--d': '.25s' }}>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">"Bộ ảnh sản phẩm của Anh Thơ giúp doanh thu tăng 40% tháng đầu. Kỹ năng ánh sáng và bố cục cực kỳ chuyên nghiệp và tinh tế."</p>
                <div className="testi-author">
                  <div className="testi-av testi-av--lav">PL</div>
                  <div>
                    <strong>Phương Linh</strong>
                    <small>CEO — E-commerce Brand</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  ===== CONTACT =====  */}
        <section id="contact" className="contact section">
          <div className="container">
            {/*  Editorial heading  */}
            <div className="contact-editorial reveal-up">
              <div className="section-tag section-tag--center">✦ Liên Hệ</div>
              <h2 className="contact-heading">
                <span className="ch-row">Hãy Cùng</span>
                <span className="ch-row ch-row--accent"><em>Hợp Tác</em></span>
                <span className="ch-row ch-row--outline">Nào!</span>
              </h2>
              <p className="contact-sub">Bạn có dự án thú vị? Tôi rất mong được nghe và tạo nên điều kỳ diệu cùng bạn!</p>
            </div>

            <div className="contact-layout">
              {/*  Info  */}
              <div className="contact-info reveal-left">
                <a href="tel:0983967621" className="cinfo-item" id="ci-phone">
                  <div className="cinfo-icon cinfo-icon--pink">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z" /></svg>
                  </div>
                  <div>
                    <span className="cinfo-label">Điện Thoại</span>
                    <strong className="cinfo-value">0983 967 621</strong>
                  </div>
                </a>

                <a href="https://www.facebook.com/nguyenthianhtho266" target="_blank" rel="noopener noreferrer" className="cinfo-item" id="ci-fb">
                  <div className="cinfo-icon cinfo-icon--mint">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </div>
                  <div>
                    <span className="cinfo-label">Facebook</span>
                    <strong className="cinfo-value">Nguyễn Thị Anh Thơ</strong>
                  </div>
                </a>

                <div className="cinfo-item" id="ci-loc">
                  <div className="cinfo-icon cinfo-icon--lav">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div>
                    <span className="cinfo-label">Khu Vực</span>
                    <strong className="cinfo-value">Việt Nam</strong>
                  </div>
                </div>

                {/*  Decorative image card  */}
                <div className="contact-img-card">
                  <img src="assets/tho_3.jpg" alt="Work sample" />
                  <div className="contact-img-card__tag">Let's create together ✦</div>
                </div>
              </div>

              {/*  Form  */}
              <div className="contact-form-wrap reveal-right">
                <form id="contact-form" className="contact-form" noValidate onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="fg">
                      <label htmlFor="f-name">Họ & Tên</label>
                      <input type="text" id="f-name" name="name" placeholder="Nguyễn Văn A" required />
                    </div>
                    <div className="fg">
                      <label htmlFor="f-email">Email</label>
                      <input type="email" id="f-email" name="email" placeholder="email@example.com" required />
                    </div>
                  </div>
                  <div className="fg">
                    <label htmlFor="f-service">Dịch Vụ</label>
                    <select id="f-service" name="service">
                      <option value="">— Chọn dịch vụ —</option>
                      <option>Quay Phim</option>
                      <option>Chụp Ảnh</option>
                      <option>Dựng Phim & Hậu Kỳ</option>
                      <option>Tất Cả Dịch Vụ</option>
                    </select>
                  </div>
                  <div className="fg">
                    <label htmlFor="f-msg">Nội Dung</label>
                    <textarea id="f-msg" name="message" rows="5" placeholder="Mô tả dự án, thời gian thực hiện, ngân sách..." required></textarea>
                  </div>
                  {isSubmitting ? (
                    <button type="submit" className="btn btn--pink btn--full" disabled>Đang gửi...</button>
                  ) : submitSuccess ? (
                    <button type="submit" className="btn btn--mint btn--full" style={{ background: '#2DD4BF' }}>✓ Đã Gửi Thành Công!</button>
                  ) : (
                    <button type="submit" className="btn btn--pink btn--full" id="form-submit-btn">Gửi Tin Nhắn ✦</button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/*  ===== FOOTER =====  */}
        <footer className="footer">
          <div className="footer-top">
            <div className="container">
              <div className="footer-brand">
                <span className="footer-logo">ANH THƠ</span>
                <p className="footer-tagline">Videographer · Photographer · Editor</p>
              </div>
              <div className="footer-nav">
                <a href="#about" id="fl-about">Về Tôi</a>
                <a href="#services" id="fl-services">Dịch Vụ</a>
                <a href="#portfolio" id="fl-portfolio">Portfolio</a>
                <a href="#contact" id="fl-contact">Liên Hệ</a>
              </div>
              <div className="footer-social">
                <a href="https://www.facebook.com/nguyenthianhtho266" target="_blank" rel="noopener noreferrer" className="fsoc" id="fsoc-fb" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="tel:0983967621" className="fsoc" id="fsoc-phone" aria-label="Gọi điện">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="container">
              <p>© 2026 Nguyễn Thị Anh Thơ. All rights reserved.</p>
              <p>Made with <span className="heart">♥</span> in Vietnam</p>
            </div>
          </div>
        </footer>



      </main>
    </>
  );
}
