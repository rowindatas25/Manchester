
var STATIC_CACHE = 'static-v37';
var DYNAMIC_CACHE = 'dynamic-v16';



self.addEventListener('install', function(event) {
	console.log('[Service Worker] Installing Service Worker', event);
	event.waitUntil(
	caches.open(STATIC_CACHE)
		.then(function(cache) {
			console.log('Precaching app shell');
			cache.addAll([
						'/',
						'index.html',
						'style.css',
						'United.ico',
				]);
			
		})
	);
});

self.addEventListener('activate', function(event) {
	console.log('service worker activated', event);
	event.waitUntil(
			caches.keys()
			.then(function(keyList) {
				return Promise.all(keyList.map(function(key) {
					if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
						console.log('Removing old cache', key);
						return caches.delete(key);
					}
				}));
			})
		)
	return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
event.respondWith(
		caches.match(event.request)
		// Here we are intercepting the request and checking if it's in the cache/
		.then(function(response) {
			if (response) {
				return response;
			}
			else {
				return fetch(event.request)
				.then(function(res) {
					caches.open(DYNAMIC_CACHE)
					.then(function(cache) {
						console.log('Dynamic cache is working');
						cache.put(event.request.url, res.clone());
						return res;
					})
				})
				.catch(function(err) {
					console.log('There is an error', err);
				})
			}
		})
	);
});

