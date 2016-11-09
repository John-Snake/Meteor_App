// Vulnerabilità?

Meteor.publish("usersEmail", function () {
    return Meteor.users.find({}, {fields: {"emails.address": 1}});
});

Meteor.publish("usersUsername", function () {
    return Meteor.users.find({}, {fields: {"username": 1}});
});

Meteor.publish('myPosts', function(){
	return Post.find({userId: this.userId});
});

// Pubblico anche l'user id violando la richiesta di anonimato
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

// Pubblico anche l'user id violando la richiesta di anonimato
Meteor.publish('thisPostComments', function(postId){
	return Comments.find({postId: postId});
});

Meteor.publish('unreadNotifications', function(){
	return Notifications.find({observerUserId: this.userId, read: false});
});

Meteor.publish('allNotifications', function(){
	return Notifications.find({observerUserId: this.userId});
});

Meteor.publish('notificationsPost', function(postId){
	return Post.find({_id: postId});
});