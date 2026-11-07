# Solo du Cosette

Lista della spesa installabile sull'iPhone. *Giuro, sono solo due cosette.*

App web (PWA) senza server e senza account: liste, carte fedeltà e impostazioni restano **solo sul telefono** di chi la usa. In questo repository non ci sono dati personali.

## Cosa fa
- Liste multiple
- Prodotti raggruppati per reparto, con ricerca e suggerimenti
- Schermata *Prodotti* con tutte le categorie, per aggiungere con un tocco
- Cerchio di avanzamento: quanti prodotti sono già stati presi
- "Usati di recente" da riaggiungere con un tocco
- Quantità, unità e note per ogni prodotto
- Vista a riquadri o a elenco
- Carte fedeltà con codice a barre (Code 128, EAN-13, EAN-8)
- Chiaro, scuro o automatico
- Copia di sicurezza in un file e ripristino
- Guida integrata (in Altro)
- Funziona anche senza rete

## Installare sull'iPhone
1. Aprire il link in **Safari**.
2. Toccare il tasto di condivisione (il quadrato con la freccia).
3. Scegliere **Aggiungi alla schermata Home**.

## Pubblicare con GitHub Pages
1. Nel repository: **Settings → Pages**.
2. Sotto *Build and deployment*: **Deploy from a branch**, ramo `main`, cartella `/ (root)`.
3. Dopo circa un minuto l'app è su `https://<utente>.github.io/Solo-du-Cosette/`.

## Aggiornare l'app
Dopo ogni modifica a `index.html`, cambiare il numero di `VERSIONE` in `sw.js` (per esempio da `v24` a `v25`). Così il telefono scarica la versione nuova.

## File
- `index.html`: tutta l'app (pagina, stile e codice)
- `manifest.webmanifest`: nome e icona sulla Home
- `sw.js`: uso offline
- `icons/`: icone
- `img/`: immagini dei prodotti (un file per prodotto; dove manca, l'app mostra un'emoji)
