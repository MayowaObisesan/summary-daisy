const CACHE_NAME = 'summary-offline-cache';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    // '/',
    // '/index.html',
    // '/src/*'
]

// Service workers that are being installed for the first time emit an install event.
// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(PRECACHE_ASSETS);
        self.skipWaiting(); // changes the sw state from waiting to active
    })());
});


// CLAIMING CLIENTS DURING THE ACTIVATE EVENT
// activate events are emitted immediately after installation is completed.
// By default, a newly activated worker won't claim any clients until they are reloaded.
// self.clients.claim tells our service worker to take control of new clients right away,
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});


// DEFINING A FETCH STRATEGY
// Uses a cache-first strategy to fetch resources. - Check the cache first, but if it fails, use the network.
self.addEventListener('fetch', event => {
    event.respondWith(async () => {
        const cache = await caches.open(CACHE_NAME);

        // match the request to our cache
        const cachedResponse = await cache.match(event.request);

        // check if we got a valid response
        if (cachedResponse !== undefined) {
            // Cache hit, return the resource
            return cachedResponse;
        } else {
            // Otherwise, go to the network
            return fetch(event.request)
        };
    });
});
