const nameCache = 'cache-v2'
const cacheArray = [
    'index.html',
    'restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json'
]
/**
 * Call install event
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(nameCache).then((cache) => {
            cache.addAll(cacheArray)
        }).then(() => self.skipWaiting())
    )
})

/**
 * Call activate event to remove the old cache
 */

self.addEventListener('activate', (event) => {
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
/**
 * Call fetch event to respond the site request with the cache assest
 */

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
        );
})