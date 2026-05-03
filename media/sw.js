// 创世奇旅 Service Worker — 离线缓存
const CACHE_NAME = 'covenant-journey-v3';
const ASSETS = [
  '../创世奇旅.html',
  'manifest.json',
  'bgm_violin.mp3',
  'bgm_love.mp3',
  'creation.png',
  'fall.png',
  'ark.png',
  'babel.png',
  'stars.png',
  'isaac.png',
  'ladder.png',
  'joseph.png',
  'blessing.png',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
