Da fare:

?? Chat/contatti alternativi: whatsapp link(solo con numero di telefono!), skype, altro?? ...

---------------------------------------

Da rivedere:

-- GoogleMaps.load() inconsistente su browser e piattaforme diverse? (o solo un mio problema?!)
-- Geocomplete in editPost inconsistente (manca chiave api google?)

- migliorare publish/subscription per evitare di pubblicare più dati del necessario quando possibile => funzioni con un parametro, non generali!S
	[
		NB. USERNAME PUBBLICO QUINDI NON CI SONO PROBLEMI AD AVERLI TUTTI QUANTI DISPONIBILI, email e dati personali e questione anonymous un po' meno....
		- editpost in route mi basta solamente il post corrente e non tutti quanti quelli del utente loggato, 
		- allpost in route wait on aggiungere subs su allpost per distanza
	]
- JQuery Multiple Selector (cambio stile su tutto il progetto?)
- cambiare post in posts (quindi dopo o con reset del db..)


?? deleteUser [ => delete all user's post and comments] scelta condivisa?
?? deletePost [ => delete all comment] e deleteComment come fare per le foto dei post e commenti? [Al momento non vengono cancellate.]

+- forgot password (Da testare.. mandare email?)


+- Aggiungere e migliorare controlli su input e parametri sia nel client sia nel server
+ Migliorare il feedback sul controllo input client prima del submit nella registrazione e non solo


+ Migliorare publish/subscribe per migliorare sicurezza e privacy

+- Migliorare compatibilità browser (browser usato: Chrome)
+- Aggiornare,unificare e migliorare stile usato nella prima del progetto 

---------------------------------------

Consigli Prof:

- dati sensibili su altra collezione per migliorare privacy

---------------------------------------

Tesi scritta:

- prendere spunto capitoli tesi precedenti, ma non è solo un porting su meteor!
- soffermarsi su aspetti innovativi (mappe interattive, selezione distanza da mappa interattiva, geocomplete, altri cambiamenti effettuati..)