var MAP_ZOOM = 15;

// Load the maps library
Meteor.startup(function() {  
	GoogleMaps.load();
});

// Create a non reactive version that will initialise the map with a marker centred on the current coordinates.
Template.map.helpers({  
	geolocationError: function() {
		var error = Geolocation.error();
		return error && error.message;
	},
	mapOptions: function() {
		var latLng = Geolocation.latLng();

		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded() && latLng) {
	  		return {
	    		center: new google.maps.LatLng(latLng.lat, latLng.lng),
	    		zoom: MAP_ZOOM
	  		};
		}
	}
});

// Reactively update both the marker position and map position
Template.map.onCreated(function() {  
	var self = this;

	GoogleMaps.ready('map', function(map) {
		var marker;

		// Create and move the marker when latLng changes.
		self.autorun(function() {
	  		var latLng = Geolocation.latLng();

			// Create & update Session persistent variables for the currentUser position	
			Session.setPersistent('currentUser_latitue', latLng.lat);
			Session.setPersistent('currentUser_longitude', latLng.lng);

		  	if (! latLng)
		    	return;

		  	// If the marker doesn't yet exist, create it.
		  	if (! marker) {
		    	marker = new google.maps.Marker({
		      	position: new google.maps.LatLng(latLng.lat, latLng.lng),
		      	map: map.instance,
		      	title: "You're here!"
		    	});
	  		}
			// The marker already exists, so we'll just change its position.
			else {
			    marker.setPosition(latLng);
			}

		  	// Center and zoom the map view onto the current position.
		  	map.instance.setCenter(marker.getPosition());
		  	map.instance.setZoom(MAP_ZOOM);
		});
	});
});