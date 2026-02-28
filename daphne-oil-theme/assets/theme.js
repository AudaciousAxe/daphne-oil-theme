/* DAPHNE OIL — Theme JS */
document.addEventListener('DOMContentLoaded', () => {

  /* Mobile Menu */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      hamburger.classList.remove('active'); mobileMenu.classList.remove('active'); document.body.style.overflow = '';
    }));
  }

  /* Hero Slideshow */
  const slideshow = document.querySelector('.hero-slideshow');
  if (slideshow) {
    const slides = slideshow.querySelectorAll('.hero-slide');
    const dots = slideshow.querySelectorAll('.hero-dot');
    const prevBtn = slideshow.querySelector('.hero-arrow--prev');
    const nextBtn = slideshow.querySelector('.hero-arrow--next');
    let current = 0, interval = null;
    const autoplay = slideshow.dataset.autoplay === 'true';
    const speed = (parseInt(slideshow.dataset.interval) || 6) * 1000;

    function goTo(i) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }
    function startAP() { if (autoplay && slides.length > 1) interval = setInterval(() => goTo(current+1), speed); }
    function stopAP() { clearInterval(interval); }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAP(); goTo(current-1); startAP(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAP(); goTo(current+1); startAP(); });
    dots.forEach((d,i) => d.addEventListener('click', () => { stopAP(); goTo(i); startAP(); }));
    startAP();
    slideshow.addEventListener('mouseenter', stopAP);
    slideshow.addEventListener('mouseleave', startAP);
  }

  /* Product Gallery Thumbnails */
  const thumbs = document.querySelectorAll('.product-gallery-thumb');
  const mainImg = document.getElementById('product-image-main');
  if (thumbs.length && mainImg) {
    thumbs.forEach(t => t.addEventListener('click', () => {
      thumbs.forEach(x => x.classList.remove('active')); t.classList.add('active');
      mainImg.src = t.dataset.imageUrl;
    }));
  }

  /* Quantity Selector */
  document.querySelectorAll('.qty-minus').forEach(b => b.addEventListener('click', () => {
    const inp = b.parentElement.querySelector('input'); if (inp && parseInt(inp.value) > 1) inp.value = parseInt(inp.value) - 1;
  }));
  document.querySelectorAll('.qty-plus').forEach(b => b.addEventListener('click', () => {
    const inp = b.parentElement.querySelector('input'); if (inp) inp.value = parseInt(inp.value) + 1;
  }));

  /* Variant Selector */
  document.querySelectorAll('.variant-option').forEach(opt => opt.addEventListener('click', () => {
    opt.parentElement.querySelectorAll('.variant-option').forEach(s => s.classList.remove('active'));
    opt.classList.add('active');
  }));

  /* Product Accordions */
  document.querySelectorAll('.product-accordion-header').forEach((h, idx) => {
    h.addEventListener('click', () => {
      const body = h.nextElementSibling;
      const isOpen = h.classList.contains('active');
      document.querySelectorAll('.product-accordion-header.active').forEach(x => {
        x.classList.remove('active'); x.nextElementSibling.classList.remove('active'); x.nextElementSibling.style.maxHeight='0';
      });
      if (!isOpen) { h.classList.add('active'); body.classList.add('active'); body.style.maxHeight = body.scrollHeight + 'px'; }
    });
    if (idx === 0) { h.classList.add('active'); const b = h.nextElementSibling; b.classList.add('active'); b.style.maxHeight = '500px'; }
  });

  /* Collection Sort */
  const sortSel = document.getElementById('sort-by');
  if (sortSel) sortSel.addEventListener('change', () => {
    const u = new URL(window.location.href); u.searchParams.set('sort_by', sortSel.value); window.location.href = u.toString();
  });

  /* Fade-in Animation */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.usp-item, .product-card, .about-section, .about-stat, .terroir-content, .featured-product-inner').forEach(el => {
    el.style.opacity='0'; el.style.transform='translateY(20px)'; el.style.transition='opacity 0.6s ease, transform 0.6s ease'; obs.observe(el);
  });

  /* Header hide/show on scroll */
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  if (header) window.addEventListener('scroll', () => {
    const cs = window.pageYOffset;
    header.style.transform = (cs > lastScroll && cs > 100) ? 'translateY(-100%)' : 'translateY(0)';
    lastScroll = cs;
  }, { passive: true });

});
