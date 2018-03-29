self.addEventListener('install', event => event.waitUntil(
    caches.open('slopers-v1-core2')
        .then(cache => cache.addAll([
            '/offline/',
            '/css/styles.css',
            '/js/bundle.js'
        ]))
        .then(self.skipWaiting())
));

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.mode === 'navigate' || request.url.match('.jpg|.png$')) {
        event.respondWith(
            fetch(request)
                .then(response => cachePage(request, response))
                .catch(err => getCachedPage(request))
                .catch(err => fetchCoreFile('/offline/'))
        );
    } else {
        event.respondWith(
            fetch(request)
                .catch(err => fetchCoreFile(request.url))
                .catch(err => fetchCoreFile('/offline/'))
        );
    }
});

function fetchCoreFile(url) {
    return caches.open('slopers-v1-core2')
        .then(cache => cache.match(url))
        .then(response => response ? response : Promise.reject());
}

function getCachedPage(request) {
    return caches.open('slopers-v1-pages2')
        .then(cache => cache.match(request))
        .then(response => response ? response : Promise.reject());
}

function cachePage(request, response) {
    const clonedResponse = response.clone();
    caches.open('slopers-v1-pages2')
        .then(cache => cache.put(request, clonedResponse));
    return response;
}
