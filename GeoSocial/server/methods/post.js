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
						$addToSet: { votersLike: Meteor.userId() } ,
						$inc: { like: 1 } 
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
						$addToSet: { votersLike: Meteor.userId() },
						$pull: { votersDislike: Meteor.userId() },
						$inc: { like : 1, dislike: -1 } 
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
	dislike : function (post_id, type) {
		//check(post_id, Meteor.Collection.ObjectID);
		//check(type, Number);

		if (! this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to dislike this post.");
	    }

	    if (type == 1) {
	    	Post.update( { _id : post_id }, 
					{ 
						$addToSet: { votersDislike: Meteor.userId() },
						$inc: { dislike : 1 } 
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
						$addToSet: { votersDislike: Meteor.userId() },
						$pull: { votersLike: Meteor.userId() },
						$inc: { like : -1, dislike: 1 } 
					},
		 		    function(error){
		               	if(error){
		               		console.log(error.reason);
		                    console.log(error.invalidKeys);
		                }
		            }
	        );
	    }

	}

});