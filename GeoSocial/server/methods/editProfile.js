Meteor.methods({
  	changeUsername : function (newUsername) {
  		// check(value, pattern) || Match.test(value, pattern) controlli server

    	if (!this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to change username.");
	    }

	    Accounts.setUsername(this.userId, newUsername);
 	},
  	changeEmail : function (oldEmail, newEmail) {
  		// check(value, pattern) || Match.test(value, pattern) controlli server

    	if (!this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to change email.");
	    }

	    Accounts.removeEmail(this.userId, oldEmail);
	    Accounts.addEmail(this.userId, newEmail); 

	    /* 
	     *  By default, an email address is added with { verified: false }.
	     *  Use Accounts.sendVerificationEmail to send an email with a link the user can use verify their email address. 
	    */
  	},
	removeUserChainDeletion : function () {
		if (!this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to dislike this post.");
	    }

	    // Remove all comments like & dislike of the current logged user
	    Comments.update({},
	  		{  	
	  			$pull: {
	  				votersLike: this.userId,
	  				votersDislike: this.userId
	  			} 
	  		},
	  		{ multi: true },
 		    function(error){
               	if(error){
               		console.log(error.reason);
                    console.log(error.invalidKeys);
                }
            }
		);

	    // Remove all the posts like & dislike of the current logged user
	    Post.update({},
	  		{  	
	  			$pull: {
	  				votersLike: this.userId,
	  				votersDislike: this.userId
	  			}
	  		},
	  		{ multi: true },
 		    function(error){
               	if(error){
               		console.log(error.reason);
                    console.log(error.invalidKeys);
                }
            }
		);
		
		// Remove all the comments of the current logged user
	    Comments.remove({userId: this.userId}, function(error){
            if(error){
                console.log(error);
                console.log(error.invalidKeys);
            } 
        });
		
		// Remove all the posts of the current logged user
	    Post.remove({userId: this.userId}, function(error){
            if(error){
                console.log(error);
                console.log(error.invalidKeys);
            } 
        });
		
		// Remove current user
		Meteor.users.remove({ _id: this.userId }, function (error) {
		    if (error) {
		      console.log(error);
		    }
	  	});
	}
});