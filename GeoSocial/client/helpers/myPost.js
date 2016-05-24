Meteor.subscribe('myPost');

var MAP_ZOOM = 10;

Template.myPost.created = function () {
	GoogleMaps.load();
};

Template.myPost.helpers({
	// Extract a row for each entry in the Post db
	'post' : function (){
		return Post.find();
	},
	// Create a non reactive version that will initialise the map & the marker centred on the coordinates.
	mapOptions: function() { 
		post_id = this._id;
		postMap_lat = this.latitude;
		postMap_lng = this.longitude;
		
		var latLng = new google.maps.LatLng(postMap_lat, postMap_lng)
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