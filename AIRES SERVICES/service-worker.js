const CACHE_NAME = "aires-services-v3";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./imagens/logo.png"
];


// ===============================
// INSTALAÇÃO
// ===============================

self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(function(cache) {

                return cache.addAll(ARQUIVOS);

            })

            .then(function() {

                return self.skipWaiting();

            })

    );

});


// ===============================
// ATIVAÇÃO
// ===============================

self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys()

            .then(function(nomes) {

                return Promise.all(

                    nomes.map(function(nome) {

                        if (nome !== CACHE_NAME) {

                            return caches.delete(nome);

                        }

                    })

                );

            })

            .then(function() {

                return self.clients.claim();

            })

    );

});


// ===============================
// CARREGAMENTO DOS ARQUIVOS
// ===============================

self.addEventListener("fetch", function(event) {

    if (event.request.method !== "GET") {

        return;

    }


    event.respondWith(

        fetch(event.request)

            .then(function(resposta) {

                return resposta;

            })

            .catch(function() {

                return caches.match(event.request);

            })

    );

});
