self.addEventListener('install', function(event) {
	console.log('[Service Worker] Installing Service Worker', event);
	event.waitUntil(
	caches.open('static')
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
				return fetch(event.request);
			}
		})
	);
});

