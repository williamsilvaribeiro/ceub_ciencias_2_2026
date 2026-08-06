if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swPath = location.pathname.includes('/games/') ? '../sw.js' : './sw.js';
    navigator.serviceWorker.register(swPath).catch(() => { /* not served over http(s): ignore */ });
  });

  // Once a newly-updated service worker takes over, reload once so the page
  // actually shows the fresh files instead of the stale cached version.
  let swRefreshed = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (swRefreshed) return;
    swRefreshed = true;
    window.location.reload();
  });
}
