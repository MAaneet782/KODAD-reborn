/* ==========================================================================
   KODAK AI MOMENT — APPLICATION LOGIC (Supplementary)
   Handles: Scroll progress, scroll reveals, split-image slider, simulator
   NOTE: Camera logic is in the inline <script> in index.html
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------- 1. SCROLL PROGRESS & NAV SCROLLED STATE -------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const mainNav = document.getElementById('mainNav');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
    if (mainNav) {
      if (winScroll > 50) mainNav.classList.add('scrolled');
      else mainNav.classList.remove('scrolled');
    }
  });

  /* -------- 2. SCROLL REVEAL ANIMATIONS -------- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('active');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* -------- 3. SPLIT IMAGE SLIDER -------- */
  const svRange = document.getElementById('svRange');
  const svLeft = document.getElementById('svLeft');
  const svDivider = document.getElementById('svDivider');

  if (svRange && svLeft && svDivider) {
    svRange.addEventListener('input', (e) => {
      const val = e.target.value;
      svLeft.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
      svDivider.style.left = `${val}%`;
    });
  }

  /* -------- 4. PHONE MOCKUP TABS -------- */
  const tabPhotos = document.getElementById('tabPhotos');
  const tabMap = document.getElementById('tabMap');
  const tabStories = document.getElementById('tabStories');
  const viewPhotos = document.getElementById('viewPhotos');
  const viewMap = document.getElementById('viewMap');
  const viewStories = document.getElementById('viewStories');

  function switchTab(activeTab, activeView) {
    [tabPhotos, tabMap, tabStories].forEach(t => t && t.classList.remove('active'));
    [viewPhotos, viewMap, viewStories].forEach(v => v && (v.style.display = 'none'));
    if (activeTab) activeTab.classList.add('active');
    if (activeView) activeView.style.display = 'block';
  }

  if (tabPhotos) tabPhotos.addEventListener('click', () => switchTab(tabPhotos, viewPhotos));
  if (tabMap) tabMap.addEventListener('click', () => switchTab(tabMap, viewMap));
  if (tabStories) tabStories.addEventListener('click', () => switchTab(tabStories, viewStories));

});
