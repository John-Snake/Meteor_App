// Format date using Moment.js [Example: 1 Jenuary 2016]
Template.registerHelper('formatDateProfile', function (date) {
	return moment(date).format("DD MMMM YYYY");
})

// Format date using Moment.js [Example: 01/01/2016, 15:00]
Template.registerHelper('formatDatePost', function (date) {
	return moment(date).format("DD/MM/YYYY, HH:mm");
})

// Auto grow text area
autoGrow = function (element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight+5)+"px";
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
	var likeButton = document.getElementById("like_"+post_id);
	var dislikeButton = document.getElementById("dislike_"+post_id);
	var temp = counter;
	var addLike = parseInt(like)+1;
	var post = Post.findOne({ _id: post_id });
	
	if(post) {

		// Already liked the post
		if (_.contains(post.votersLike, Meteor.userId())) {
			return;
		}
		else {

			if(temp === 0) { // Add 1 like
			
				Post.update( { _id : post_id },
					{ 
						$addToSet: { votersLike: Meteor.userId() } ,
						$inc: { like: 1 } 
					},
		 		    function(error){
		               	if(error){
		                    console.log(error.invalidKeys);
		                }
		            }
		        );
			}
			else if (temp === -1) { // Add 1 like, remove 1 dislike
				var decreaseDislike = parseInt(dislike)-1;

				Post.update( { _id : post_id },
					{ 
						$addToSet: { votersLike: Meteor.userId() },
						$pull: { votersDislike: Meteor.userId() },
						$inc: { like : 1, dislike: -1 } 
					},
		 		    function(error){
		               	if(error){
		                    console.log(error.invalidKeys);
		                }
		            }
		        );
			}

		}

	}

}

dislike = function(post_id, like, dislike, counter) {
	var dislikeButton = document.getElementById("dislike_"+post_id);
	var likeButton = document.getElementById("like_"+post_id);
	var temp = counter;
	var addDislike = parseInt(dislike)+1;
	var post = Post.findOne({ _id: post_id });

	if(post) {

		// Already disliked the post
		if (_.contains(post.votersDislike, Meteor.userId())) {
			return;
		}
		else {

			if(temp === 0) { // Add 1 dislike

				Post.update( { _id : post_id }, 
					{ 
						$addToSet: { votersDislike: Meteor.userId() },
						$inc: { dislike : 1 } 
					},
		 		    function(error){
		               	if(error){
		                    console.log(error.invalidKeys);
		                }
		            }
		        );
			}
			else if (temp === -1) { // Add 1 dislike, remove 1 like
				var decreaselike = parseInt(like)-1;

				Post.update( { _id : post_id },
					{ 
						$addToSet: { votersDislike: Meteor.userId() },
						$pull: { votersLike: Meteor.userId() },
						$inc: { like : -1, dislike: 1 } 
					},
		 		    function(error){
		               	if(error){
		                    console.log(error.invalidKeys);
		                }
		            }
		        );
			}

		}
	}

}

/* -------------------------- */