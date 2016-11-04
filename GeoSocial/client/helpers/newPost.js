Template.newPost.events({
    'submit #new_post': function(event){
        event.preventDefault();
        var id = Meteor.userId();
	    var dateTime = new Date();
        var text = $('[name=post_text]').val();
        var anonymous = $('[name=post_anonymous]:checked').val();
        var img_public_id;
        var img_url;
        var latitude;
        var longitude;

       	if(anonymous===undefined) {
       		anonymous = 0;
       	}

        if($("#img_public_id").val()!="" && $("#img_url").val()!="") {
            img_public_id = $("#img_public_id").val();
            img_url = $("#img_url").val();
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

        if(!img_public_id && !img_url) {
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
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                    } 
                    else {
                        Router.go("/myPosts");
                        Bert.alert( 'Post published successfully.', 'success', 'growl-top-right' );
                    }
                }
            );
        }
        else {
            Post.insert({
                    userId: id,
                    anonymous: anonymous,
                    dateTime: dateTime,
                    location: { 
                        coordinates: [longitude,latitude] 
                    },
                    text: text,
                    img_public_id: img_public_id,
                    img_url: img_url
                }, function(error){
                    if(error){
                        console.log(error.invalidKeys);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                    } 
                    else {
                        Router.go("/myPosts");
                        Bert.alert( 'Post published successfully.', 'success', 'growl-top-right' );
                    }
                }
            );
        }
    },
    'click #post_location': function () {
        var choice = $('[name=post_location]:checked').val();
        if(choice==1) {
            $('#geocomplete').prop('readonly', true);
            $('#geocomplete').prop('required',false);
            $('#geocomplete').val('');
            
            var latLng = new google.maps.LatLng(Session.get('currentUser_latitude'), Session.get('currentUser_longitude'));

            var map = $("#geocomplete").geocomplete("map");
            map.setCenter(latLng);
            map.setZoom(14);
        }
        else if(choice===undefined) {
            $('#geocomplete').prop('readonly', false);
            $('#geocomplete').prop('required', true);
        }
    },
    'change #post_uploadImage': function (event) {
        uploadImage(event, "#commit");
    },
    'click #delete_img': function (event) {
        event.preventDefault();

        deleteImage();
    }
});