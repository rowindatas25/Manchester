if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('/Manchester/sw.js')
	.then(function() {
		console.log('Service Worker registered');
	})
}

function display() {
	alert('Hi!')
}