Da fare:

?? Chat/contatti alternativi: whatsapp link(solo con numero di telefono!), skype, altro?? ... 
	-> semplici da implementare perchè compaiono solo nel signUp, profilo personale/di altri e edit profilo

CONSIDERAZIONE: - la gestione del post e del commento anonimo sono troppo vulnerabili e difficili da gestire..
				  -> sarebbe decisamente più semplice implementare un login 'anonimo' con funzioni limitate: ricerca dei post,
				  scritture post e commenti, magari anche la possibilità di mettere like/dislike.

				- Bisognerebbe mettere un colore di sfondo al posto dell'immagine
				- Bisognerebbe rifare la grafica della visualizzazione profilo 

manca:  - gestione di numero post e commenti che mostro (al momento li mostro tutti quanti)
		- miglior feedback nel signUp e nell'editProfile (custom html5 validation?)
		  |- limite di caratteri digitabili nei campi input e di caratteri massimi disponibili nei campi del db
		  |- espressioni regolari che controllino i campi input
---------------------------------------

Da rivedere:

-- GoogleMaps.load() inconsistente su browser e piattaforme diverse? (o solo un mio problema?!)
-- Geocomplete in editPost inconsistente (manca chiave api google?)

- migliorare publish/subscription per evitare di pubblicare più dati del necessario quando possibile => funzioni con un 
  parametro, non generali!
  [NB. USERNAME PUBBLICO QUINDI NON CI SONO PROBLEMI AD AVERLI TUTTI QUANTI DISPONIBILI, email e dati personali e questione anonymous un po' meno...]
- JQuery Multiple Selector (cambio stile su tutto il progetto?)
- cambiare post in posts (quindi dopo o con reset del db..)


?? deleteUser [ => delete all user's post and comments] scelta condivisa?
?? deletePost [ => delete all comment] e deleteComment come fare per le foto dei post e commenti? [Al momento non vengono cancellate.]

+- forgot password (Da testare.. mandare email?)

+- Migliorare compatibilità browser (browser usato: Chrome)

---------------------------------------

Consigli Prof:

- dati sensibili su altra collezione per migliorare privacy

---------------------------------------

Tesi scritta:

- prendere spunto capitoli tesi precedenti, ma non è solo un porting su meteor!
- soffermarsi su aspetti innovativi (mappe interattive, selezione distanza da mappa interattiva, geocomplete, altri cambiamenti effettuati..)