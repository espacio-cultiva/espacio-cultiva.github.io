// Service worker: guarda la app para usarla sin internet.
// IMPORTANTE: subir VERSION en cada publicación para que los teléfonos se actualicen.
const VERSION = 'cultiva-v5';
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
  const req = e.request, url = new URL(req.url);
  // Solo archivos propios. Firebase (googleapis) pasa directo.
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const esApp = req.mode === 'navigate' || /\/(index\.html|config\.js|manifest\.webmanifest)?$/.test(url.pathname);
  if (esApp) {
    // Red primero: con internet siempre se carga la versión más nueva; sin internet, la guardada.
    e.respondWith(
      fetch(req, {cache: 'no-store'}).then(r => {
        if (r.ok) { const copia = r.clone(); caches.open(VERSION).then(c => c.put(req, copia)); }
        return r;
      }).catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  // Fuentes, íconos y librerías: guardados primero (no cambian).
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || fetch(req)));
});
