Template.editPost.helpers({
	'checked': function () {
		var postAnonymous = Post.findOne({_id: Router.current().params._id}, {fields: {"anonymous": 1}});
		if (postAnonymous.anonymous == 1) {
			return "checked";
		}
	}
});

Template.editPost.events({
	'submit #edit_post': function(event){
        event.preventDefault();
        var id = Router.current().params._id
	    var dateTime = new Date();
        var text = $('[name=post_text]').val();
        var anonymous = $('[name=post_anonymous]:checked').val();
        var latitude;
        var longitude;

       	if(anonymous===undefined) {
       		anonymous = 0;
       	}

       	var oldPosition = $('[name=post_oldPosition]:checked').val();
       	if (oldPosition==1) {

       		Post.update( { _id : id },
					{	$set: {
							anonymous: anonymous,
		                    dateTime: dateTime,
		                    text: text
                		}
            		},
		 		    function(error){
		               	if(error){
		               		console.log(error.reason);
		                    console.log(error.invalidKeys);
		                }  else {
		                    Router.go("/myPost");
		                }
		            }
        	);
       	}
       	else if (oldPosition===undefined) {
       		var newPosition = $('[name=post_location]:checked').val();

	        if(newPosition==1) {
	            latitude = Session.get('currentUser_latitude');
	            longitude = Session.get('currentUser_longitude');
	        }
	        else if(newPosition===undefined) {
	            latitude = $('[name=lat]').val();
	            longitude = $('[name=lng]').val();
	        }

	        Post.update( { _id : id },
					{	$set: {
							anonymous: anonymous,
		                    dateTime: dateTime,
		                    text: text,
		                    location: { 
                                type: "Point",
                                coordinates: [longitude,latitude] 
                            }
                		}
            		},
		 		    function(error){
		               	if(error){
		               		console.log(error.reason);
		                    console.log(error.invalidKeys);
		                }  else {
		                    Router.go("/myPost");
		                }
		            }
        	);

       	}

    },
	'click #post_oldPosition': function () {
		var choice = $('[name=post_oldPosition]:checked').val();
        if(choice==1) {
        	$('[name=post_location]').prop('checked', false);
        	$('#geocomplete').prop('readonly', true);
            $('#geocomplete').prop('required',false);
        }
        else if(choice===undefined) {
            $('#geocomplete').prop('readonly', false);
            $('#geocomplete').prop('required', true);
        }

	},
	'click #post_location': function () {
        var choice = $('[name=post_location]:checked').val();
        if(choice==1) {
        	$('[name=post_oldPosition]').prop('checked', false);
            $('#geocomplete').prop('readonly', true);
            $('#geocomplete').prop('required',false);
            $('#geocomplete').val('');
            
            var map = $("#geocomplete").geocomplete("map");
            var latLng = new google.maps.LatLng(Session.get('currentUser_latitude'), Session.get('currentUser_longitude'));
            
            map.setCenter(latLng);
            
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
            });
            
            marker.setPosition(latLng);
            
        }
        else if(choice===undefined) {
            $('#geocomplete').prop('readonly', false);
            $('#geocomplete').prop('required', true);
        }
    }
});

