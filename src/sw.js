/**
 * Globals
 */

const CACHE_VERSION = 'v1';

const CACHE_NAMES = {
  CONTENT: 'content',
  MEDIA: 'media',
  STATIC: 'static',
};

const OFFLINE_ASSETS = {
  CONTENT: './offline.html',
  MEDIA: './public/img/icon.svg',
};

const STATIC_ASSETS = [
  ...Object.values(OFFLINE_ASSETS),
  './public/img/apple-touch-icon.png',
  './public/img/favicon.ico',
  './public/img/icon-192.png',
  './public/img/icon-512.png',
  './public/print.css',
  './public/style.css',
  './public/script.js',
  './index.html',
  './',
];

/**
 * Utility functions
 */

function openCache(cacheName) {
  return caches.open(`${CACHE_VERSION}-${cacheName}`);
}

function getCacheKey(request) {
  const acceptHeader = request.headers.get('Accept');

  if (acceptHeader.indexOf('text/html') !== -1) {
    return CACHE_NAMES.CONTENT;
  }

  if (acceptHeader.indexOf('image') !== -1) {
    return CACHE_NAMES.MEDIA;
  }

  return CACHE_NAMES.STATIC;
}

function shouldHandleFetch(request) {
  const url = new URL(request.url);

  const criteria = [
    // Is GET request
    request.method === 'GET',
    // Request is to the same origin
    url.origin === self.location.origin,
  ];

  return criteria.reduce((prev, curr) => prev && curr);
}

function addToCache(key, request, response) {
  if (response.ok) {
    const req = request.clone();
    const res = response.clone();

    caches.open(cacheName(key)).then((cache) => {
      cache.put(req, res);
    });
  }

  return response;
}

function fetchFromNetwork(key, request) {
  const req = request.clone();

  return fetch(req).then((response) => addToCache(key, request, response));
}

function fetchFromCache(key, request) {
  const req = request.clone();

  return openCache(key)
    .then((cache) => {
      return cache.match(req).then((response) => {
        fetchFromNetwork(key, request);

        return response;
      });
    })
    .then((response) => response || Promise.reject('no-match'));
}

function offlineResponse(key) {
  if (key === CACHE_NAMES.MEDIA) {
    return caches.match(OFFLINE_ASSETS.MEDIA);
  }

  if (key === CACHE_NAMES.CONTENT) {
    return caches.match(OFFLINE_ASSETS.CONTENT);
  }

  return undefined;
}

/**
 * Install event
 */

function onInstall() {
  return openCache(CACHE_NAMES.STATIC).then((cache) =>
    cache.addAll(STATIC_ASSETS)
  );
}

/**
 * Activate event
 */

function onActivate() {
  return caches
    .keys()
    .then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.indexOf(CACHE_VERSION) !== 0)
          .map((key) => caches.delete(key))
      )
    );
}

/**
 * Fetch event
 */

function onFetch() {
  const key = getCacheKey(request);

  if (key === CACHE_NAMES.CONTENT) {
    return fetchFromNetwork(key, request)
      .catch(() => fetchFromCache(key, request))
      .catch(() => offlineResponse(key));
  }

  return fetchFromCache(key, request)
    .catch(() => fetchFromNetwork(key, request))
    .catch(() => offlineResponse(key));
}

/**
 * Event listeners
 */

self.addEventListener('install', (e) => {
  e.waitUntil(onInstall(e).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(onActivate(e).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (!shouldHandleFetch(e.request)) {
    return;
  }

  e.respondWith(onFetch(e));
});
