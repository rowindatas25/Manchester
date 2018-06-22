if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/Manchester/sw.js')
        .then(function() {
            console.log('Service Worker registered');
        })
        .catch(function(err) {
            console.log('There was an error', err);
        })
}

function display() {

}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('Prompt is running!');
    event.preventDefault();
    return false;
});

var promise = new Promise(function(resolve, reject) {
	// resolve('This is executed once the timer is done');
		reject({code: 500, message: 'error occured'});
    setTimeout(function() {
        //console.log('This is executed once the timer is done');
    }, 3000);
});

fetch('http://api.football-data.org/v1/teams/66')
	.then(function(response) {
		console.log(response);
		return response.json()
	}).then(function(data) {
		console.log(data)
		.catch(function(err) {
			console.log(err);
		})
	});

	fetch('http://api.football-data.org/v1/teams/66/get', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': '/[bc32cb4d48dc40509af91c7af7d02c90]+/',
			'Accept': 'application/json'
		},
		body: {message: 'Does this work?'}
	});


promise.then(function(text) {
	return text;
}).then(function(newText) {
	console.log(newText);
})


console.log('This is executed after setTimeout!');