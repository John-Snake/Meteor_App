// Format date using Moment.js [Example: 1 Jenuary 2016]
Template.registerHelper('formatDateProfile', function (date) {
	return moment(date).format("DD MMMM YYYY");
})

// Format date using Moment.js [Example: 01/01/2016, 15:00]
Template.registerHelper('formatDatePost', function (date) {
	return moment(date).format("DD/MM/YYYY, HH:mm");
})

// Auto grow text area with verron:autosize
autoGrow = function (element) {
    autosize(element);
}

// Change privacy input type range info
privacyInfoUpdate = function (inputRange) {
	document.getElementById('label_user_privacy').innerHTML='Privacy: livello '+inputRange.value;
}


/* Post -------------------- */

Template.registerHelper('alreadyLiked', function () {
	var post = Post.findOne({ _id: this._id });
	
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

Template.registerHelper('alreadyDisliked', function () {
	var post = Post.findOne({ _id: this._id });
	
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

like = function(post_id, like, dislike, counter) {
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
                	}
                });
			}
			else if (temp === -1) { // Add 1 like, remove 1 dislike
				Meteor.call('like', post_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                	}
                });
			}

		}

	}

}

dislike = function(post_id, like, dislike, counter) {
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
                	}
                });
			}
			else if (temp === -1) { // Add 1 dislike, remove 1 like
				Meteor.call('dislike', post_id, -1, function (error) {
                	if(error){
                        console.log(error.reason);
                	}
                });
			}

		}
	}

}

/* -------------------------- */