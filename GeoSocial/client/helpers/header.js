/* Fix for carousel in the profile pages. 
	header navbar with the class 'navbar-fixed-top' only in the profile pages,
	header navbar with the class 'navbar-static-top' in every other pages.
*/
Template.header.helpers({
	navbarClass : function () {
		var route = Router.current().route.getName();
	    var substring = "profile";
	    if (route != null && route.indexOf(substring)>-1) {
	    	return 'fixed';
		}
		return 'static';
	}
});