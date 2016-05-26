Meteor.startup(function() {
	GoogleMaps.load({
    	libraries: 'places'  // also accepts an array if you need more than one
  	});
});

Template.googleAutocomplete.onRendered(function() {
	this.autorun(function () {
	    if (GoogleMaps.loaded()) {
   	    	
   	    	var latLng = new google.maps.LatLng(Session.get('currentUser_latitude'), Session.get('currentUser_longitude'));
   	    	
   	    	$("#geocomplete").geocomplete({
	      		map: ".map_canvas",
	      		mapOptions: {
	      			center: latLng,
				    zoom: 10,
				    scrollwheel: true,
			 	},
			 	markerOptions: {
			 		position: latLng
			 	},
	          	details: "form",
	          	types: ["geocode", "establishment"],
	        });

	    }
  });
});
