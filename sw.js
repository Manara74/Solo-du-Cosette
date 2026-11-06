// Service worker: tiene l'app disponibile anche senza rete.
// Per forzare un aggiornamento su tutti i telefoni, cambia il numero di VERSIONE.
const VERSIONE = 'solo-du-cose-v8';
const FILE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "img/acqua.webp", "img/aglio.webp", "img/albicocche.webp", "img/ananas.webp", "img/anguria.webp", "img/arancia.webp", "img/asparagi.webp", "img/avocado.webp", "img/banana.webp", "img/barbabietole.webp", "img/basilico.webp", "img/bietole.webp", "img/birra.webp", "img/biscotti.webp", "img/broccoli.webp", "img/burro.webp", "img/cachi.webp", "img/caffe.webp", "img/carciofi.webp", "img/carote.webp", "img/carta-igienica.webp", "img/castagne.webp", "img/cavolfiore.webp", "img/cavolo-cappuccio.webp", "img/cavolo-nero.webp", "img/cetrioli.webp", "img/cicoria.webp", "img/ciliegie.webp", "img/cipolla.webp", "img/clementine.webp", "img/cocco.webp", "img/cornetto.webp", "img/dentifricio.webp", "img/detersivo.webp", "img/fagiolini.webp", "img/farina.webp", "img/fichi.webp", "img/finocchi.webp", "img/formaggio.webp", "img/fragole.webp", "img/funghi.webp", "img/insalata-mista.webp", "img/insalata.webp", "img/kiwi.webp", "img/lamponi.webp", "img/latte.webp", "img/lattuga.webp", "img/lime.webp", "img/limone.webp", "img/mais.webp", "img/mandarini.webp", "img/mango.webp", "img/mela.webp", "img/melanzana.webp", "img/mele-verdi.webp", "img/melograno.webp", "img/melone.webp", "img/mirtilli.webp", "img/more.webp", "img/mozzarella.webp", "img/olio.webp", "img/pane.webp", "img/parmigiano.webp", "img/passata.webp", "img/pasta.webp", "img/patate-dolci.webp", "img/patate.webp", "img/peperoncino.webp", "img/peperone.webp", "img/pera.webp", "img/pesca.webp", "img/piselli-freschi.webp", "img/pomodori-datterini.webp", "img/pomodorini-ciliegino.webp", "img/pomodoro.webp", "img/pompelmo.webp", "img/prezzemolo.webp", "img/prugne.webp", "img/radicchio.webp", "img/ravanelli.webp", "img/riso.webp", "img/rosmarino.webp", "img/rucola.webp", "img/salvia.webp", "img/scalogno.webp", "img/sedano.webp", "img/spinaci.webp", "img/uova.webp", "img/uva.webp", "img/vino.webp", "img/yogurt.webp", "img/zenzero.webp", "img/zucca.webp", "img/zucchero.webp", "img/zucchina.webp"];

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
