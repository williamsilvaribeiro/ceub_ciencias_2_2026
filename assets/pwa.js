if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swPath = location.pathname.includes('/games/') ? '../sw.js' : './sw.js';
    navigator.serviceWorker.register(swPath).catch(() => { /* not served over http(s): ignore */ });
  });
}
