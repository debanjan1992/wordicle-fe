var CACHE_NAME="wordicle-cache-v22";self.addEventListener("install",(function(e){e.waitUntil(caches.open(CACHE_NAME).then((e=>e.addAll(["./index.html","./assets/android-chrome-192x192.png","./assets/android-chrome-512x512.png","./assets/apple-touch-icon.png","./assets/favicon-16x16.png","./assets/favicon-32x32.png","./assets/favicon.ico","./main.bundle.js","./manifest.json","./service_worker.js"]))))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(e!==CACHE_NAME)return caches.delete(e)}))))))})),self.addEventListener("fetch",(function(e){e.respondWith(async function(){try{var t=await fetch(e.request);return(await caches.open(CACHE_NAME)).put(e.request.url,t.clone()),t}catch(t){return caches.match(e.request)}}())}));