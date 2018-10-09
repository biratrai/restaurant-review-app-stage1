let staticCache = 'restaurant-reiview-cache';

let cacheData = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/main.js',
  './js/restaurant_info.js',
  './js/dbhelper.js',
  './js/service_worker_registration.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

/**
 * Installating Service Worker in the eventListener waitUntil
 * so that promise can be resolved
 */
self.addEventListener('install', function(event) {
	event.waitUntil(
        // Returns a promise with the cache
		caches.open(staticCache).then(function(cache) {
            // Adding array of url to be stored in Cache object
            console.log("install")
			return cache.addAll(cacheData);
        })
    );
});


/**
 * Activating the service worker
 */
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            console.log("activate")
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCache;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


/**
 * Fetching the cache for offline 
 */
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Return cache otherwise request
            console.log("fetch")
            return response || fetch(event.request);
        })
    );
});
