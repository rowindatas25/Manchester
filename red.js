var deferredPrompt;
var enableNotifications = document.querySelectorAll('.mdl-js-button');



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
	if ('serviceWorker' in navigator) {
		var options = {
		body: 'You successfully subscribed to this notification service!',
		icon: '/United.ico',
		dir: 'ltr',
		lang: 'en-US',
		vibrate: [100, 50, 200],
		tag: 'confirm-notification',
		renotify: true,
		actions: [
			{action: 'confirm', title: 'Okay', icon: '/United.ico'},
			{action: 'cancel', title:'Cancel', icon: '/United.ico'}
		]
			}
			
	};
		navigator.serviceWorker.ready
		.then(function(swregistration) {
			swregistration.showNotification('Successfully Subscribed (from SW)!', options);
		})
	}
	

function configPushSubscription(argument) {
	if (!('serviceWorker' in navigator)) {
		 return;
	}
	var reg;
	navigator.serviceWorker.ready
	.then(function(swregistration) {
		reg = swregistration;
		return swregistration.pushManager.getSubscription();
	})
		.then(function(sub) {
			if (sub === null) {
				// Create new sub
				var PUBLIC_VAPID_KEY = 'BLYNyilu0zWki28Nki18ru-2gzoPtODMI_ev6q5UpSTzd9lv-c0L0EeFyK4BqRkQl07ckHfvpCBQaS9xzZ6_XIA';
				var convertedKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);
				reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: convertedKey

				});
			} 
		});

}



function permission() {
	Notification.requestPermission(function(result) {
		console.log('User Choice', result);
		if (result !== 'granted') {
			console.log('Permission was not granted!');
		} else {
			configPushSubscription();
			//confirmNotification();
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


function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



