var CACHE_NAME = "wordicle-cache-v29";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./index.html",
        "./assets/android-chrome-192x192.png",
        "./assets/android-chrome-512x512.png",
        "./assets/apple-touch-icon.png",
        "./assets/favicon-16x16.png",
        "./assets/favicon-32x32.png",
        "./assets/favicon.ico",
        "./assets/congo.png",
        "./main.bundle.js",
        "./manifest.json",
        "./service_worker.js",
      ]);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    (async function () {
      try {
        var res = await fetch(event.request);
        var cache = await caches.open(CACHE_NAME);
        cache.put(event.request.url, res.clone());
        return res;
      } catch (error) {
        return caches.match(event.request);
      }
    })()
  );
});
