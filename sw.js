// Service worker: tiene l'app disponibile anche senza rete.
// Per forzare un aggiornamento su tutti i telefoni, cambia il numero di VERSIONE.
const VERSIONE = 'solo-du-cose-v9';
const FILE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "img/acqua.webp", "img/aglio.webp", "img/albicocche.webp", "img/ananas.webp", "img/anguria.webp", "img/arancia.webp", "img/asiago.webp", "img/asparagi.webp", "img/avocado.webp", "img/bagel.webp", "img/baguette.webp", "img/banana.webp", "img/barbabietole.webp", "img/basilico.webp", "img/besciamella.webp", "img/bietole.webp", "img/birra.webp", "img/biscotti.webp", "img/bocconcini.webp", "img/brie.webp", "img/broccoli.webp", "img/burrata.webp", "img/burro.webp", "img/cachi.webp", "img/caciotta.webp", "img/caffe.webp", "img/carciofi.webp", "img/carote.webp", "img/carta-igienica.webp", "img/castagne.webp", "img/cavolfiore.webp", "img/cavolo-cappuccio.webp", "img/cavolo-nero.webp", "img/cetrioli.webp", "img/ciabatta.webp", "img/ciambella.webp", "img/cicoria.webp", "img/ciliegie.webp", "img/cipolla.webp", "img/clementine.webp", "img/cocco.webp", "img/cornetto.webp", "img/crostata.webp", "img/dentifricio.webp", "img/detersivo.webp", "img/emmental.webp", "img/fagiolini.webp", "img/farina.webp", "img/feta.webp", "img/fette-biscottate.webp", "img/fichi.webp", "img/filone.webp", "img/finocchi.webp", "img/fiocchi-di-latte.webp", "img/focaccia.webp", "img/fontina.webp", "img/formaggini.webp", "img/formaggio-grattugiato.webp", "img/formaggio-spalmabile.webp", "img/formaggio.webp", "img/fragole.webp", "img/funghi.webp", "img/gorgonzola.webp", "img/grana.webp", "img/grissini.webp", "img/insalata-mista.webp", "img/insalata.webp", "img/kefir.webp", "img/kiwi.webp", "img/lamponi.webp", "img/latte-di-avena.webp", "img/latte-di-mandorla.webp", "img/latte-senza-lattosio.webp", "img/latte.webp", "img/lattuga.webp", "img/lime.webp", "img/limone.webp", "img/macinato.webp", "img/mais.webp", "img/mandarini.webp", "img/mango.webp", "img/manzo.webp", "img/margarina.webp", "img/mascarpone.webp", "img/mela.webp", "img/melanzana.webp", "img/mele-verdi.webp", "img/melograno.webp", "img/melone.webp", "img/menta.webp", "img/mirtilli.webp", "img/more.webp", "img/mozzarella.webp", "img/mozzarelline.webp", "img/olio.webp", "img/pan-carre.webp", "img/pancetta.webp", "img/pane-casereccio.webp", "img/pane-in-cassetta.webp", "img/pane-integrale.webp", "img/pane-senza-glutine.webp", "img/pane.webp", "img/panini-per-hamburger.webp", "img/panini.webp", "img/panna.webp", "img/parmigiano.webp", "img/passata.webp", "img/pasta.webp", "img/patate-dolci.webp", "img/patate.webp", "img/pecorino.webp", "img/peperoncino.webp", "img/peperone.webp", "img/pera.webp", "img/pesca.webp", "img/piadine.webp", "img/piselli-freschi.webp", "img/pizza-base.webp", "img/plumcake.webp", "img/pollo.webp", "img/pomodori-datterini.webp", "img/pomodorini-ciliegino.webp", "img/pomodoro.webp", "img/pompelmo.webp", "img/prezzemolo.webp", "img/prosciutto-cotto.webp", "img/prosciutto-crudo.webp", "img/provola.webp", "img/prugne.webp", "img/radicchio.webp", "img/ravanelli.webp", "img/ricotta.webp", "img/riso.webp", "img/rosmarino.webp", "img/rucola.webp", "img/salame.webp", "img/salsicce.webp", "img/salvia.webp", "img/scalogno.webp", "img/scamorza.webp", "img/sedano.webp", "img/sottilette.webp", "img/spinaci.webp", "img/stracchino.webp", "img/taleggio.webp", "img/taralli.webp", "img/timo.webp", "img/torta.webp", "img/tortillas.webp", "img/uova.webp", "img/uva.webp", "img/vino.webp", "img/yogurt-alla-frutta.webp", "img/yogurt-greco.webp", "img/yogurt.webp", "img/zenzero.webp", "img/zucca.webp", "img/zucchero.webp", "img/zucchina.webp"];

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
