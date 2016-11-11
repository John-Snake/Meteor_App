Meteor.methods({
	setRead : function (notificationId) {

		if (!this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to like this comment.");
	    }

	    Notifications.update( { _id : notificationId },
			{ 	
				$set: {	read: true }
			},
 		    function(error){
               	if(error){
               		console.log(error.reason);
                    console.log(error.invalidKeys);
                }
            }
    	);
	}
});