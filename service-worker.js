const cacheName = 'my-pwa-cache';
const filesToCache = [
  '/',
  '/index.html',
  '/icon.png',
  '/A725B52C-A8F4-4FAC-BC45-A88A801C76A3.jpeg',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
