const nameCache = 'cache-v1'
/**
 * Call install event
 */
self.addEventListener('install', () => {})

/**
 * Call activate event
 */

self.addEventListener('activate', (event) => {
    //remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== nameCache){
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then(res => {
                //make a copy/clone of response
                const resClone = res.clone();
                //open the cache
                caches
                    .open(nameCache)
                    .then(cache => {
                        //add a response to cache
                        cache.put(event.request, resClone);
                    })
                return res;
            })
            .catch(err => caches.match(event.request).then(res => res))
        );
})