var MAP_ZOOM = 14;

// Load the maps library
Meteor.startup(function() {  
	GoogleMaps.load();
});

// Create a non reactive version that will initialise the map centred on the current coordinates.
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

	var ignore = false;

	GoogleMaps.ready('map', function(map) {
		var marker;

		// Create and move the marker when latLng changes.
		self.autorun(function() {
	  		var latLng = Geolocation.latLng();

			// Create & update Session persistent variables for the currentUser position	
			Session.setPersistent('currentUser_latitude', latLng.lat);
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

		  	// Create a editable circle on the map
		  	var radius = new google.maps.Circle({
      			strokeColor: 'black',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: 'black',
				fillOpacity: 0.35,
				map: map.instance,
				center: marker.getPosition(),
				radius: 1000,
				editable: true
		    });

		  	// Update the distance input value as the map radius change
		    google.maps.event.addListener(radius, 'radius_changed', function() {
		  		$('#distance').val((radius.getRadius()/1000).toFixed(2));
			});

		    // Update the center of the radius if changed
			google.maps.event.addListener(radius, 'center_changed', function() {
				if (radius.getCenter() != marker.getPosition()) {
					Bert.alert( 'You can\'t change the center of the circle on the map.', 'danger', 'growl-top-right' );
					radius.setEditable(false);
		      		radius.setCenter(marker.getPosition());
		      		radius.setEditable(true);
	      		}
			});

		});
	});
});