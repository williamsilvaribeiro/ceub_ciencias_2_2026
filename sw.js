const CACHE_NAME = 'playhub-v7';
const PRECACHE_URLS = [
  './',
  './index.html',
  './about.html',
  './manifest.json',
  './assets/style.css',
  './assets/sfx.js',
  './assets/pwa.js',
  './assets/theme.js',
  './assets/share.js',
  './assets/icon.svg',
  './games/tictactoe.html',
  './games/snake.html',
  './games/2048.html',
  './games/memory.html',
  './games/puzzle.html',
  './games/minesweeper.html',
  './games/worldcup.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin GET requests; let external APIs (fonts, dog.ceo) pass through untouched.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
