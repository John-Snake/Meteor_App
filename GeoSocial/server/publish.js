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
