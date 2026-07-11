const CACHE_NAME = "gerador-desdobramentos-v2";

const arquivos = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./assets/images/background.png"
];


self.addEventListener("install", evento => {

  evento.waitUntil(

    caches.open(CACHE_NAME)
    .then(cache => {

      return cache.addAll(arquivos);

    })

  );

});


self.addEventListener("fetch", evento => {

  evento.respondWith(

    caches.match(evento.request)
    .then(resposta => {

      return resposta || fetch(evento.request)
      .catch(() => caches.match("./index.html"));

    })

  );

});
