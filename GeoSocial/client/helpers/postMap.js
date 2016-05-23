var MAP_ZOOM = 15;

// Load the maps library
Meteor.startup(function() {  
	GoogleMaps.load();
});

// Create a non reactive version that will initialise the map centred on the coordinates.
Template.postMap.helpers({  
	geolocationError: function() {
		var error = Geolocation.error();
		return error && error.message;
	},
	mapOptions: function() { // non prende i parametri.. la inizializzo con valori 'casuali'
		//var lat = $('[name=lat]').val();
		//var lng = $('[name=lng]').val();
		var lat = 110;
		var lng = 110;

		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded()) {
	  		return {
	    		center: new google.maps.LatLng(lat, lng),
	    		zoom: MAP_ZOOM
	  		};
		}
	}
});

// Reactively update both the marker position and map position
Template.postMap.onCreated(function() {  
	var self = this;

	GoogleMaps.ready('postMap', function(map) {
		var lat = $('[name=lat]').val();
		var lng = $('[name=lng]').val();

		var marker;

		// Create and move the marker when latLng changes.
		self.autorun(function() {

		  	// If the marker doesn't yet exist, create it.
		  	if (! marker) {
		    	marker = new google.maps.Marker({
		      	position: new google.maps.LatLng(lat, lng),
		      	map: map.instance,
		      	title: "Posted here!"
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
