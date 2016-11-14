Meteor.methods({
	setAllRead: function () {
		
		if (!this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to like this comment.");
	    }

	    Notifications.update({observerUserId: this.userId},
			{ $set: {read: true} },
			{ multi: true },
 		    function(error){
               	if(error){
               		console.log(error.reason);
                    console.log(error.invalidKeys);
                }
            }
    	);
	}
});