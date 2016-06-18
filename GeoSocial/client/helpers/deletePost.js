Template.deletePost.events({
	'click #deletePost': function() {
        Meteor.call('commentsChainDeletion', Session.get('postId'), function(error) {
            if (error) {
                console.log(error);
                Bert.alert( error.reason, 'danger', 'growl-top-right' );
            }
        });
        
		Post.remove(Session.get('postId'), function(error){
            if(error){
                console.log(error);
                console.log(error.invalidKeys);
                Bert.alert( error.reason, 'danger', 'growl-top-right' );
            } 
            else {
                Modal.hide('deletePost');
                Bert.alert( 'Post deleted successfully.', 'success', 'growl-top-right' );
        	}
        });
	}
});

Template.deletePost.destroyed = function() {
    delete Session.keys.postId;
};