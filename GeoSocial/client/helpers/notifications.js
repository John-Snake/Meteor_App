Template.notifications.helpers({
	'unreadNotification': function (){
		return Notifications.find({observerUserId: Meteor.userId(), read: false}, {sort: {dateTime: -1}});
	},
	'readNotification': function (){
		return Notifications.find({observerUserId: Meteor.userId(), read: true}, {sort: {dateTime: -1}});
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
		var user = Meteor.users.findOne(this.userId);
		return user.username;
	},
	'isComment': function () {
		if(this.commentId && this.action != "commented") {
			return true;
		}
	}
});

Template.notifications.events({
	'click #postDetail': function() {
		Meteor.subscribe('notificationsPost', this.postId);
		if(this.commentId) {
			Session.set('highlightComment', this.commentId);
		}
		Session.set('postId', this.postId);
		Modal.show('postDetail');
	},
	'click #setRead': function() {
		Meteor.call('setRead', this._id, function (error) {
            if(error){
                Bert.alert( error.reason, 'danger', 'growl-top-right' );
            } 
            else {
                Bert.alert( 'Notification readed successfully.', 'success', 'growl-top-right' );
            }
       });
	},
	'click #setAllRead': function() {
		var allElements = document.getElementsByTagName("*");
		for(i = 0; i < allElements.length; i++){
			if(allElements[i].id == 'notificationId'){
			  	var element = allElements[i].value;
		   		
		   		Meteor.call('setRead', element, function (error) {
		            if(error){
		                Bert.alert( error.reason, 'danger', 'growl-top-right' );
		            } 
		            else {
		                Bert.alert( 'All Notifications readed successfully.', 'success', 'growl-top-right' );
		            }
		       });
		 	}
		 }
	}
});