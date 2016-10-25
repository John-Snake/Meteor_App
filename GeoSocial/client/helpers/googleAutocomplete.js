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
				    zoom: 14,
				    scrollwheel: true,
			 	},
			 	markerOptions: {
			 		position: latLng,
			 		title: "Custom position"
			 	},
	          	details: "form",
	          	types: ["geocode", "establishment"],
	        });

	        var map = $("#geocomplete").geocomplete("map");

	        var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "You're here!"
            });

            marker.setPosition(latLng);
	    }
  	});
});