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

// Change privacy input type range info
privacyInfoUpdate = function (inputRange) {
	document.getElementById('label_user_privacy').innerHTML='Privacy: livello '+inputRange.value;
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
	
	if(post) {

		// Already liked the post
		if (_.contains(post.votersLike, Meteor.userId())) {
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
			}
			else if (temp === -1) { // Add 1 like, remove 1 dislike
				Meteor.call('like', post_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });
			}

		}

	}

}

dislike = function(post_id, counter) {
	var temp = counter;
	var post = Post.findOne({ _id: post_id });

	if(post) {

		// Already disliked the post
		if (_.contains(post.votersDislike, Meteor.userId())) {
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
			}
			else if (temp === -1) { // Add 1 dislike, remove 1 like
				Meteor.call('dislike', post_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });
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
	
	if(comment) {

		// Already liked the comment
		if (_.contains(comment.votersLike, Meteor.userId())) {
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
			}
			else if (temp === -1) { // Add 1 like, remove 1 dislike
				Meteor.call('likeComment', comment_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });
			}

		}

	}

}

dislikeComment = function(comment_id, counter) {
	var temp = counter;
	var comment = Comments.findOne({ _id: comment_id });

	if(comment) {

		// Already disliked the comment
		if (_.contains(comment.votersDislike, Meteor.userId())) {
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
			}
			else if (temp === -1) { // Add 1 dislike, remove 1 like
				Meteor.call('dislikeComment', comment_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                	}
                });
			}

		}
	}

}