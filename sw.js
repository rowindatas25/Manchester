self.addEventListener('install', function(event) {
	console.log('[Service Worker] Installing Service Worker', event);
	event.waitUntil(
	caches.open('static')
		.then(function(cache) {
			console.log('Precaching app shell');
			cache.add('index.html');
		})
	);
});

self.addEventListener('activate', function(event) {
	console.log('service worker activated', event);
	return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
event.respondWith(fetch(event.request));
});

