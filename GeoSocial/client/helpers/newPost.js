Template.newPost.events({
    'submit #new_post': function(event){
        event.preventDefault();
        var id = Meteor.userId();
	    var dateTime = new Date();
        var text = $('[name=post_text]').val();
        var anonymous = $('[name=post_anonymous]:checked').val();
        var latitude;
        var longitude;

       	if(anonymous===undefined) {
       		anonymous = 0;
       	}

        var choice = $('[name=post_location]:checked').val();

        if(choice==1) {
            latitude = Session.get('currentUser_latitude');
            longitude = Session.get('currentUser_longitude');
        }
        else if(choice===undefined) {
            latitude = $('[name=lat]').val();
            longitude = $('[name=lng]').val();
        }

        Post.insert({
                userId: id,
        		anonymous: anonymous,
        		dateTime: dateTime,
                location: { 
                    coordinates: [longitude,latitude] 
                },
        		text: text
        }, function(error){
                if(error){
                    console.log(error.invalidKeys);
                } else {
                    Router.go("/myPost");
                }
          }
        );

    },
    'click #post_location': function () {
        var choice = $('[name=post_location]:checked').val();
        if(choice==1) {
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