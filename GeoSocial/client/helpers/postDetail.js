Modal.allowMultiple = true;

Template.postDetail.helpers({
	'thisPost': function() {
		return Post.findOne({_id: Session.get('postId')});
	},
	'username': function (userId) { 
		Meteor.subscribe('usersUsername'); // violo anonimato, pubblico tutti gli username anche quelli di chi ha il post come anonimo
		var user = Meteor.users.findOne({_id: userId}, {fields: {"username": 1}});
		if(user) {
			return user.username;
		}
		else {
			return false;
		}
	},
	'permission': function(userId) {
		Meteor.subscribe('usersUsername'); // violo anonimato, pubblico tutti gli username anche quelli di chi ha il post come anonimo
		var user = Meteor.users.findOne(userId);
		if(user) {
			return user._id == Meteor.userId();
		}
		else {
			return false;
		}
	},
	'commentsCounter': function() {
		var postId = Session.get('postId');
		Meteor.subscribe('thisPostComments', postId);
		return Comments.find({postId: postId}).count();
	},
	'comments': function() {
		var postId = Session.get('postId');
		Meteor.subscribe('thisPostComments', postId);
		return Comments.find({postId: postId}, {sort: {dateTime: -1}});
	}
});

Template.postDetail.events({
	'click #editPost': function() {
		var route = Session.get('postId');
		route = "/editPost/"+route;

		Modal.hide('postDetail');
		delete Session.keys.postId;
		Router.go(route);
	},
	'click #deletePost': function() {
		var id = Session.get('postId');
		Modal.hide('postDetail');

		setTimeout(function(){
			Session.set('postId', id);
	        Modal.show('deletePost')
	    }, 500);
	},
	'click #personalProfile': function() {
		Modal.hide('postDetail');
	},
	'click #usersProfile': function() {
		Modal.hide('postDetail');
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
	'click #comment': function(event) {
		event.preventDefault();

		var id = Meteor.userId();
		var dateTime = new Date();
		var postId = Session.get('postId');
		var postUserId = Post.findOne({_id: postId}, {fields: {"userId": 1}}).userId;
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
        	Comments.insert({
	       			postId: postId,
	                userId: id,
	        		anonymous: anonymous,
	        		dateTime: dateTime,
	        		text: text
		        }, function(error, result){
		            	if(error){
		                    console.log(error.invalidKeys);
		                    Bert.alert( 'Text field cannot be empty.', 'danger', 'growl-top-right' );
		                }
		                else {
		                	Bert.alert( 'Comment published successfully.', 'success', 'growl-top-right' );

		                	$('#commentTextarea').val(null);
					       	$('#comment_anonymous').prop('checked', false);
					       	if(anonymous==1) {
					       		$('#commentProfileIcon').removeClass('fa-user-secret');
					       		$('#commentProfileIcon').addClass('fa-user');
					       	}

					       	if(id != postUserId) {
					       		Notifications.insert({
										postId: postId,
					                    userId: id,
					                    observerUserId: postUserId,
					                    anonymous: anonymous,
					                    action: 'commented',
					                    commentId: result,
					                    dateTime: dateTime
					                }, function(error){
					                    if(error){
					                        console.log(error.invalidKeys);
					                    }
					                }
			            		);
					       	}
		                }
		          	}
	        );
        }
        else {
        	Comments.insert({
	       			postId: postId,
	                userId: id,
	        		anonymous: anonymous,
	        		dateTime: dateTime,
	        		text: text,
	        		img_public_id: img_public_id,
                    img_url: img_url
		        }, function(error, result){
		            	if(error){
		                    console.log(error.invalidKeys);
		                    Bert.alert( 'Text field cannot be empty.', 'danger', 'growl-top-right' );
		                }
		                else {
		                	Bert.alert( 'Comment published successfully.', 'success', 'growl-top-right' );

                	       	$('#commentTextarea').val(null);
					       	$('#comment_anonymous').prop('checked', false);
					       	if(anonymous==1) {
					       		$('#commentProfileIcon').removeClass('fa-user-secret');
					       		$('#commentProfileIcon').addClass('fa-user');
					       	}
					       	$("#post_img").hide();
					        $("#delete_img").hide();

					    	$("#post_img").attr("src", "");
					        $('#img_public_id').attr("value", "");
					        $('#img_url').attr("value", "");
					       	
					       	$('#button_uploadImage').attr("disabled", false);
					        $('#post_uploadImage').attr("disabled", false);

					        if(id != postUserId) {
					       		Notifications.insert({
										postId: postId,
					                    userId: id,
					                    observerUserId: postUserId,
					                    anonymous: anonymous,
					                    action: 'commented',
					                    commentId: result,
					                    dateTime: dateTime
					                }, function(error){
					                    if(error){
					                        console.log(error.invalidKeys);
					                    }
					                }
			            		);
					       	}
		                }
		          	}
	        );
        }
	},
	'change #post_uploadImage': function (event) {
		uploadImage(event, "#comment");
    },
    'click #delete_img': function (event) {
        event.preventDefault();
        
        deleteImage();
    },
	'click #deleteComment': function() {
		var postId = Session.get('postId');
		var id = this._id;
		Session.set('commentId', id);

		Modal.hide('postDetail');

		setTimeout(function(){
			Session.set('postId', postId);
	        Modal.show('deleteComment')
	    }, 500);
	},
	'click #editComment': function() {
		var postId = Session.get('postId');
		var id = this._id;
		Session.set('commentId', id);

		Modal.hide('postDetail');

		setTimeout(function(){
			Session.set('postId', postId);
	        Modal.show('editComment');
	    }, 500);
	}
});

Template.postDetail.destroyed = function() {
    delete Session.keys.postId;
};