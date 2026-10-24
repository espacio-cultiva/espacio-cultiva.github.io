// Service worker: guarda la app para usarla sin internet.
// IMPORTANTE: subir VERSION en cada publicación para que los teléfonos se actualicen.
const VERSION = 'cultiva-v3';
const ARCHIVOS = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  './vendor/firebase.js',
  './vendor/fonts/nunito-latin-400-normal.woff2',
  './vendor/fonts/nunito-latin-600-normal.woff2',
  './vendor/fonts/nunito-latin-700-normal.woff2',
  './vendor/fonts/nunito-latin-800-normal.woff2',
  './vendor/fonts/patrick-hand-latin-400-normal.woff2',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Solo archivos propios. Firebase (googleapis) pasa directo.
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))
  );
});
