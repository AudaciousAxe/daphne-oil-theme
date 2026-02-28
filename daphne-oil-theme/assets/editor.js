/* Daphne Oil — Editor enhancements for Shopify customizer */
(function(){
  // Re-init slideshow when sections are added/moved in editor
  document.addEventListener('shopify:section:load', function(e){
    var el = e.target;
    if(el.querySelector('.hero-slideshow')) window.DaphneSlideshow && window.DaphneSlideshow.init();
    if(el.querySelector('.product-gallery')) window.DaphneProduct && window.DaphneProduct.init();
  });
  document.addEventListener('shopify:section:reorder', function(){
    window.DaphneSlideshow && window.DaphneSlideshow.init();
  });
  document.addEventListener('shopify:block:select', function(e){
    var slide = e.target.closest('.hero-slide');
    if(slide){
      var slideshow = slide.closest('.hero-slideshow');
      if(slideshow){
        slideshow.querySelectorAll('.hero-slide').forEach(function(s){ s.classList.remove('active'); });
        slide.classList.add('active');
        var idx = Array.from(slideshow.querySelectorAll('.hero-slide')).indexOf(slide);
        slideshow.querySelectorAll('.hero-dot').forEach(function(d,i){ d.classList.toggle('active', i===idx); });
      }
    }
  });
})();
