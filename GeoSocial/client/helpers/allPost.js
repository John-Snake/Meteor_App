var MAP_ZOOM = 10;

Template.allPosts.onRendered = function () {
	GoogleMaps.load();
};

Template.allPosts.helpers({
	// Extract a row for each entry in the Post db at a chosen distance
	'post': function (){
		var distanceKm = Router.current().params.distanceKm;
		var distanceMeters = distanceKm*1000;
		var lng = Session.get('currentUser_longitude');
		var lat = Session.get('currentUser_latitude');
		Meteor.subscribe('allPostsAtDistance', distanceMeters, lng, lat);
	
		return Post.find({}, {sort: {dateTime: -1}});
	},
	// Show the right username for every post
	'username': function () {
		//Meteor.subscribe('usersUsername');
		var user = Meteor.users.findOne(this.userId);
		return user.username;
	},
	// Show edit/remove buttons only in the current user's post 
	'permission': function() {
		var user = Meteor.users.findOne(this.userId);
		return user._id == Meteor.userId();
	},
	// Show the author of the post: anonymous or username
	'anonymous': function() {
		var anonymous = this.anonymous;
		return anonymous == 1;
	},
	'commentsCounter': function() {
		Meteor.subscribe('thisPostComments', this._id);
		return Comments.find({postId: this._id}).count();
	},
	// Create a non reactive version that will initialise the map & the marker centred on the coordinates.
	mapOptions: function() { 
		post_id = this._id;
		postMap_lng = this.location.coordinates[0];
		postMap_lat = this.location.coordinates[1];
		
		var latLng = new google.maps.LatLng(postMap_lat, postMap_lng);
		var marker; 

		// Initialize the map and the marker
		if (GoogleMaps.loaded() && post_id && latLng) {

			GoogleMaps.ready(post_id, function(map) {
				marker = new google.maps.Marker({
			      	position: latLng,
			      	map: map.instance,
			      	title: "Posted here!"
		    	});
			});
	  		return {
	    		center: latLng,
	    		zoom: MAP_ZOOM
	  		};
		}
	}, 
	geolocationError: function() {
		var error = Geolocation.error();
		return error && error.message;
	}
});

Template.allPosts.events({
	'click #deletePost': function() {
		Session.set('postId', this._id);
		Modal.show('deletePost');
	},
	'click #postDetail': function() {
		Session.set('postId', this._id);
		Modal.show('postDetail');
	},
	'click #comments': function() {
		Session.set('postId', this._id);
		Modal.show('postDetail');
	}
});