// Caches the whole app on first load so it works with no signal.
// Bump VERSION whenever any file changes so phones pick up the update.
const VERSION = "ek-v4";
const FILES = [
  "./", "./index.html", "./app.css", "./app.js", "./content.js", "./manifest.webmanifest",
  "./icon.svg", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  // cache: "reload" skips the browser's HTTP cache, so an update never stores stale files.
  e.waitUntil(caches.open(VERSION)
    .then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first (instant, offline), refresh the cache in the background when online.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const hit = await cache.match(e.request, { ignoreSearch: true });
      const net = fetch(e.request, { cache: "no-cache" }).then((r) => { if (r.ok) cache.put(e.request, r.clone()); return r; }).catch(() => null);
      if (hit) { e.waitUntil(net); return hit; }
      return (await net) || (await cache.match("./index.html")) || Response.error();
    })
  );
});
