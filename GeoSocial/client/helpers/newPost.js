Template.newPost.events({
    'submit #new_post': function(event){
		event.preventDefault();
		var user_id = Meteor.userId();
		var dateTime = new Date();
        var text = $('[name=post_text]').val();
        var anonymous = $('[name=post_anonymous]:checked').val();
       	
       	if(anonymous===undefined) {
       		anonymous = 0;
       	}

		var latitue = Session.get('currentUser_latitue');
        var longitude = Session.get('currentUser_longitude');

        
       	console.log(user_id);
       	console.log(dateTime);
        console.log(text);
        console.log(anonymous);
        console.log(latitue);
        console.log(longitude);

    }
});