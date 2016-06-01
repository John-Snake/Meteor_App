Modal.allowMultiple = true;

Template.postDetail.helpers({
	'thisPost': function() {
		return Post.findOne({_id: Session.get('postId')});
	},
	'username': function (userId) { 
		Meteor.subscribe('usersUsername'); // violo anonimato, pubblico tutti gli username anche quelli di chi ha il post come anonimo
		var user = Meteor.users.findOne({_id: userId}, {fields: {"username": 1}});
		if(user) {
			return user.username;
		}
		else {
			return false;
		}
	},
	'permission': function(userId) {
		Meteor.subscribe('usersUsername'); // violo anonimato, pubblico tutti gli username anche quelli di chi ha il post come anonimo
		var user = Meteor.users.findOne(userId);
		if(user) {
			return user._id == Meteor.userId();
		}
		else {
			return false;
		}
	},
});

Template.postDetail.events({
	'click #close': function() {
		delete Session.keys.editPost;
	},
	'click #editPost': function() {
		var route = $('#thisPostId').val();
		route = "/editPost/"+route;

		Modal.hide('postDetail');
		delete Session.keys.postId;
		Router.go(route);
	},
	'click #deletePost': function() {
		var id = $('#thisPostId').val();
		Modal.hide('postDetail');

		setTimeout(function(){
			Session.set('postId', id);
	        Modal.show('deletePost')
	    }, 500);
	},
	'click #personalProfile': function() {
		delete Session.keys.postId;
		Modal.hide('postDetail');
	},
	'click #usersProfile': function() {
		delete Session.keys.postId;
		Modal.hide('postDetail');
	}
});

Template.postDetail.destroyed = function() {
    delete Session.keys.postId;
};