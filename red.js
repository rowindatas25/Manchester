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

function displayCard() {

}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('Prompt is running!');
    event.preventDefault();
    return false;
});

