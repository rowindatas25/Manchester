var deferredPrompt;
var enableNotifications = document.querySelectorAll('.notifications');

if (!window.Promise) {
	window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('Service Worker registered');
        })
        .catch(function(err) {
            console.log('There was an error', err);
        })
}

function displayCard() {

}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('Prompt is running!');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

function confirmNotification() {
	new Notification('Successfully Subscribed!');
}

function permission() {
	Notification.requestPermission(function(result) {
		console.log('User Choice', result);
		if (result !== 'granted') {
			console.log('Permission was not granted!');
		} else {
			confirmNotification();
		}
	});
}


if ('Notification' in window) {
	for (var i = 0; i < enableNotifications.length; i++) {
		enableNotifications[i].style.display = 'inline-block';
		enableNotifications[i].style.margin = '0 auto';
		enableNotifications[i].addEventListener("click", permission);
		console.log('Button is working');
	}
}
