// The inizialize flag must be set this way so the tracker can observe just the new added notifications
Template.header.onCreated(function() {
	var initializing = false;
		
	Meteor.subscribe('unreadNotifications', function(){
		initializing = true;
	});

	Meteor.subscribe('usersUsername');

	Tracker.autorun(function() {

		Notifications.find({observerUserId: Meteor.userId(), read: false}).observe({
		    added: function(doc) {
		        if (initializing) {
		        	var user;
		        	var element;

		        	if(doc.anonymous) {
		        		user = "Anonymous";
		        	}
		        	else {
		        		user = Meteor.users.findOne(doc.userId).username;
		        	}

		        	if(doc.commentId && doc.action != "commented") {
		        		element = "comment";
		        	}
		        	else {
		        		element = "post";
		        	}

		        	sAlert.info(user+' '+doc.action+' your '+element);
		    	}
		    }
		});

	});
});

Template.header.helpers({
	/* Fix for carousel in the profile pages. 
	   header navbar with the class 'navbar-fixed-top' only in the profile pages,
	   header navbar with the class 'navbar-static-top' in every other pages.
	*/
	navbarClass : function () {
		var route = Router.current().route.getName();
	    var substring = "profile";
	    if (route != null && route.indexOf(substring)>-1) {
	    	return 'fixed';
		}
		return 'static';
	},
	notificationsCounter: function(){
		Meteor.subscribe('unreadNotifications');
    	return Notifications.find({observerUserId: Meteor.userId(), read: false}).count();
  	}
});