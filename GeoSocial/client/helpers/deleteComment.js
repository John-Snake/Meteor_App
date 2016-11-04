Template.deleteComment.events({
	'click #deleteComment': function() {
		Comments.remove(Session.get('commentId'), function(error){
            if(error){
                console.log(error);
                Bert.alert( error.reason, 'danger', 'growl-top-right' );
            } 
            else {
				Modal.hide('deleteComment');
				Bert.alert( 'Comment deleted successfully.', 'success', 'growl-top-right' );
        	}
        });
	}
});

Template.deleteComment.destroyed = function() {
    delete Session.keys.commentId;

    setTimeout(function(){
        Modal.show('postDetail')
   	}, 500);
};