const CACHE_NAME = 'pwa-caches-v1';
const urlsToCache = [
  './',
  './index.html',
  './apple-touch-icon.png',
  './favicon.ico',
  './icon-192.png',
  './icon-512.png',
  './style.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response ? response : fetch(event.request);
      })
  );
});
