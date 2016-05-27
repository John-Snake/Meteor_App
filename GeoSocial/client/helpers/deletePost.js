Template.deletePost.events({
	'click #deletePost': function() {
		Post.remove(Session.get('postId'));
		delete Session.keys.postId;
		Modal.hide('deletePost');
	},
	'click #close': function() {
		delete Session.keys.postId;
	}
});

Template.deletePost.destroyed = function() {
    delete Session.keys.postId;
};