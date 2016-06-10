Template.editComment.helpers({
	'thisComment': function() {
		return Comments.findOne({_id: Session.get('commentId')});
	}
});

Template.editComment.events({
	'click #comment_anonymous': function() {
		var anonymous = $('#comment_anonymous:checked').val();
		var icon = $('#commentProfileIcon');
		if(anonymous==1) {
			icon.removeClass('fa-user');
			icon.addClass('fa-user-secret');
		}
		else if(anonymous===undefined) {
			icon.removeClass('fa-user-secret');
			icon.addClass('fa-user');
		}
	}
});

Template.editComment.destroyed = function() {
    delete Session.keys.commentId;

    setTimeout(function(){
        Modal.show('postDetail')
   	}, 500);
};