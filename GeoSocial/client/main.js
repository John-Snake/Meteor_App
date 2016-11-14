Meteor.startup(function () {
    sAlert.config({
        effect: 'stackslide',
        position: 'bottom-right',
        timeout: 5000,
        html: true,
        onRouteClose: true,
        stack: {
    	    spacing: 10, // in px
        	limit: 5 // when fifth alert appears all previous ones are cleared
        },
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: true,
        beep: {
            info: '/sounds/metal_gear_solid_call.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        },
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });
});

Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 5, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: 'white', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    //zIndex: 2e9, // The z-index (defaults to 2000000000)
    //top: 'auto', // Top position relative to parent in px
    //left: 'auto' // Left position relative to parent in px
};

// Format date using Moment.js [Example: 1 Jenuary 2016]
Template.registerHelper('formatDateProfile', function (date) {
	return moment(date).format("DD MMMM YYYY");
})

// Format date using Moment.js [Example: 01/01/2016, 15:00]
Template.registerHelper('formatDatePost', function (date) {
	return moment(date).format("DD/MM/YYYY, HH:mm");
})

// Format date using Moment.js [Example: Posted here '2 h ago' ]
Template.registerHelper('formatDatePostFromNow', function (date) {
	return "Posted here "+moment(date).fromNow();
})

// Format date using Moment.js [Example: '2 h ago' ]
Template.registerHelper('formatDateCommentFromNow', function (date) {
	return moment(date).fromNow();
})

// Auto grow text area with verron:autosize
autoGrow = function (element) {
    autosize(element);
}

// Change privacy input type range info and privacy info paragraphs
privacyInfoUpdate = function (inputRange) {
	if (inputRange.value == 0) {
		document.getElementById('label_user_privacy').innerHTML='Privacy: <span style="color:red">LOW level</span>';
		document.getElementById('privacyInfo').innerHTML='LOW level: Everyone can see all of your information.';
	}
	else if (inputRange.value == 1) {
		document.getElementById('label_user_privacy').innerHTML='Privacy: <span style="color:orange">AVERAGE level</span>';
		document.getElementById('privacyInfo').innerHTML='AVERAGE level: Everyone can see your username, name, surname, email and other contacts.';
	}
	else if (inputRange.value == 2) {
		document.getElementById('label_user_privacy').innerHTML='Privacy: <span style="color:green">HIGH level</span>';
		document.getElementById('privacyInfo').innerHTML='HIGH level: Everyone can see only your username.';
	}
}

// Format the input field removing any unwanted characters/formatting
formatUsername = function(element) {
	var input = element.value.replace( /[^A-Za-z0-9\s]/g, '' ).toLowerCase().trim();
	element.value = input;
}

/* Post -------------------- */

Template.registerHelper('alreadyLiked', function (id) {
	var post;
	if (id === undefined) {
		post = Post.findOne({ _id: this._id });
	}
	else {
		post = Post.findOne({ _id: id });
	}
	
	if(post) {
		// Already liked the post
		if (_.contains(post.votersLike, Meteor.userId())) {
			return true;
		}
		else {
			return false;
		}
	}
});

Template.registerHelper('alreadyDisliked', function (id) {
	var post;
	if (id === undefined) {
		post = Post.findOne({ _id: this._id });
	}
	else {
		post = Post.findOne({ _id: id });
	}
	
	if(post) {
		// Already disliked the post
		if (_.contains(post.votersDislike, Meteor.userId())) {
			return true;
		}
		else {
			return false;
		}
	}
});

like = function(post_id, counter) {
	var temp = counter;
	var post = Post.findOne({ _id: post_id });
	var userId = Meteor.userId();
	
	if(post) {

		// Already liked the post
		if (_.contains(post.votersLike, userId)) {
			return;
		}
		else {

			if(temp === 0) { // Add 1 like
				Meteor.call('like', post_id, 1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });

				if(userId != post.userId) {
					createPostNotification(post_id, userId, post.userId, 'liked');
				}
			}
			else if (temp === -1) { // Add 1 like, remove 1 dislike
				Meteor.call('like', post_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });

				if(userId != post.userId) {

					Meteor.subscribe('updateNotifications', post_id, post.userId, "disliked", null, function() {
						var oldId = Notifications.findOne({
				    		postId: post_id,
							userId: userId,
							observerUserId: post.userId,
							anonymous: 0,
							action: "disliked",
							commentId: null
			    		})._id;

			    		Notifications.remove({_id: oldId});
					});

					createPostNotification(post_id, userId, post.userId, 'liked');
				}
			}

		}

	}

}

