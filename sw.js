var CACHE_NAME="wordicle-cache-v1",urlsToCache=["./","./index.html","./main.bundle.js"];self.addEventListener("install",(function(e){e.waitUntil(caches.open(CACHE_NAME).then((function(e){return console.log("Opened cache"),e.addAll(urlsToCache)})))})),self.addEventListener("fetch",(function(e){e.respondWith(async function(){try{var n=await fetch(e.request);return(await caches.open("cache")).put(e.request.url,n.clone()),n}catch(n){return caches.match(e.request)}}())}));