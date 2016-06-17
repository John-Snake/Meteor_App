Meteor.methods({
	like : function (post_id, type) {
		//check(post_id, Meteor.Collection.ObjectID);
		//check(type, Number);

		if (! this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to like this post.");
	    }

		if (type == 1) {
			Post.update( { _id : post_id },
					{ 
						$addToSet: { votersLike: this.userId } ,
					},
		 		    function(error){
		               	if(error){
		               		console.log(error.reason);
		                    console.log(error.invalidKeys);
		                    Bert.alert( error.reason, 'danger', 'growl-top-right' );
		                }
		            }
        	);
		}
		else if (type == -1) {
			Post.update( { _id : post_id },
					{ 
						$addToSet: { votersLike: this.userId },
						$pull: { votersDislike: this.userId },
					},
		 		    function(error){
		               	if(error){
		               		console.log(error.reason);
		                    console.log(error.invalidKeys);
		                    Bert.alert( error.reason, 'danger', 'growl-top-right' );
		                }
		            }
        	);
		}

	},
	dislike : function (post_id, type) {
		//check(post_id, Meteor.Collection.ObjectID);
		//check(type, Number);

		if (! this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to dislike this post.");
	    }

	    if (type == 1) {
	    	Post.update( { _id : post_id }, 
					{ 
						$addToSet: { votersDislike: this.userId },
					},
		 		    function(error){
		               	if(error){
		               		console.log(error.reason);
		                    console.log(error.invalidKeys);
		                }
		            }
	        );
	    }
	    else if (type == -1) {
	    	Post.update( { _id : post_id },
					{ 
						$addToSet: { votersDislike: this.userId },
						$pull: { votersLike: this.userId },
					},
		 		    function(error){
		               	if(error){
		               		console.log(error.reason);
		                    console.log(error.invalidKeys);
		                }
		            }
	        );
	    }

	},
	commentsChainDeletion : function (post_id) {
		if (! this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to dislike this post.");
	    }

		Comments.remove({postId: post_id}, function(error){
            if(error){
                console.log(error);
                console.log(error.invalidKeys);
            } 
        });
	}
});