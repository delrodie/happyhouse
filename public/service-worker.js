const CACHE_NAME = 'Happy House';
const urlsToCahe = [
    '/',
    'index.php',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache =>{
                console.log('Cache ouverte');
                return cache.addAll(urlsToCahe);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames =>{
                return Promise.all(
                    cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                        .map(cacheName => caches.delete(cacheName))
                );
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response =>{
                if (response){
                    return response;
                }
                return fetch(event.request);
            })
    )
})