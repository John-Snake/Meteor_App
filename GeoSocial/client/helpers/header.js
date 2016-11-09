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