Template.notifications.helpers({
	'unreadNotification': function (){
		return Notifications.find({observerUserId: Meteor.userId(), read: false}, {sort: {date: -1}});
	},
	'readNotification': function (){
		return Notifications.find({observerUserId: Meteor.userId(), read: true}, {sort: {date: -1}});
	},
	'actionIcon': function () {
		if(this.action == "liked") {
			return "fa-thumbs-up";
		}
		else if (this.action == "disliked") {
			return "fa-thumbs-down";
		}
		else if (this.action == "commented") {
			return "fa-comments";
		}
	},
	// Show the right username for every post
	'username': function () {
		var user = Meteor.users.findOne(this.senderUserId);
		return user.username;
	}
});

Template.notifications.events({
	'click #postDetail': function() {
		Meteor.subscribe('notificationsPost', this.postId);
		Session.set('postId', this.postId);
		Modal.show('postDetail');
	},
	'click #setRead': function() {
		console.log(this._id);
		//setto read a true, ma servono i permessi sia per sender che observer
	}
});