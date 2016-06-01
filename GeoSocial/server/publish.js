// Vulnerabilità?

Meteor.publish("usersEmail", function () {
    return Meteor.users.find({}, {fields: {"emails.address": 1}});
});

Meteor.publish("usersUsername", function () {
    return Meteor.users.find({}, {fields: {"username": 1}});
});

Meteor.publish('myPost', function(){
	return Post.find({userId: this.userId});
});

Meteor.publish('allPostsAtDistance', function(distanceMeters, lng, lat){
	return Post.find({
		location: {
	        $near: {
	          	$geometry: {
	           		type: "Point",
		            coordinates: [lng,lat]
	          	},
	        	$maxDistance: distanceMeters   //meters
	        }
		}
	});
});

// minimongo merge box problem!
// Pubblico TUTTI i dati (dei campi 'fields') del user con id passato come parametro, filtro poi i contenuti da vedere dal lato client
// non si rispetta il livello di privacy scelto dall'utente: tutti i suoi dati sono stati pubblicati e sono vulnerabili da altri client
Meteor.publish('usersProfilesNoPrivacy', function(id){
	return Meteor.users.find({_id: id}, {fields: {"profile": 1, "emails.address": 1, "username": 1}});
});