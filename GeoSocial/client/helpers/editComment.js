/*
abbandono l'idea di editare i post tramite un modal.
eventualmente posso recuperare qualcosa per editare i commenti!

Template.editPost.helpers({
	'text': function () {
		var postText = Post.findOne({_id: Session.get('postId')}, {fields: {"text": 1}});
		return postText.text;
	},
	'checked': function () {
		var postAnonymous = Post.findOne({_id: Session.get('postId')}, {fields: {"anonymous": 1}});
		if (postAnonymous.anonymous == 1) {
			return "checked";
		}
	},
	'latitude': function () {
		var postLatitude = Post.findOne({_id: Session.get('postId')}, {fields: {"latitude": 1}});
		return postLatitude.latitude;
	},
	'longitude': function () {
		var postLongitude = Post.findOne({_id: Session.get('postId')}, {fields: {"longitude": 1}});
		return postLongitude.longitude;
	}
});

Template.editPost.events({
	'click #editPost': function() {
		delete Session.keys.postId;
		Modal.hide('editPost');
	},
	'click #close': function() {
		delete Session.keys.editPost;
	},
	'click #post_location': function () {
        var choice = $('[name=post_location]:checked').val();
        if(choice==1) {
            $('#geocomplete').prop('readonly', true);
            $('#geocomplete').prop('required',false);
            $('#geocomplete').val('');
            
            var map = $("#geocomplete").geocomplete("map");
            var latLng = new google.maps.LatLng(Session.get('currentUser_latitude'), Session.get('currentUser_longitude'));
            
            map.setCenter(latLng);
            
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
            });
            
            marker.setPosition(latLng);
            
        }
        else if(choice===undefined) {
            $('#geocomplete').prop('readonly', false);
            $('#geocomplete').prop('required', true);
        }
    }
});

Template.editPost.destroyed = function() {
    delete Session.keys.postId;
};
*/