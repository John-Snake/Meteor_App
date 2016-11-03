Template.editComment.onRendered(function() {  
    if($("#oldImg_public_id")!=null && $("#oldImg_url")!=null) {
        $("#img_public_id").attr("value", $("#oldImg_public_id").val());
        $("#img_url").attr("value", $("#oldImg_url").val());
    }
});

Template.editComment.helpers({
	'thisComment': function() {
		return Comments.findOne({_id: Session.get('commentId')});
	}
});

Template.editComment.events({
	'focus #commentTextarea': function() {
		var textarea = document.querySelector('textarea');
		autosize(textarea);
	},
	'click #comment_anonymous': function() {
		var anonymous = $('#comment_anonymous:checked').val();
		var icon = $('#commentProfileIcon');
		if(anonymous==1) {
			icon.removeClass('fa-user');
			icon.addClass('fa-user-secret');
		}
		else if(anonymous===undefined) {
			icon.removeClass('fa-user-secret');
			icon.addClass('fa-user');
		}
	},
	'click #editComment': function() {
		var id = Session.get('commentId');
		var dateTime = new Date();
        var text = $('#commentTextarea').val();
        var anonymous = $('#comment_anonymous:checked').val();
        var img_public_id;
        var img_url;

        if(anonymous===undefined) {
       		anonymous = 0;
       	}

       	if($("#img_public_id").val()!="" && $("#img_url").val()!="") {
            img_public_id = $("#img_public_id").val();
            img_url = $("#img_url").val();
        }

        if(!img_public_id && !img_url) {
        	Comments.update( { _id : id },
				{	$set: {
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
	                    Bert.alert( 'Text field cannot be empty.', 'danger', 'growl-top-right' );
	                }  
	                else {
	                	Modal.hide('editComment');
	                    Bert.alert( 'Comment edited successfully.', 'success', 'growl-top-right' );
	                }
	            }
	    	);
        }
        else {
        	Comments.update( { _id : id },
				{	$set: {
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
	                    Bert.alert( 'Text field cannot be empty.', 'danger', 'growl-top-right' );
	                }  
	                else {
	                	Modal.hide('editComment');
	                    Bert.alert( 'Comment edited successfully.', 'success', 'growl-top-right' );
	                }
	            }
	    	);
        }
	},
	'change #post_uploadImage': function (event) {
        $('#button_uploadImage').attr("disabled", true);
        $('#post_uploadImage').attr("disabled", true);
        $('#editComment').attr("disabled", true);
        $('#spinner').show();

        Bert.alert( 'Uploading image...', 'success', 'growl-top-right' );

        files = event.currentTarget.files;
        
        Cloudinary.upload(files,{}, function(error, res) {
            if(error){
                $('#button_uploadImage').attr("disabled", false);
                $('#post_uploadImage').attr("disabled", false);
                $('#editComment').attr("disabled", false);
                $('#spinner').hide();
                
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
                $('#editComment').attr("disabled", false);
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

Template.editComment.destroyed = function() {
    delete Session.keys.commentId;

    setTimeout(function(){
        Modal.show('postDetail')
   	}, 500);
};