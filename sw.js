// Service worker: tiene l'app disponibile anche senza rete.
// Per forzare un aggiornamento su tutti i telefoni, cambia il numero di VERSIONE.
const VERSIONE = 'solo-du-cose-v10';
const FILE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "img/acciughe.webp", "img/aceto.webp", "img/acqua.webp", "img/aglio.webp", "img/agnello.webp", "img/albicocche.webp", "img/ali-di-pollo.webp", "img/ananas.webp", "img/anguria.webp", "img/arancia.webp", "img/arrosto.webp", "img/asiago.webp", "img/asparagi.webp", "img/avocado.webp", "img/baccala.webp", "img/bagel.webp", "img/baguette.webp", "img/banana.webp", "img/barbabietole.webp", "img/basilico.webp", "img/besciamella.webp", "img/bietole.webp", "img/birra.webp", "img/biscotti.webp", "img/bistecche.webp", "img/bocconcini.webp", "img/braciole.webp", "img/branzino.webp", "img/bresaola.webp", "img/brie.webp", "img/broccoli.webp", "img/burrata.webp", "img/burro.webp", "img/cachi.webp", "img/caciotta.webp", "img/caffe.webp", "img/calamari.webp", "img/carciofi.webp", "img/carote.webp", "img/carta-igienica.webp", "img/castagne.webp", "img/cavolfiore.webp", "img/cavolo-cappuccio.webp", "img/cavolo-nero.webp", "img/ceci.webp", "img/cetrioli.webp", "img/ciabatta.webp", "img/ciambella.webp", "img/cicoria.webp", "img/ciliegie.webp", "img/cipolla.webp", "img/clementine.webp", "img/cocco.webp", "img/coniglio.webp", "img/coppa.webp", "img/cornetto.webp", "img/cosce-di-pollo.webp", "img/costine.webp", "img/cotolette.webp", "img/cozze.webp", "img/crostata.webp", "img/dentifricio.webp", "img/detersivo.webp", "img/emmental.webp", "img/fagioli.webp", "img/fagiolini.webp", "img/farina.webp", "img/fegato.webp", "img/fesa-di-tacchino.webp", "img/feta.webp", "img/fette-biscottate.webp", "img/fettine-di-pollo.webp", "img/fettine-di-vitello.webp", "img/fichi.webp", "img/filetto-di-manzo.webp", "img/filone.webp", "img/finocchi.webp", "img/fiocchi-di-latte.webp", "img/focaccia.webp", "img/fontina.webp", "img/formaggini.webp", "img/formaggio-grattugiato.webp", "img/formaggio-spalmabile.webp", "img/formaggio.webp", "img/fragole.webp", "img/funghi.webp", "img/gamberi.webp", "img/gorgonzola.webp", "img/grana.webp", "img/grissini.webp", "img/guanciale.webp", "img/hamburger.webp", "img/insalata-mista.webp", "img/insalata.webp", "img/involtini.webp", "img/kefir.webp", "img/kiwi.webp", "img/lamponi.webp", "img/latte-di-avena.webp", "img/latte-di-mandorla.webp", "img/latte-senza-lattosio.webp", "img/latte.webp", "img/lattuga.webp", "img/lime.webp", "img/limone.webp", "img/macinato.webp", "img/maiale.webp", "img/mais.webp", "img/mandarini.webp", "img/mango.webp", "img/manzo.webp", "img/margarina.webp", "img/mascarpone.webp", "img/mazzancolle.webp", "img/mela.webp", "img/melanzana.webp", "img/mele-verdi.webp", "img/melograno.webp", "img/melone.webp", "img/menta.webp", "img/merluzzo.webp", "img/mirtilli.webp", "img/more.webp", "img/mortadella.webp", "img/mozzarella.webp", "img/mozzarelline.webp", "img/olio.webp", "img/orata.webp", "img/pan-carre.webp", "img/pancetta.webp", "img/pane-casereccio.webp", "img/pane-in-cassetta.webp", "img/pane-integrale.webp", "img/pane-senza-glutine.webp", "img/pane.webp", "img/panini-per-hamburger.webp", "img/panini.webp", "img/panna.webp", "img/parmigiano.webp", "img/passata.webp", "img/pasta.webp", "img/patate-dolci.webp", "img/patate.webp", "img/pecorino.webp", "img/penne.webp", "img/peperoncino.webp", "img/peperone.webp", "img/pera.webp", "img/pesca.webp", "img/pesce-spada.webp", "img/petto-di-pollo.webp", "img/piadine.webp", "img/piselli-freschi.webp", "img/pizza-base.webp", "img/platessa.webp", "img/plumcake.webp", "img/pollo.webp", "img/polpette.webp", "img/polpo.webp", "img/pomodori-datterini.webp", "img/pomodori-pelati.webp", "img/pomodorini-ciliegino.webp", "img/pomodoro.webp", "img/pompelmo.webp", "img/porchetta.webp", "img/prezzemolo.webp", "img/prosciutto-cotto.webp", "img/prosciutto-crudo.webp", "img/provola.webp", "img/prugne.webp", "img/radicchio.webp", "img/ravanelli.webp", "img/ricotta.webp", "img/rigatoni.webp", "img/riso.webp", "img/rosmarino.webp", "img/rucola.webp", "img/salame.webp", "img/sale.webp", "img/salmone-affumicato.webp", "img/salmone.webp", "img/salsicce.webp", "img/salvia.webp", "img/sardine.webp", "img/scalogno.webp", "img/scamorza.webp", "img/scampi.webp", "img/sedano.webp", "img/seppie.webp", "img/sgombro.webp", "img/sogliola.webp", "img/sottilette.webp", "img/speck.webp", "img/spezzatino.webp", "img/spinaci.webp", "img/stracchino.webp", "img/surimi.webp", "img/tacchino.webp", "img/tagliata.webp", "img/taleggio.webp", "img/taralli.webp", "img/timo.webp", "img/tonno-fresco.webp", "img/tonno-in-scatola.webp", "img/torta.webp", "img/tortillas.webp", "img/totani.webp", "img/trota.webp", "img/uova.webp", "img/uva.webp", "img/vino.webp", "img/vitello.webp", "img/vongole.webp", "img/wurstel.webp", "img/yogurt-alla-frutta.webp", "img/yogurt-greco.webp", "img/yogurt.webp", "img/zenzero.webp", "img/zucca.webp", "img/zucchero.webp", "img/zucchina.webp"];

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