dislike = function(post_id, counter) {
	var temp = counter;
	var post = Post.findOne({ _id: post_id });
	var userId = Meteor.userId();

	if(post) {

		// Already disliked the post
		if (_.contains(post.votersDislike, userId)) {
			return;
		}
		else {

			if(temp === 0) { // Add 1 dislike
				Meteor.call('dislike', post_id, 1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });

				if(userId != post.userId) {
					createPostNotification(post_id, userId, post.userId, 'disliked');
	            }
			}
			else if (temp === -1) { // Add 1 dislike, remove 1 like
				Meteor.call('dislike', post_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });

				if(userId != post.userId) {

					Meteor.subscribe('updateNotifications', post_id, post.userId, "liked", null, function() {
						var oldId = Notifications.findOne({
				    		postId: post_id,
							userId: userId,
							observerUserId: post.userId,
							anonymous: 0,
							action: "liked",
							commentId: null
				    	})._id;

				    	Notifications.remove({_id: oldId});
					});

					createPostNotification(post_id, userId, post.userId, 'disliked');
	            }
			}

		}
	}

}

/* Comments ----------------------- */

Template.registerHelper('alreadyLikedComment', function () {
	var comment = Comments.findOne({ _id: this._id });

	if(comment) {
		// Already liked the comment
		if (_.contains(comment.votersLike, Meteor.userId())) {
			return true;
		}
		else {
			return false;
		}
	}
});

Template.registerHelper('alreadyDislikedComment', function () {
	var comment = Comments.findOne({ _id: this._id });

	if(comment) {
		// Already disliked the comment
		if (_.contains(comment.votersDislike, Meteor.userId())) {
			return true;
		}
		else {
			return false;
		}
	}
});

likeComment = function(comment_id, counter) {
	var temp = counter;
	var comment = Comments.findOne({ _id: comment_id });
	var userId = Meteor.userId();
	
	if(comment) {

		// Already liked the comment
		if (_.contains(comment.votersLike, userId)) {
			return;
		}
		else {

			if(temp === 0) { // Add 1 like
				Meteor.call('likeComment', comment_id, 1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });

				if(userId != comment.userId) {
					createCommentNotification(comment.postId, userId, comment.userId, null, 'liked', comment_id);
	            }
			}
			else if (temp === -1) { // Add 1 like, remove 1 dislike
				Meteor.call('likeComment', comment_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });

                if(userId != comment.userId) {

                	Meteor.subscribe('updateNotifications', comment.postId, comment.userId, "disliked", comment_id, function() {
						var oldId = Notifications.findOne({
				    		postId: comment.postId,
							userId: userId,
							observerUserId: comment.userId,
							anonymous: 0,
							action: "disliked",
							commentId: comment_id
			    		})._id;

			    		Notifications.remove({_id: oldId});
					});
					
					createCommentNotification(comment.postId, userId, comment.userId, null, 'liked', comment_id);
	            }
			}

		}

	}

}

dislikeComment = function(comment_id, counter) {
	var temp = counter;
	var comment = Comments.findOne({ _id: comment_id });
	var userId = Meteor.userId();

	if(comment) {

		// Already disliked the comment
		if (_.contains(comment.votersDislike, userId)) {
			return;
		}
		else {

			if(temp === 0) { // Add 1 dislike
				Meteor.call('dislikeComment', comment_id, 1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });

				if(userId != comment.userId) {
					createCommentNotification(comment.postId, userId, comment.userId, null, 'disliked', comment_id);
	            }
			}
			else if (temp === -1) { // Add 1 dislike, remove 1 like
				Meteor.call('dislikeComment', comment_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });

                if(userId != comment.userId) {

                	Meteor.subscribe('updateNotifications', comment.postId, comment.userId, "liked", comment_id, function() {
						var oldId = Notifications.findOne({
				    		postId: comment.postId,
							userId: userId,
							observerUserId: comment.userId,
							anonymous: 0,
							action: "liked",
							commentId: comment_id
			    		})._id;

			    		Notifications.remove({_id: oldId});
					});

					createCommentNotification(comment.postId, userId, comment.userId, null, 'disliked', comment_id);
	            }
			}

		}
	}

}

/* Upload/delete posts' & comments' images  */

uploadImage = function(event, buttonId) {
	$('#button_uploadImage').attr("disabled", true);
    $('#post_uploadImage').attr("disabled", true);
    $(buttonId).attr("disabled", true);
    
    $('#spinner').show();

    Bert.alert( 'Uploading image...', 'success', 'growl-top-right' );

    files = event.currentTarget.files;
    
    Cloudinary.upload(files,{}, function(error, res) {
        if(error) {
        	Bert.alert( 'Upload Error: '+err , 'danger', 'growl-top-right' );
            
            $('#spinner').hide();

            $('#button_uploadImage').attr("disabled", false);
            $('#post_uploadImage').attr("disabled", false);
            $(buttonId).attr("disabled", false);
            
        }
        else {
            Bert.alert( 'Image uploaded successfully.', 'success', 'growl-top-right' );

            $('#post_img').attr("src", res.url);
            $('#img_public_id').attr("value", res.public_id);
            $('#img_url').attr("value", res.url);

            setTimeout(function(){
		        $('#post_img').show();
            	$('#delete_img').show();
            	$('#spinner').hide();
		   	}, 500);
            
            $(buttonId).attr("disabled", false);
        }
    });
}

