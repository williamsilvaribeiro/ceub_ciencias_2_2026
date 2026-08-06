(() => {
  function getTheme() {
    return localStorage.getItem('site_theme') || 'retro';
  }

  function applyTheme(theme) {
    if (theme === 'neon') {
      document.documentElement.setAttribute('data-theme', 'neon');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  applyTheme(getTheme());

  function updateBtn(btn) {
    const neon = getTheme() === 'neon';
    btn.innerHTML = `<span class="theme-dot" style="display:inline-block;background:${neon ? '#b866ff' : '#dc2626'}"></span>${neon ? 'Neon' : 'Retro'}`;
    btn.setAttribute('aria-label', 'Alternar tema de cor do site');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('.header-actions') || document.querySelector('.site-header');
    if (!target) return;
    const btn = document.createElement('button');
    btn.className = 'back-link';
    btn.style.cursor = 'pointer';
    updateBtn(btn);
    btn.addEventListener('click', () => {
      const next = getTheme() === 'neon' ? 'retro' : 'neon';
      localStorage.setItem('site_theme', next);
      applyTheme(next);
      updateBtn(btn);
    });
    target.insertBefore(btn, target.firstChild);
  });
})();
