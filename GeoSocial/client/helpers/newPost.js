Template.newPost.events({
    'submit #new_post': function(event){
		event.preventDefault();
		var userId = Meteor.userId();
		var dateTime = new Date();
        var text = $('[name=post_text]').val();
        var anonymous = $('[name=post_anonymous]:checked').val();
       	
       	if(anonymous===undefined) {
       		anonymous = 0;
       	}

		var latitude = Session.get('currentUser_latitude');
        var longitude = Session.get('currentUser_longitude');

        Post.insert({
    		userId: userId,
    		anonymous: anonymous,
    		dateTime: dateTime,
    		latitude: latitude,
    		longitude: longitude,
    		text: text,
    		like: 0,
    		dislike:0
        }, function(error){
               if(error){
                    console.log(error.reason);
                } else {
                    Router.go("/myPost");
                }
            } 

        );
    }
});