deleteImage = function() {
	var public_id = $("#img_public_id").val();

	Cloudinary.delete(public_id, function(error, res) {
        if(error) {
            Bert.alert( 'Error deleting image: '+err , 'danger', 'growl-top-right' );
        }
        else {
            Bert.alert( 'Image deleted successfully.', 'success', 'growl-top-right' );
            
            $('#post_img').attr("src", "");
            $('#img_public_id').attr("value", "");
            $('#img_url').attr("value", "");

            $('#post_img').hide();
            $('#delete_img').hide();

            $('#button_uploadImage').attr("disabled", false);
            $('#post_uploadImage').attr("disabled", false);
        }
    });
}

/* Upload/delete profile's photo images ----*/

uploadImageProfile = function(event, photoNumber) {
	var button_uploadImage = "#button_uploadImage"+photoNumber;
	var post_uploadImage = "#post_uploadImage"+photoNumber;
	var delete_img = "#delete_img"+photoNumber;
	var buttonId = "#button_changePhotos";
	var spinner = "#spinner"+photoNumber;
	var post_img = "#post_img"+photoNumber;
	var img_public_id = "#img"+photoNumber+"_public_id";
	var img_url = "#img"+photoNumber+"_url";

	$(button_uploadImage).attr("disabled", true);
    $(post_uploadImage).attr("disabled", true);
    $(buttonId).attr("disabled", true);
    
    $(post_img).hide();
    $(spinner).show();

    Bert.alert( 'Uploading image...', 'success', 'growl-top-right' );

    files = event.currentTarget.files;
    
    Cloudinary.upload(files,{}, function(error, res) {
        if(error) {
        	Bert.alert( 'Upload Error: '+err , 'danger', 'growl-top-right' );
            
            $(spinner).hide();

            $(button_uploadImage).attr("disabled", false);
            $(post_uploadImage).attr("disabled", false);
            $(buttonId).attr("disabled", false);
            
        }
        else {
            Bert.alert( 'Image uploaded successfully.', 'success', 'growl-top-right' );

            $(post_img).attr("src", res.url);
            $(img_public_id).attr("value", res.public_id);
            $(img_url).attr("value", res.url);

            setTimeout(function(){
		        $(post_img).show();
            	$(delete_img).show();
            	$(spinner).hide();
		   	}, 500);
            
            $(buttonId).attr("disabled", false);
        }
    });
}

deleteImageProfile = function(photoNumber) {
	var button_uploadImage = "#button_uploadImage"+photoNumber;
	var post_uploadImage = "#post_uploadImage"+photoNumber;
	var delete_img = "#delete_img"+photoNumber;
	var post_img = "#post_img"+photoNumber;
	var oldImg_public_id = "#oldImg"+photoNumber+"_public_id";
	var oldImg_url = "#oldImg"+photoNumber+"_url";
	var img_public_id = "#img"+photoNumber+"_public_id";
	var img_url = "#img"+photoNumber+"_url";

	var public_id = $(img_public_id).val();

	if(public_id.indexOf("defaultProfile") !== -1) {
		Bert.alert( 'You cannot delete default profile\'s photo. ' , 'danger', 'growl-top-right' );
	}
	else {
		Cloudinary.delete(public_id, function(error, res) {
	        if(error) {
	            Bert.alert( 'Error deleting image: '+err , 'danger', 'growl-top-right' );
	        }
	        else {
	            Bert.alert( 'Image deleted successfully.', 'success', 'growl-top-right' );
	            
	            $(post_img).attr("src", $(oldImg_url).val());
	            $(img_public_id).attr("value", $(oldImg_public_id).val());
	            $(img_url).attr("value", $(oldImg_url).val());

		        $(delete_img).hide();

	            $(button_uploadImage).attr("disabled", false);
	            $(post_uploadImage).attr("disabled", false);
	        }
	    });
	}
}

/* Create notification ----------*/

createPostNotification = function(postId, userId, observerUserId, action) {
	Notifications.insert({
			postId: postId,
            userId: userId,
            observerUserId: observerUserId,
            action: action,
            dateTime: new Date()
        }, function(error){
            if(error){
            	console.log(error.reason);
                console.log(error.invalidKeys);
            }
        }
	);
}

createCommentNotification = function(postId, userId, observerUserId, anonymous, action, commentId) {
	if(action == "commented" && anonymous) {
		Notifications.insert({
				postId: postId,
	            userId: userId,
	            observerUserId: observerUserId,
	            anonymous: anonymous,
	            action: action,
	            commentId: commentId,
	            dateTime: new Date()
	        }, function(error){
	            if(error){
	            	console.log(error.reason);
	                console.log(error.invalidKeys);
	            }
	        }
		);
	}
	else {
		Notifications.insert({
				postId: postId,
	            userId: userId,
	            observerUserId: observerUserId,
	            action: action,
	            commentId: commentId,
	            dateTime: new Date()
	        }, function(error){
	            if(error){
	                console.log(error.invalidKeys);
	            }
	        }
		);
	}
}