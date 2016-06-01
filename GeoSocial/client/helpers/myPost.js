var MAP_ZOOM = 10;

Template.myPost.onRendered = function () {
	GoogleMaps.load();
};

Template.myPost.helpers({
	// Extract a row for each entry in the Post db
	'post' : function (){
		//Meteor.subscribe('myPost');
		return Post.find( {}, { sort: { dateTime: -1} } );
	},
	'anonymous': function() {
		var anonymous = this.anonymous;
		return anonymous == 1;
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

Template.myPost.events({
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
