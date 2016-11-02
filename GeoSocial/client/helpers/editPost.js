Template.editPost.onRendered(function() {  
    if($("#oldImg_public_id")!=null && $("#oldImg_url")!=null) {
        $("#img_public_id").attr("value", $("#oldImg_public_id").val());
        $("#img_url").attr("value", $("#oldImg_url").val());
    }
});

Template.editPost.events({
	'submit #edit_post': function(event){
        event.preventDefault();
        var id = Router.current().params._id
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

       	var oldPosition = $('[name=post_oldPosition]:checked').val();

        if (oldPosition==1) {

            if(!img_public_id && !img_url) {
                Post.update( { _id : id },
                    {   $set: {
                            anonymous: anonymous,
                            dateTime: dateTime,
                            text: text
                        },
                        $unset: {
                            img_public_id: "",
                            img_url: ""
                        }
                    },
                    function(error){
                        if(error){
                            console.log(error.reason);
                            console.log(error.invalidKeys);
                            Bert.alert( error.reason, 'danger', 'growl-top-right' );
                        }  
                        else {
                            Router.go("/myPosts");
                            Bert.alert( "Post edited successfully.", 'success', 'growl-top-right' );
                        }
                    }
                );
            }
            else {
                Post.update( { _id : id },
                    {   $set: {
                            anonymous: anonymous,
                            dateTime: dateTime,
                            text: text,
                            img_public_id: img_public_id,
                            img_url: img_url
                        }
                    },
                    function(error){
                        if(error){
                            console.log(error.reason);
                            console.log(error.invalidKeys);
                            Bert.alert( error.reason, 'danger', 'growl-top-right' );
                        }  
                        else {
                            Router.go("/myPosts");
                            Bert.alert( "Post edited successfully.", 'success', 'growl-top-right' );
                        }
                    }
                );
            }

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

            if(!img_public_id && !img_url) { 
                Post.update( { _id : id },
                    {   $set: {
                            anonymous: anonymous,
                            dateTime: dateTime,
                            text: text,
                            location: { 
                                type: "Point",
                                coordinates: [longitude,latitude] 
                            }
                        },
                        $unset: {
                            img_public_id: "",
                            img_url: ""
                        }
                    },
                    function(error){
                        if(error){
                            console.log(error.reason);
                            console.log(error.invalidKeys);
                            Bert.alert( error.reason, 'danger', 'growl-top-right' );
                        }  
                        else {
                            Router.go("/myPosts");
                            Bert.alert( "Post edited successfully.", 'success', 'growl-top-right' );
                        }
                    }
                );
            }
            else {
                Post.update( { _id : id },
                    {   $set: {
                            anonymous: anonymous,
                            dateTime: dateTime,
                            text: text,
                            img_public_id: img_public_id,
                            img_url: img_url,
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
                            Bert.alert( error.reason, 'danger', 'growl-top-right' );
                        }  
                        else {
                            Router.go("/myPosts");
                            Bert.alert( "Post edited successfully.", 'success', 'growl-top-right' );
                        }
                    }
                );
            }
	        
       	}
    },
	'click #post_oldPosition': function () {
		var choice = $('[name=post_oldPosition]:checked').val();
        if(choice==1) {
        	$('[name=post_location]').prop('checked', false);
        	$('#geocomplete').prop('readonly', true);
            $('#geocomplete').prop('required',false);
            $('#geocomplete').val('');
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
        $('#button_uploadImage').attr("disabled", true);
        $('#post_uploadImage').attr("disabled", true);
        $('#commit').attr("disabled", true);
        $('#spinner').show();

        Bert.alert( 'Uploading image...', 'success', 'growl-top-right' );

        files = event.currentTarget.files;
        
        Cloudinary.upload(files,{}, function(error, res) {
            if(error){
                $('#button_uploadImage').attr("disabled", false);
                $('#post_uploadImage').attr("disabled", false);
                $('#commit').attr("disabled", false);
                
                Bert.alert( 'Upload Error: '+err , 'danger', 'growl-top-right' );
            }
            else {
                Bert.alert( 'Image uploaded successfully.', 'success', 'growl-top-right' );

                $("#post_img").attr("src", res.url);
                $("#img_public_id").attr("value", res.public_id);
                $("#img_url").attr("value", res.url);
                $("#post_img").show();
                $("#delete_img").show();
                
                $('#spinner').hide();
                $('#commit').attr("disabled", false);
            }
        });
    },
    'click #delete_img': function (event) {
        event.preventDefault();
        var public_id = $("#img_public_id").val();
        
        Cloudinary.delete(public_id, function(error, res) {
            if(error){
                Bert.alert( 'Error deleting image: '+err , 'danger', 'growl-top-right' );
            }
            else {
                $('#button_uploadImage').attr("disabled", false);
                $('#post_uploadImage').attr("disabled", false);

                Bert.alert( 'Image deleted successfully.', 'success', 'growl-top-right' );

                $("#post_img").hide();
                $("#delete_img").hide();

                $("#post_img").attr("src", "");
                $('#img_public_id').attr("value", "");
                $('#img_url').attr("value", "");
            }
        });
    }
});