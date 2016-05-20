Template.header.events({
    'click .logout': function(event){
        event.preventDefault();
        Session.clearPersistent()
        Meteor.logout();
        Router.go('/');
    }
});
