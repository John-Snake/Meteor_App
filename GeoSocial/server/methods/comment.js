Meteor.methods({
	likeComment : function (comment_id, type) {
		//check(comment_id, Meteor.Collection.ObjectID);
		//check(type, Number);

		if (!this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to like this comment.");
	    }

		if (type == 1) {
			Comments.update( { _id : comment_id },
					{ 
						$addToSet: { votersLike: this.userId } ,
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
			Comments.update( { _id : comment_id },
					{ 
						$addToSet: { votersLike: this.userId },
						$pull: { votersDislike: this.userId },
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
	dislikeComment : function (comment_id, type) {
		//check(comment_id, Meteor.Collection.ObjectID);
		//check(type, Number);

		if (!this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to dislike this comment.");
	    }

	    if (type == 1) {
	    	Comments.update( { _id : comment_id }, 
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
	    	Comments.update( { _id : comment_id },
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

	}

});