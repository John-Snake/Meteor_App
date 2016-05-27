Template.header.events({
    'click .logout': function(event){
        event.preventDefault();

        Session.clearPersistent();
        delete Session.keys.postId;

        Meteor.logout();
        Router.go('/');
    }
});
