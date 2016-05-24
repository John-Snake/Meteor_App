Post = new Mongo.Collection('post');

Post.allow({
	// Allow insert function for Post collection if userId exist
	insert: function(userId) {
		return !!userId;
	},
	update: function(userId) {
		return !!userId;
	}

});