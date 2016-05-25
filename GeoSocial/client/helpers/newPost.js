Template.newPost.events({
    'submit #new_post': function(event){
		event.preventDefault();
		var dateTime = new Date();
        var text = $('[name=post_text]').val();
        var anonymous = $('[name=post_anonymous]:checked').val();
       	
       	if(anonymous===undefined) {
       		anonymous = 0;
       	}

		var latitude = Session.get('currentUser_latitude');
        var longitude = Session.get('currentUser_longitude');

        Post.insert({
    		anonymous: anonymous,
    		dateTime: dateTime,
    		latitude: latitude,
    		longitude: longitude,
    		text: text
        }, function(error){
               if(error){
                    console.log(error.invalidKeys);
                } else {
                    Router.go("/myPost");
                }
            } 

        );
    }
});