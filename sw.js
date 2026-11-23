const CACHE_NAME = 'longhoang-static-v1';

const PRECACHE_URLS = [
  './',
  './manifest.webmanifest',
  './favicon.svg',
  './avatar.avif',
  './avatar.webp',
  './icon-192.png',
];

const IMMUTABLE_PATH_PATTERN =
  /\/(assets|fonts|games|projects|pokemon\/packs|pokemon\/sfx)\/|\/pokemon\/(chest-back\.png|chest-front\.png|card-back\.jpg)$|\/(avatar\.(avif|webp|jpg)|icon-\d+\.png|apple-touch-icon\.png|favicon\.svg)$/;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => undefined))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.includes('/api/')) return;

  if (IMMUTABLE_PATH_PATTERN.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok && response.type === 'basic') {
            const copy = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, copy))
              .catch(() => undefined);
          }
          return response;
        });
      })
    );
    return;
  }

  if (request.mode === 'navigate' || url.pathname.includes('/data/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && response.type === 'basic') {
            const copy = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, copy))
              .catch(() => undefined);
          }
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((hit) =>
              hit || (request.mode === 'navigate' ? caches.match('./') : undefined)
            )
        )
    );
  }
});
