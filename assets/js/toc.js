// TOC active section highlighting
(function() {
  'use strict';
  
  function initTOC() {
    const toc = document.querySelector('.floating-toc');
    if (!toc) return;

    const tocLinks = toc.querySelectorAll('a[href^="#"]');
    const headings = Array.from(tocLinks)
      .map(link => document.getElementById(link.getAttribute('href').slice(1)))
      .filter(Boolean);

    if (!headings.length) return;

    function updateActiveLink() {
      const scrollPos = (window.pageYOffset || document.documentElement.scrollTop) + 100;
      let current = '';

      for (const heading of headings) {
        if (scrollPos >= heading.offsetTop) {
          current = heading.id;
        }
      }

      tocLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTOC);
  } else {
    initTOC();
  }
})();
