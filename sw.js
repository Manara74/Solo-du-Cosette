// Service worker: tiene l'app disponibile anche senza rete.
// Per forzare un aggiornamento su tutti i telefoni, cambia il numero di VERSIONE.
const VERSIONE = 'solo-du-cose-v2';
const FILE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "img/acqua.webp", "img/aglio.webp", "img/anguria.webp", "img/arancia.webp", "img/avocado.webp", "img/banana.webp", "img/basilico.webp", "img/birra.webp", "img/biscotti.webp", "img/broccoli.webp", "img/burro.webp", "img/caffe.webp", "img/carote.webp", "img/carta-igienica.webp", "img/cipolla.webp", "img/cornetto.webp", "img/dentifricio.webp", "img/detersivo.webp", "img/farina.webp", "img/formaggio.webp", "img/fragole.webp", "img/funghi.webp", "img/insalata.webp", "img/kiwi.webp", "img/latte.webp", "img/limone.webp", "img/mais.webp", "img/mela.webp", "img/melanzana.webp", "img/mozzarella.webp", "img/olio.webp", "img/pane.webp", "img/parmigiano.webp", "img/passata.webp", "img/pasta.webp", "img/patate.webp", "img/peperone.webp", "img/pera.webp", "img/pesca.webp", "img/pomodoro.webp", "img/riso.webp", "img/uova.webp", "img/uva.webp", "img/vino.webp", "img/yogurt.webp", "img/zucchero.webp", "img/zucchina.webp"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIONE).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(chiavi => Promise.all(chiavi.filter(k => k !== VERSIONE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Risponde subito dalla copia salvata e intanto la aggiorna in sottofondo.
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(r, {ignoreSearch: true}).then(salvato => {
      const rete = fetch(r).then(res => {
        if (res && res.ok) { const copia = res.clone(); caches.open(VERSIONE).then(c => c.put(r, copia)); }
        return res;
      }).catch(() => salvato);
      return salvato || rete;
    })
  );
});
